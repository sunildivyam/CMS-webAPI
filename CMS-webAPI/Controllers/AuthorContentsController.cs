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
using CMS_webAPI.Controllers;

namespace CMS_webAPI.Controllers
{
    public class AuthorContentsController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();
       
        // GET: api/AuthorContents
        public IHttpActionResult GetAuthorContents()
        {
            var applicationDbContext = new ApplicationDbContext();
            ApplicationUser currentUser = applicationDbContext.Users.Where(u => u.UserName == User.Identity.Name).Single();

            List<AuthorContent> authorContents = db.AuthorContents.Where(c => c.AuthorId == currentUser.Id).ToList<AuthorContent>();

            List<AuthorContentViewModel> authorContentViews = new List<AuthorContentViewModel>();

            foreach (AuthorContent authorContent in authorContents)
            {                
                authorContentViews.Add(new AuthorContentViewModel(authorContent));
            }


            return Ok(authorContentViews);          
        }

        // GET: api/AuthorContents/5
        [ResponseType(typeof(AuthorContent))]
        public async Task<IHttpActionResult> GetAuthorContent(int id)
        {
            AuthorContent authorContent = await db.AuthorContents.FindAsync(id);
            if (authorContent == null)
            {
                return NotFound();
            }
            
            var authorContentView = new AuthorContentViewModel(authorContent);

            return Ok(authorContentView);
        }

        // PUT: api/AuthorContents/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutAuthorContent(int id, AuthorContentViewModel authorContentView)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != authorContentView.AuthorContentId)
            {
                return BadRequest();
            }

            ApplicationUser user = await BaseApiController.UserManager.FindByNameAsync(User.Identity.Name);
            AuthorContent authorContent = authorContentView.ToDbModel();
            var authorContentTags = authorContentView.getAuthorContentTags();
          
            authorContent.AuthorId = user.Id;
            authorContent.UpdatedDate = DateTime.Today;

            db.AuthorContents.Add(authorContent);

            // Updating AuthorContent Tags is deleteing all first then adding all selected.
            db.AuthorContentTags.RemoveRange(db.AuthorContentTags.Where(act => act.AuthorContentId == authorContent.AuthorContentId));
            db.AuthorContentTags.AddRange(authorContentTags);
            
            // Update the AuthorContent's Content only.
            db.Entry(authorContent).State = EntityState.Modified;
            

            await db.SaveChangesAsync();

            //return StatusCode(HttpStatusCode.NoContent);
            return Ok(authorContentView);
        }

        // POST: api/AuthorContents
        [ResponseType(typeof(AuthorContent))]
        public async Task<IHttpActionResult> PostAuthorContent(AuthorContentViewModel authorContentView)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ApplicationUser user = await BaseApiController.UserManager.FindByNameAsync(User.Identity.Name);
            AuthorContent authorContent = authorContentView.ToDbModel();
            var authorContentTags = new List<AuthorContentTag>();            

            for (var i = 0; i < authorContentView.Tags.Count; i++ ) 
            {
                var authorContentTag = new AuthorContentTag();
                authorContentTag.AuthorContentId = authorContentView.AuthorContentId;
                authorContentTag.TagId = authorContentView.Tags[i].TagId;
                authorContentTags.Add(authorContentTag);
            }

            authorContent.AuthorId = user.Id;
            authorContent.UpdatedDate = DateTime.Today;            

            db.AuthorContents.Add(authorContent);
            db.AuthorContentTags.AddRange(authorContentTags);

            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = authorContent.AuthorContentId }, authorContent);
        }

        // DELETE: api/AuthorContents/5
        [ResponseType(typeof(AuthorContent))]
        public async Task<IHttpActionResult> DeleteAuthorContent(int id)
        {
            AuthorContent authorContent = await db.AuthorContents.FindAsync(id);
            if (authorContent == null)
            {
                return NotFound();
            }

            db.AuthorContents.Remove(authorContent);
            await db.SaveChangesAsync();

            return Ok(authorContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AuthorContentExists(int id)
        {
            return db.AuthorContents.Count(e => e.AuthorContentId == id) > 0;
        }
    }
}