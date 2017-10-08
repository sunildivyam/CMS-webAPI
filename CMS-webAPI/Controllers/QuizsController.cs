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
            Quiz quiz = await db.Quizs.Where(q=> q.QuizId == param1).SingleOrDefaultAsync();

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

            return Ok(originalQuiz);
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
    }
}