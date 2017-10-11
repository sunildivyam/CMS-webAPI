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

namespace CMS_webAPI.Controllers
{
    public class CommentsController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();

        // GET: api/Comments
        public IHttpActionResult Get()
        {
            return BadRequest();
        }

        //// GET METHODS

        // GET: api/Comments/GetCommentsByContentId/5
        [ResponseType(typeof(List<CommentViewModel>))]
        public async Task<IHttpActionResult> GetCommentsByContentId(int param1)
        {
            int contentId = param1;
            List<CommentViewModel> commentViewModels = new List<CommentViewModel>();

            List<Comment> comments = await db.Comments.Where(c=>c.ContentId==contentId).ToListAsync();
            if (comments != null)
            {
                foreach (Comment comment in comments)
                {
                    commentViewModels.Add(new CommentViewModel(comment));
                }
            }

            return Ok(commentViewModels);
        }


        // GET: api/Comments/GetCommentsByQuizId/5
        [ResponseType(typeof(List<QuizComment>))]
        public async Task<IHttpActionResult> GetCommentsByQuizId(int param1)
        {
            int quizId = param1;
            
            List<QuizComment> comments = await db.QuizComments.Where(c=>c.QuizId==quizId).ToListAsync();
            if (comments == null)
            {
                comments = new List<QuizComment>();
            }

            return Ok(comments);
        }

        // GET: api/Comments/GetCommentsByQuestionId/5
        [ResponseType(typeof(List<QuestionComment>))]
        public async Task<IHttpActionResult> GetCommentsByQuestionId(int param1)
        {
            int questionId = param1;
            
            List<QuestionComment> comments = await db.QuestionComments.Where(c=>c.QuestionId==questionId).ToListAsync();
            if (comments == null)
            {
                comments = new List<QuestionComment>();
            }

            return Ok(comments);
        }


        /////////// POST METHODS
        // POST: api/Comments/PostComment
        [Authorize(Roles = "Readers, Administrators, Authors")]
        [ResponseType(typeof(CommentViewModel))]
        public async Task<IHttpActionResult> PostComment(CommentViewModel commentViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Content content = await db.Contents.FindAsync(commentViewModel.ContentId);
            if (content == null)
            {
                return NotFound();
            }

            Comment comment = commentViewModel.ToDbModel();
            comment.OwnerId = UserService.getUserByUserName(User.Identity.Name).Id;
            comment.PostedDate = DateTime.Now;

            db.Comments.Add(comment);
            await db.SaveChangesAsync();

            CommentViewModel savedCommentViewModel = new CommentViewModel(comment);
            return Ok(savedCommentViewModel);
        }


        // POST: api/Comments/PostQuizComment
        [Authorize(Roles = "Readers, Administrators, Authors")]
        [ResponseType(typeof(QuizComment))]
        public async Task<IHttpActionResult> PostQuizComment(QuizComment quizComment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Quiz quiz = await db.Quizs.FindAsync(quizComment.QuizId);
            if (quiz == null)
            {
                return NotFound();
            }
           
            quizComment.OwnerId = UserService.getUserByUserName(User.Identity.Name).Id;
            quizComment.PostedDate = DateTime.Now;

            db.QuizComments.Add(quizComment);
            await db.SaveChangesAsync();
            
            return Ok(quizComment);
        }

        // POST: api/Comments/PostQuestionComment
        [Authorize(Roles = "Readers, Administrators, Authors")]
        [ResponseType(typeof(QuestionComment))]
        public async Task<IHttpActionResult> PostQuestionComment(QuestionComment questionComment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Question question = await db.Questions.FindAsync(questionComment.QuestionId);
            if (question == null)
            {
                return NotFound();
            }
           
            questionComment.OwnerId = UserService.getUserByUserName(User.Identity.Name).Id;
            questionComment.PostedDate = DateTime.Now;

            db.QuestionComments.Add(questionComment);
            await db.SaveChangesAsync();
            
            return Ok(questionComment);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CommentExists(int id)
        {
            return db.Comments.Count(e => e.CommentId == id) > 0;
        }
    }
}