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
using CMS_webAPI.AppCode;
using System.Web;

namespace CMS_webAPI.Controllers
{
    public class QuizsController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();
        
        /////// ALL GET METHODS

        // GET: api/Quizs/5
        [ResponseType(typeof(Quiz))]
        public async Task<IHttpActionResult> GetQuiz(int param1)
        {
            // Quiz quiz = await db.Quizs.FindAsync(param1);
            Quiz quiz = await db.Quizs.Include("Tags").Include("Questions").Include("Questions.Tags").Where(q=> q.QuizId == param1).SingleOrDefaultAsync();

            if (quiz == null)
            {
                return NotFound();
            }

            return Ok(quiz);
        }

        // GET: api/Quizs/GetDraftedQuiz
        [ResponseType(typeof(List<Quiz>))]
        public async Task<IHttpActionResult> GetDraftedQuizs()
        {
            string authorId = UserService.getUserByUserName(User.Identity.Name).Id;

            List<Quiz> quizs = await db.Quizs.Include("Tags").Where(qz => qz.AuthorId == authorId && qz.IsLive == false).ToListAsync<Quiz>();

            if (quizs == null)
            {
                quizs = new List<Quiz>();
            }

            return Ok(quizs);
        }

        // GET: api/Quizs/GetPublishedQuiz
        [ResponseType(typeof(List<Quiz>))]
        public async Task<IHttpActionResult> GetPublishedQuizs()
        {
            string authorId = UserService.getUserByUserName(User.Identity.Name).Id;

            List<Quiz> quizs = await db.Quizs.Include("Tags").Where(qz => qz.AuthorId == authorId && qz.IsLive == true).ToListAsync<Quiz>();

            if (quizs == null)
            {
                quizs = new List<Quiz>();
            }

            return Ok(quizs);
        }

      // GET: api/Quizs/GetPublishedQuiz
        [ResponseType(typeof(List<Question>))]
        public async Task<IHttpActionResult> GetPublishedQuestions()
        {
            string authorId = UserService.getUserByUserName(User.Identity.Name).Id;

            List<Question> questions = await db.Questions.Include("Tags").Where(q => q.AuthorId == authorId && q.IsLive == true).ToListAsync<Question>();

            if (questions == null)
            {
                questions = new List<Question>();
            }

            return Ok(questions);
        }

        
        /////// ALL POST METHODS
        // POST: api/Quizs
        [ResponseType(typeof(Quiz))]
        public async Task<IHttpActionResult> PostQuizBasicInfo(Quiz quiz)
        {            
            string authorId = UserService.getUserByUserName(User.Identity.Name).Id;
            Quiz originalQuiz;
            //Update Quiz Basic Info
            if (quiz.QuizId > 0) {
                originalQuiz = await db.Quizs.FindAsync(quiz.QuizId);
                if (originalQuiz == null || originalQuiz.AuthorId != authorId) {
                    return NotFound();
                }
                QuizService.UpdateQuizBasicInfo(quiz, originalQuiz, authorId, db);
            }
            // Add new Quiz Basic Info
            else {
                originalQuiz = quiz;
                QuizService.AddQuizBasicInfo(originalQuiz, authorId, db);
            }            
            
            try
            {
                await db.SaveChangesAsync();
            }
            catch (Exception ex) {
                return InternalServerError(ex);
            }
            
            
            // Clears the API cache 
            ClearApiCache(true, originalQuiz.QuizId);

            return Ok(originalQuiz);
        }

        
        public async Task<IHttpActionResult> PostQuizTags(Quiz quiz)
        {
            string authorId = UserService.getUserByUserName(User.Identity.Name).Id;
            Quiz originalQuiz;
            //Update Quiz Tags
            if (quiz.QuizId > 0)
            {
                originalQuiz = await db.Quizs.Include("Tags").Where(q=> q.QuizId == quiz.QuizId).FirstOrDefaultAsync<Quiz>();
                if (originalQuiz == null || originalQuiz.AuthorId != authorId)
                {
                    return NotFound();
                }
                QuizService.UpdateQuizTags(quiz, originalQuiz, authorId, db);
            }
            // No New Quiz Operation allowed here. only Update tags is allowed. so throe error
            else
            {
                return NotFound();

            }

            try
            {
                await db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }


            // Clears the API cache 
            ClearApiCache(true, originalQuiz.QuizId);

            return Ok(originalQuiz);
        }

        public async Task<IHttpActionResult> PostQuizQuestions(Quiz quiz)
        {
            string authorId = UserService.getUserByUserName(User.Identity.Name).Id;
            Quiz originalQuiz;
            //Update Quiz Tags
            if (quiz.QuizId > 0)
            {
                originalQuiz = await db.Quizs.Include("Questions").Where(q => q.QuizId == quiz.QuizId).FirstOrDefaultAsync<Quiz>();
                if (originalQuiz == null || originalQuiz.AuthorId != authorId)
                {
                    return NotFound();
                }
                QuizService.UpdateQuizQuestions(quiz, originalQuiz, authorId, db);
            }
            // No New Quiz Operation allowed here. only Update tags is allowed. so throe error
            else
            {
                return NotFound();

            }

            try
            {
                await db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            // Clear Cache 
            ClearApiCache(true, originalQuiz.QuizId);
            return Ok(originalQuiz);
        }

        public async Task<IHttpActionResult> PostQuestion(Question question)
        {
            string authorId = UserService.getUserByUserName(User.Identity.Name).Id;
            Question originalQuestion;

            //Update Question
            if (question.QuestionId > 0)
            {
                originalQuestion = await db.Questions.Include("Tags").Where(q => q.QuestionId == question.QuestionId).FirstOrDefaultAsync<Question>();
                if (originalQuestion == null || originalQuestion.AuthorId != authorId)
                {
                    return NotFound();
                }
                QuizService.UpdateQuestion(question, originalQuestion, authorId, db);
            }            
            else
            {
                originalQuestion = question;
                QuizService.AddQuestion(originalQuestion, authorId, db);
            }

            try
            {
                await db.SaveChangesAsync();                
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            // Clears the API cache 
            ClearApiCache(false, 0, originalQuestion);

            return Ok(originalQuestion);
        }

        public async Task<IHttpActionResult> PostPublishQuiz(Quiz quiz)
        {
            string authorId = UserService.getUserByUserName(User.Identity.Name).Id;
            Quiz originalQuiz;
            //Update Quiz Basic Info
            if (quiz.QuizId > 0)
            {
                originalQuiz = await db.Quizs.FindAsync(quiz.QuizId);
                if (originalQuiz == null || originalQuiz.AuthorId != authorId)
                {
                    return NotFound();
                }
                QuizService.UpdateQuizLiveStatus(originalQuiz, authorId, db, true); // makes Quiz Live
            }            
            else
            {
                return NotFound();
            }

            try
            {
                await db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            // Clears the API cache 
            ClearApiCache(true, originalQuiz.QuizId);

            return Ok(originalQuiz);
        }

        // POST: 
        [Authorize(Roles = "Administrators, Authors")]
        public async Task<HttpResponseMessage> PostQuizThumbnail(int param1)
        {
            var quizId = param1;
            Quiz quiz = await db.Quizs.FindAsync(quizId);

            if (quiz == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Quiz not Found: " + quizId);
            }

            return ImageHelper.UploadImageRequestToDisk(Request, quizId, quiz.Name, "quiz");
        }
        
        /// LIVE Quizes GET Methods
        /// 
        
        [ResponseType(typeof(QuizsViewModel))]
        public async Task<IHttpActionResult> GetLiveQuizsWithTags(int param1, int param2, string param3, bool param4)
        {
            string cacheKey = ApiCache.GenerateKey("Quizs", "GetLiveQuizsWithTags", new string[] { param1.ToString(), param2.ToString(), param3, param4.ToString() });
            QuizsViewModel quizsViewFromCache = (QuizsViewModel)ApiCache.Get(cacheKey);

            if (quizsViewFromCache != null)
            {
                return Ok(quizsViewFromCache);
            }
           
            int pageNo = param1;
            int pageSize = param2;
            string sortField = param3;
            bool sortDirAsc = param4;

            if (pageNo < 1 || pageSize < 1)
            {
                return BadRequest();
            }

            pageNo = pageNo - 1;            
           
            List<Quiz> quizs;
            IEnumerable<Quiz> quizsEnums;
            try
            {
                quizsEnums = await Task.Run(()=> db.Quizs.Include("Tags").Where(q => q.IsLive == true)
                    .AsEnumerable());
                quizs = QuizService.GetPagedData(quizsEnums, pageNo, pageSize, sortField, sortDirAsc);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            if (quizs == null)
            {
                return NotFound();
            }

            QuizsViewModel quizsView = new QuizsViewModel(quizs, quizsEnums.Count());

            ApiCache.Add(cacheKey, quizsView);
            return Ok(quizsView);
        }

        [ResponseType(typeof(QuizsViewModel))]
        public async Task<IHttpActionResult> GetLiveQuizsWithTagsByTag(int param1, string param2, int param3, int param4, string param5, bool param6)
        {
            string cacheKey = ApiCache.GenerateKey("Quizs", "GetLiveQuizsWithTagsByTag", new string[] { param1.ToString(), param2, param3.ToString(), param4.ToString(), param5, param6.ToString() });
            QuizsViewModel quizsViewFromCache = (QuizsViewModel)ApiCache.Get(cacheKey);

            if (quizsViewFromCache != null)
            {
                return Ok(quizsViewFromCache);
            }

            int tagId = param1;
            string tagName = param2;
            int pageNo = param3;
            int pageSize = param4;
            string sortField = param5;
            bool sortDirAsc = param6;

            if (pageNo < 1 || pageSize < 1)
            {
                return BadRequest();
            }

            pageNo = pageNo - 1;

            List<Quiz> quizs;
            IEnumerable<Quiz> quizsEnums;
            Tag tag;
            try
            {
                tag = await db.Tags.Where(t=> t.TagId == tagId && t.Name == tagName).FirstOrDefaultAsync();
                if (tag == null)
                {
                    return NotFound();
                }

                quizsEnums = db.Quizs.Include("Tags").Where(q => q.IsLive == true && q.Tags.Any(t => t.TagId == tagId))
                    .AsEnumerable();
                quizs = QuizService.GetPagedData(quizsEnums, pageNo, pageSize, sortField, sortDirAsc);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            if (quizs == null)
            {
                return NotFound();
            }
            int quizCount =  quizsEnums.Count();
            tag.Quizs = new List<Quiz>();
            QuizsViewModel quizsView = new QuizsViewModel(quizs, quizCount, tag);

            ApiCache.Add(cacheKey, quizsView);
            return Ok(quizsView);
        }

        [ResponseType(typeof(QuizsViewModel))]
        public async Task<IHttpActionResult> GetLiveQuizsWithTagsByAuthorName(string param1, int param2, int param3, string param4, bool param5)
        {
            string cacheKey = ApiCache.GenerateKey("Quizs", "GetLiveQuizsWithTagsByAuthorName", new string[] { param1, param2.ToString(), param3.ToString(), param4, param5.ToString() });
            QuizsViewModel quizsViewFromCache = (QuizsViewModel)ApiCache.Get(cacheKey);
            
            if (quizsViewFromCache != null)
            {
                return Ok(quizsViewFromCache);
            }
                        
            string userName = param1;
            int pageNo = param2;
            int pageSize = param3;
            string sortField = param4;
            bool sortDirAsc = param5;

            if (pageNo < 1 || pageSize < 1)
            {
                return BadRequest();
            }

            pageNo = pageNo - 1;

            List<Quiz> quizs;
            IEnumerable<Quiz> quizsEnums;                
            ApplicationUser user;
            try
            {
                user = UserService.getUserByUserName(userName);
                if (user == null)
                {
                    return NotFound();
                }

                quizsEnums = await Task.Run(()=> db.Quizs.Include("Tags").Where(q => q.IsLive == true && q.AuthorId == user.Id)
                    .AsEnumerable());
                quizs = QuizService.GetPagedData(quizsEnums, pageNo, pageSize, sortField, sortDirAsc);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            if (quizs == null)
            {
                return NotFound();
            }
            int quizCount = quizsEnums.Count();
            
            QuizsViewModel quizsView = new QuizsViewModel(quizs, quizCount, UserService.GetUserViewModelById(user.Id));

            ApiCache.Add(cacheKey, quizsView);
            return Ok(quizsView);
        }


        [ResponseType(typeof(Quiz))]
        public async Task<IHttpActionResult> GetLiveQuizWithTagsAndQuestions(int param1, string param2)
        {
            string cacheKey = ApiCache.GenerateKey("Quizs", "GetLiveQuizWithTagsAndQuestions", new string[] { param1.ToString(), param2 });
            Quiz quizFromCache = (Quiz)ApiCache.Get(cacheKey);

            if (quizFromCache != null)
            {
                return Ok(quizFromCache);
            }

            var quizId = param1;
            var quizName = param2;

            Quiz quiz = await db.Quizs.Include("Tags").Include("Questions").Where(q => q.QuizId == quizId && q.Name == quizName && q.IsLive == true).FirstOrDefaultAsync();
            if (quiz == null)
            {
                return NotFound();
            }
            
            //db.Database.ExecuteSqlCommand("exec proc_UpdateVisitCountOnQuizs " + quiz.QuizId);
            // Update and increment the VisitCount By 1
            // Code goes here
            ApiCache.Add(cacheKey, quiz);
            return Ok(quiz);
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
            return db.Quizs.Count(e => e.QuizId == id) > 0;
        }

        /*Quiz Id removes cache for Single QUIZ apis*/
        /*question removes cache for all referenced QUIZ apis*/
        private void ClearApiCache(bool isMultipleQuizsApi = true, int quizId = 0, Question question = null)
        {
            if (question != null)
            {
                List<Quiz> allReferedQuizs = db.Quizs.Where(qz => qz.Questions.Select<Question,int>(q=> q.QuestionId).ToList<int>().Contains(question.QuestionId)).ToList();
                if (allReferedQuizs != null)
                {
                    foreach (Quiz quiz in allReferedQuizs)
                    {
                        ApiCache.Remove("GetLiveQuizWithTagsAndQuestions/" + quiz.QuizId + "/", true);
                    }
                }
            }

            if (isMultipleQuizsApi == true)
            {
                ApiCache.Remove("GetLiveQuizsWithTags", true);
            }

            if (quizId > 0)
            {
                ApiCache.Remove("GetLiveQuizWithTagsAndQuestions/" + quizId + "/", true);
            }
        }
    }
}