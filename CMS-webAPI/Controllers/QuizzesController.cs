using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using CMS_webAPI.Models;
using System.Data.SqlClient;

namespace CMS_webAPI.Controllers
{
    public class QuizzesController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();


        // GET: api/Quizzes/QuizzesInDraft
        // Returns the Quizzes in Draft for the current Logged In User
        [ResponseType(typeof(IList<Quiz>))]
        //[Authorize(Roles="Administrators, Authors")]
        public async Task<IHttpActionResult> GetQuizzesInDraft()
        {
            ApplicationUser currentUser = UserService.getUserByUserName(User.Identity.Name);
            if (currentUser == null)
            {
                return Unauthorized();
            }

            IList<Quiz> quizzes = await db.Quizzes.Where(qz=> qz.AuthorId == currentUser.Id && qz.IsLive == false).ToListAsync();
            if (quizzes == null)
            {
                quizzes = new List<Quiz>();
            }

            return Ok(quizzes);
        }

        // GET: api/Quizzes/QuizzesInLive
        // Returns the Quizzes in Live for the current Logged In User
        [ResponseType(typeof(IList<Quiz>))]
        //[Authorize(Roles = "Administrators, Authors")]
        public async Task<IHttpActionResult> GetQuizzesInLive()
        {
            ApplicationUser currentUser = UserService.getUserByUserName(User.Identity.Name);
            if (currentUser == null)
            {
                return Unauthorized();
            }

            IList<Quiz> quizzes = await db.Quizzes.Where(qz => qz.AuthorId == currentUser.Id && qz.IsLive == true).ToListAsync();
            if (quizzes == null)
            {
                quizzes = new List<Quiz>();
            }

            return Ok(quizzes);
        }


        // GET: api/Quizzes/QuizzesByUserName
        // Returns the Quizzes in Live for the given User
        [ResponseType(typeof(AuthorQuizzesViewModel))]
        [AllowAnonymous]
        public async Task<IHttpActionResult> GetQuizzesInLiveByUserName(string param1, int param2, int param3, string param4, bool param5)
        {
            string userName = param1;
            int pageNo = param2;
            int pageSize = param3;
            string sortField = "c." + param4;
            bool sortDirAsc = param5;
            string sortDir = "ASC";

            List<Quiz> quizzes = new List<Quiz>();
            int totalCount = 0;

            ApplicationUser user = UserService.getUserByUserName(userName);

            if (user == null)
            {
                return NotFound();
            }

            UserInfoViewModel author = UserService.AppUserToUserInfoViewModel(user);

            if (pageNo < 1 || pageSize < 1)
            {
                return BadRequest();
            }
            pageNo = pageNo - 1;

            string searchQuery = @"select qz.* from Contents as qz                
                WHERE qz.AuthorId=@UserId AND qz.IsLive='True'";

            string searchQueryForPagedData = searchQuery + " order by " + sortField + " " + sortDir + " OFFSET @PageStart ROWS FETCH NEXT @PageSize ROWS ONLY";
            string searchQueryForTotalCount = "Select Count(qzs.ContentId) as TotalCount from (" + searchQuery + ") as qzs";

            var ParamsPagedData = new[] 
            {
                new SqlParameter("UserId", user.Id),                
                new SqlParameter("SortField", sortField),
                new SqlParameter("SortDir", sortDir),
                new SqlParameter("PageStart", pageNo * pageSize),
                new SqlParameter("PageSize", pageSize)
            };

            var ParamsTotalCount = new[] 
            {
                new SqlParameter("UserId", user.Id),                
                new SqlParameter("SortField", sortField),
                new SqlParameter("SortDir", sortDir)
            };

            try
            {
                var TotalCountResult = db.Database.SqlQuery<int>(searchQueryForTotalCount, ParamsTotalCount).ToList();

                totalCount = TotalCountResult[0];
                if (totalCount > 0)
                {
                    quizzes = db.Database.SqlQuery<Quiz>(searchQueryForPagedData, ParamsPagedData)
                    .ToList<Quiz>();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            if (quizzes == null)
            {
                return NotFound();
            }

            AuthorQuizzesViewModel authorQuizzesView = new AuthorQuizzesViewModel(author, quizzes, totalCount);
            await Task.Delay(0);
            return Ok(authorQuizzesView);            
        }

        // Adds a new Quiz
        // POST: api/quizzes/PostQuiz
        [ResponseType(typeof(QuizViewModel))]
        public async Task<IHttpActionResult> PostQuiz(QuizViewModel quizView)
        {           
            // modelstate is invalid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Quiz quiz = AddOrUpdateQuiz(quizView);
            
            
            await db.SaveChangesAsync();

            QuizViewModel quizViewSaved = new QuizViewModel(quiz);

            return Ok(quizViewSaved);
        }

        private Quiz AddOrUpdateQuiz(QuizViewModel quizView)
        {            
            if (QuizExists(quizView.QuizId))
            {
                return UpdateQuiz(quizView);
            }
            else
            {
                return AddQuiz(quizView);
            }            
        }

        private Quiz AddQuiz(QuizViewModel quizView)
        {
            Quiz quiz = quizView.ToDbModel();
            
            quiz.AuthorId = UserService.getUserByUserName(User.Identity.Name).Id;
            quiz.UpdatedDate = DateTime.Now;
            quiz.CreatedDate = DateTime.Now;
            quiz.UpdateCount = 0; 
            quiz.VisitCount = 0;
            quiz.IsLive = false;
            
            db.Quizzes.Add(quiz);
            
            AddOrUpdateQuizTags(quiz.QuizId, quizView.getQuizTags());
            AddOrUpdateQuestions(quizView.Questions);
            return quiz;
        }

        private Quiz UpdateQuiz(QuizViewModel quizView)
        {
            Quiz quiz = quizView.ToDbModel();            

            quiz.AuthorId = UserService.getUserByUserName(User.Identity.Name).Id;
            quiz.UpdatedDate = DateTime.Now;            
            quiz.IsLive = false;

            db.Quizzes.Add(quiz);

            // Update the Question's Content only.
            db.Entry(quiz).State = EntityState.Modified;
            db.Entry(quiz).Property(x => x.VisitCount).IsModified = false;
            db.Entry(quiz).Property(x => x.CreatedDate).IsModified = false;
            db.Entry(quiz).Property(x => x.UpdatedDate).IsModified = false;

            AddOrUpdateQuizTags(quiz.QuizId, quizView.getQuizTags());
            AddOrUpdateQuestions(quizView.Questions);
            return quiz;
        }

        private void AddOrUpdateQuestions(List<QuestionViewModel> questionViews)
        {            
            foreach (QuestionViewModel questionView in questionViews)
            {
                if (QuestionExists(questionView.QuestionId))
                {
                    UpdateQuestion(questionView);                    
                }
                else
                {
                    AddQuestion(questionView);
                }                
            }
        }

        private Question AddQuestion(QuestionViewModel questionView)
        {
            Question question = questionView.ToDbModel();
            question.CreatedDate = DateTime.Now;
            question.UpdatedDate = DateTime.Now;
            question.UpdateCount = 0;
            question.VisitCount = 0;
            db.Questions.Add(question);

            AddOrUpdateQuestionTags(question.QuestionId, questionView.getQuestionTags());
            return question;
        }

        private Question UpdateQuestion(QuestionViewModel questionView)
        {
            Question question = questionView.ToDbModel();
            
            question.UpdatedDate = DateTime.Now;            
            question.IsLive = false;

            db.Questions.Add(question);

            // Update the Question's Content only.
            db.Entry(question).State = EntityState.Modified;
            db.Entry(question).Property(x => x.VisitCount).IsModified = false;
            db.Entry(question).Property(x => x.CreatedDate).IsModified = false;
            db.Entry(question).Property(x => x.UpdatedDate).IsModified = false;

            AddOrUpdateQuestionTags(question.QuestionId, questionView.getQuestionTags());
            return question;
        }

        private void AddOrUpdateQuestionTags(int questionId, List<QuestionTag> questionTags)
        {
            // Updating Question Tags is deleteing all first then adding all selected.
            db.QuestionTags.RemoveRange(db.QuestionTags.Where(act => act.QuestionId == questionId));
            db.QuestionTags.AddRange(questionTags);
        }

        private void AddOrUpdateQuizTags(int quizId, List<QuizTag> quizTags)
        {
            // Updating Quiz Tags is deleteing all first then adding all selected.
            db.QuizTags.RemoveRange(db.QuizTags.Where(act => act.QuizId == quizId));
            db.QuizTags.AddRange(quizTags);
        }


      

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool QuizExists(int id)
        {
            return db.Quizzes.Count(e => e.QuizId == id) > 0;
        }

        private bool QuestionExists(int id)
        {
            return db.Questions.Count(e => e.QuestionId == id) > 0;
        }
    }
}