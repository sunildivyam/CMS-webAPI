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