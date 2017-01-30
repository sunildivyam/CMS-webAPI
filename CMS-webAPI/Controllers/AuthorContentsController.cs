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
    [Authorize(Roles="Administrators, Authors")]
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
        [ResponseType(typeof(List<AuthorContentViewModel>))]
        public async Task<IHttpActionResult> GetPublishedAuthorContents()
        {
            var applicationDbContext = new ApplicationDbContext();
            ApplicationUser currentUser = applicationDbContext.Users.Where(u => u.UserName == User.Identity.Name).Single();
            
            IQueryable<AuthorContent> authorContentsQuery = db.AuthorContents.Join(db.Contents, ac => ac.AuthorContentId, c => c.AuthorContentId, (ac, c) => ac)
                .Where(ac => ac.AuthorId == currentUser.Id && ac.PublishedDate != null && ac.ContentId > 0)
                .OrderByDescending(ac=> ac.PublishedDate)
                .Select(acc => acc);
            List<AuthorContent> authorContents = await authorContentsQuery.ToListAsync<AuthorContent>();            
           
            List<AuthorContentViewModel> authorContentViews = new List<AuthorContentViewModel>();

            foreach (AuthorContent authorContent in authorContents)
            {
                authorContentViews.Add(new AuthorContentViewModel(authorContent));
            }

            return Ok(authorContentViews);
        }

        [ResponseType(typeof(List<AuthorContentViewModel>))]
        public async Task<IHttpActionResult> getContentAuthoringHistory(int param1)
        {
            int contentId = param1;

            var applicationDbContext = new ApplicationDbContext();
            ApplicationUser currentUser = applicationDbContext.Users.Where(u => u.UserName == User.Identity.Name).Single();

            IQueryable<AuthorContent> authorContentsQuery = db.AuthorContents
                .Where(ac => ac.AuthorId == currentUser.Id && ac.ContentId == contentId)
                .OrderByDescending(ac => ac.AuthorContentId);
            List<AuthorContent> authorContents = await authorContentsQuery.ToListAsync<AuthorContent>();

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

            if (authorContent.ContentId > 0 && authorContent.PublishedDate != null)
            {
                // if Content is already Published but want to edit again. So need to be checked if it is not already taken for edit.
                AuthorContent duplicateContent = await db.AuthorContents.FirstOrDefaultAsync(c => c.ContentId == authorContent.ContentId && c.PublishedDate == null);
                if (duplicateContent != null)
                {
                    // This will ensure that AuthorContents can never have more than one unpublished record for any Published Content
                    authorContent = duplicateContent;   
                }
            }
            var authorContentView = new AuthorContentViewModel(authorContent);

            return Ok(authorContentView);
        }

        // Updates an AuthorContent matching an Id passed as param1
        // PUT: api/AuthorContents/PutAuthorContent/5
        [ResponseType(typeof(AuthorContentViewModel))]
        public async Task<IHttpActionResult> PutAuthorContent(int param1, AuthorContentViewModel authorContentView)
        {
            var authorContentId = param1;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // If AuthorContent ID mismatches, its a bad request to update
            // If It is already Published, It should not be allowed to Update.
            if (authorContentId != authorContentView.AuthorContentId || authorContentView.PublishedDate != null)
            {
                return BadRequest();
            }

            AuthorContentViewModel updatedAuthorContentView = new AuthorContentViewModel(UpdateAuthorContent(authorContentId, authorContentView));
            await db.SaveChangesAsync();
            updatedAuthorContentView.UpdateCount = updatedAuthorContentView.UpdateCount + 1;
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
            AuthorContent authorContnet = AddAuthorContent(authorContentView);            
            await db.SaveChangesAsync();
            AuthorContentViewModel addedAuthorContentView = new AuthorContentViewModel(authorContnet);

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
            ContentViewModel publishedContentView;
            using (db)
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        if (authorContentView.ContentId != null && authorContentView.ContentId > 0)
                        {
                            // Content in Pub Should be Updated                            
                            contentView = new ContentViewModel( UpdateContent(contentToPub.ContentId, contentView));
                            // Updates the AuthorContent with the Published content's ContentId
                            authorContentView.ContentId = contentView.ContentId;
                            authorContentView.PublishedDate = contentView.PublishedDate;
                            contentToPub = contentView.ToDbModel();
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
                            contentToPub.PublishedDate = DateTime.Now;
                            contentToPub.VisitCount = 0;
                            contentToPub.IsLive = true;

                            db.Contents.Add(contentToPub);
                            db.ContentTags.AddRange(contentTags);                
                            // Updates the AuthorContent with the Published content's ContentId
                            await db.SaveChangesAsync();
                            authorContentView.ContentId = contentToPub.ContentId;
                            authorContentView.PublishedDate = contentToPub.PublishedDate;
                            publishedContentView = new ContentViewModel(contentToPub);
                        }            

                        // Updates or Adds AuthorContent After Publishing it.
                        if (authorContentView.AuthorContentId > 0)
                        {
                            new AuthorContentViewModel(UpdateAuthorContent(authorContentView.AuthorContentId, authorContentView));
                        }
                        else
                        {
                            new AuthorContentViewModel( AddAuthorContent(authorContentView));
                        }                

                        await db.SaveChangesAsync();

                        // Updates AuthorContentId to Published Content.
                        Content originalContent = db.Contents.Find(contentToPub.ContentId);
                        contentToPub.AuthorContentId = authorContentView.AuthorContentId;
                        db.Entry(originalContent).CurrentValues.SetValues(contentToPub);
                        await db.SaveChangesAsync();

                        publishedContentView = new ContentViewModel(contentToPub);
                        dbTransaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return InternalServerError(ex);
                    }
                }
            }

            //ContentViewModel publishedContentView = new ContentViewModel(contentToPub);
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

        private  AuthorContent AddAuthorContent(AuthorContentViewModel authorContentView)
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
            authorContent.UpdatedDate = DateTime.Now;
            authorContent.UpdateCount = 0;

            db.AuthorContents.Add(authorContent);
            db.AuthorContentTags.AddRange(authorContentTags);

            return authorContent;
            
        }

        private  AuthorContent UpdateAuthorContent(int Id, AuthorContentViewModel authorContentView)
        {
            AuthorContent authorContent = authorContentView.ToDbModel();
            var authorContentTags = authorContentView.getAuthorContentTags();

            authorContent.AuthorId = UserService.getUserByUserName(User.Identity.Name).Id;
            authorContent.UpdatedDate = DateTime.Now;

            db.AuthorContents.Add(authorContent);

            // Updating AuthorContent Tags is deleteing all first then adding all selected.
            db.AuthorContentTags.RemoveRange(db.AuthorContentTags.Where(act => act.AuthorContentId == authorContent.AuthorContentId));
            db.AuthorContentTags.AddRange(authorContentTags);

            // Update the AuthorContent's Content only.
            db.Entry(authorContent).State = EntityState.Modified;
            db.Entry(authorContent).Property(x => x.UpdateCount).IsModified = false;
            return authorContent;
        }

        private Content UpdateContent(int Id, ContentViewModel contentView)
        {
            Content content = contentView.ToDbModel();
            var contentTags = contentView.getContentTags();

            content.OwnerId = UserService.getUserByUserName(User.Identity.Name).Id;
            content.PublishedDate = DateTime.Now;
            content.IsLive = true;
            Content originalContent = db.Contents.Find(content.ContentId);
            content.VisitCount = originalContent.VisitCount;
            
            db.Entry(originalContent).CurrentValues.SetValues(content);
            // Updating Content Tags is deleteing all first then adding all selected.
            db.ContentTags.RemoveRange(db.ContentTags.Where(act => act.ContentId == content.ContentId));
            db.ContentTags.AddRange(contentTags);
            
            return content;
            
        }

    }
}