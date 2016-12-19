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


        // This is Default Route and should return a BadRequest.
        // GET: api/AuthorContents
        public IHttpActionResult Get()
        {
            return BadRequest();
        }


        // gets all Unpublished AuthorContents for the current User Only.
        // means where PublishedDate is null
        // GET: api/AuthorContents/GetAuthorContents
        public IHttpActionResult GetAuthorContents()
        {
            var applicationDbContext = new ApplicationDbContext();
            ApplicationUser currentUser = applicationDbContext.Users.Where(u => u.UserName == User.Identity.Name).Single();

            List<AuthorContent> authorContents = db.AuthorContents
                .Where(c => c.AuthorId == currentUser.Id && c.PublishedDate == null)
                .ToList<AuthorContent>();

            List<AuthorContentViewModel> authorContentViews = new List<AuthorContentViewModel>();

            foreach (AuthorContent authorContent in authorContents)
            {
                authorContentViews.Add(new AuthorContentViewModel(authorContent));
            }


            return Ok(authorContentViews);
        }

        // gets all Unpublished AuthorContents for the current User Only.
        // means where PublishedDate is not null
        // GET: api/AuthorContents/GetPublishedAuthorContents
        public IHttpActionResult GetPublishedAuthorContents()
        {
            var applicationDbContext = new ApplicationDbContext();
            ApplicationUser currentUser = applicationDbContext.Users.Where(u => u.UserName == User.Identity.Name).Single();

            List<AuthorContent> authorContents = db.AuthorContents
                .Where(c => c.AuthorId == currentUser.Id && c.PublishedDate != null)
                .ToList<AuthorContent>();

            List<AuthorContentViewModel> authorContentViews = new List<AuthorContentViewModel>();

            foreach (AuthorContent authorContent in authorContents)
            {
                authorContentViews.Add(new AuthorContentViewModel(authorContent));
            }

            return Ok(authorContentViews);
        }

        // Gets an AuthorContent matching an Id passed as param1
        // GET: api/AuthorContents/GetAuthorContent/5
        [ResponseType(typeof(AuthorContentViewModel))]
        public async Task<IHttpActionResult> GetAuthorContent(int param1 /*AuthorContentId */)
        {
            AuthorContent authorContent = await db.AuthorContents.FindAsync(param1);
            if (authorContent == null)
            {
                return NotFound();
            }

            var authorContentView = new AuthorContentViewModel(authorContent);

            return Ok(authorContentView);
        }

        // Updates an AuthorContent matching an Id passed as param1
        // PUT: api/AuthorContents/PutAuthorContent/5
        [ResponseType(typeof(AuthorContentViewModel))]
        public async Task<IHttpActionResult> PutAuthorContent(int param1 /*AuthorContentId */, AuthorContentViewModel authorContentView)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // If AuthorContent ID mismatches, its a bad request to update
            // If It is already Published, It should not be allowed to Update.
            if (param1 != authorContentView.AuthorContentId || authorContentView.PublishedDate != null)
            {
                return BadRequest();
            }

            AuthorContentViewModel updatedAuthorContentView = await UpdateAuthorContent(param1, authorContentView);
            //return StatusCode(HttpStatusCode.NoContent);
            return Ok(updatedAuthorContentView);
        }

        // Adds a new AuthorContent
        // POST: api/AuthorContents/PostAuthorContent
        [ResponseType(typeof(AuthorContentViewModel))]
        public async Task<IHttpActionResult> PostAuthorContent(AuthorContentViewModel authorContentView)
        {
            // modelstate is invalid or AuthorContent is already published.
            if (!ModelState.IsValid || authorContentView.PublishedDate != null)
            {
                return BadRequest(ModelState);
            }

            AuthorContentViewModel addedAuthorContentView = await AddAuthorContent(authorContentView);

            return Ok(addedAuthorContentView);
        }

        // Publishes an AuthorContent to Contents and its related data to other tables like ContentTags etc.
        // Note: must be Added to AuthorContents table before it is published. Means AuthorContentId is mandatory.
        // POST: api/AuthorContents/PostPublishContent/5
        [ResponseType(typeof(ContentViewModel))]
        public async Task<IHttpActionResult> PostPublishContent(int param1 /*AuthorContentId */, AuthorContentViewModel authorContentView)
        {
            //if modestateis invalid or param1 (AuthorContentId is not same as to the AuthorContent itself or is already published
            // should be a bad request.
            if (!ModelState.IsValid || param1 != authorContentView.AuthorContentId || authorContentView.PublishedDate != null)
            {
                return BadRequest(ModelState);
            }

            Content contentToPub = new Content();
            ContentViewModel contentView = new ContentViewModel(authorContentView);
            

            if (authorContentView.ContentId != null && authorContentView.ContentId > 0)
            {
                // Content in Pub Should be Updated
                contentView = await UpdateContent(contentToPub.ContentId, contentView);
                // Updates the AuthorContent with the Published content's ContentId
                authorContentView.ContentId = contentView.ContentId;
                authorContentView.PublishedDate = contentView.PublishedDate;
            }
            else
            {
                // Content in Pub Should be Added.
                contentToPub = contentView.ToDbModel();

                var contentTags = new List<ContentTag>();

                for (var i = 0; i < contentView.Tags.Count; i++ )
                {
                    var contentTag = new ContentTag();
                    contentTag.ContentId = contentView.ContentId;
                    contentTag.TagId = contentView.Tags[i].TagId;
                    contentTags.Add(contentTag);
                }

                contentToPub.OwnerId = UserService.getUserByUserName(User.Identity.Name).Id;
                contentToPub.PublishedDate = DateTime.Today;
                contentToPub.VisitCount = 0;
                contentToPub.IsLive = true;

                db.Contents.Add(contentToPub);
                db.ContentTags.AddRange(contentTags);
                await db.SaveChangesAsync();
                // Updates the AuthorContent with the Published content's ContentId
                authorContentView.ContentId = contentToPub.ContentId;
                authorContentView.PublishedDate = contentToPub.PublishedDate;

            }            

            // Updates or Adds AuthorContent before Publishing it.
            if (authorContentView.AuthorContentId > 0)
            {
                await UpdateAuthorContent(authorContentView.AuthorContentId, authorContentView);
            }
            else
            {
                await AddAuthorContent(authorContentView);
            }

            ContentViewModel publishedContentView = new ContentViewModel(contentToPub);

            return Ok(publishedContentView);
        }

        // DELETE: api/AuthorContents/5
        [ResponseType(typeof(AuthorContent))]
        public async Task<IHttpActionResult> DeleteAuthorContent(int param1)
        {
            AuthorContent authorContent = await db.AuthorContents.FindAsync(param1);
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

        private async Task<AuthorContentViewModel> AddAuthorContent(AuthorContentViewModel authorContentView)
        {
            AuthorContent authorContent = authorContentView.ToDbModel();

            var authorContentTags = new List<AuthorContentTag>();

            for (var i = 0; i < authorContentView.Tags.Count; i++)
            {
                var authorContentTag = new AuthorContentTag();
                authorContentTag.AuthorContentId = authorContentView.AuthorContentId;
                authorContentTag.TagId = authorContentView.Tags[i].TagId;
                authorContentTags.Add(authorContentTag);
            }

            authorContent.AuthorId = UserService.getUserByUserName(User.Identity.Name).Id;
            authorContent.UpdatedDate = DateTime.Today;

            db.AuthorContents.Add(authorContent);
            db.AuthorContentTags.AddRange(authorContentTags);

            await db.SaveChangesAsync();

            return new AuthorContentViewModel(authorContent);
        }

        private async Task<AuthorContentViewModel> UpdateAuthorContent(int Id, AuthorContentViewModel authorContentView)
        {
            AuthorContent authorContent = authorContentView.ToDbModel();
            var authorContentTags = authorContentView.getAuthorContentTags();

            authorContent.AuthorId = UserService.getUserByUserName(User.Identity.Name).Id;
            authorContent.UpdatedDate = DateTime.Today;

            db.AuthorContents.Add(authorContent);

            // Updating AuthorContent Tags is deleteing all first then adding all selected.
            db.AuthorContentTags.RemoveRange(db.AuthorContentTags.Where(act => act.AuthorContentId == authorContent.AuthorContentId));
            db.AuthorContentTags.AddRange(authorContentTags);

            // Update the AuthorContent's Content only.
            db.Entry(authorContent).State = EntityState.Modified;

            await db.SaveChangesAsync();

            return new AuthorContentViewModel(authorContent);
        }

        private async Task<ContentViewModel> UpdateContent(int Id, ContentViewModel contentView)
        {
            Content content = contentView.ToDbModel();
            var contentTags = contentView.getContentTags();

            content.OwnerId = UserService.getUserByUserName(User.Identity.Name).Id;
            content.PublishedDate = DateTime.Today;
            content.IsLive = true;
            Content originalContent = await db.Contents.FindAsync(content.ContentId);
            content.VisitCount = originalContent.VisitCount;

            db.Contents.Add(content);

            // Updating Content Tags is deleteing all first then adding all selected.
            db.ContentTags.RemoveRange(db.ContentTags.Where(act => act.ContentId == content.ContentId));
            db.ContentTags.AddRange(contentTags);

            // Update the Content's Content only.
            db.Entry(content).State = EntityState.Modified;

            await db.SaveChangesAsync();

            return new ContentViewModel(content);
        }

    }
}