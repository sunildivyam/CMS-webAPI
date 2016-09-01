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
    public class ContentTagsController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();

        // GET: api/ContentTags
        public IQueryable<ContentTag> GetContentTags()
        {
            return db.ContentTags;
        }

        // GET: api/ContentTags/5
        [ResponseType(typeof(ContentTag))]
        public async Task<IHttpActionResult> GetContentTag(int id)
        {
            ContentTag ContentTag = await db.ContentTags.FindAsync(id);
            if (ContentTag == null)
            {
                return NotFound();
            }

            return Ok(ContentTag);
        }

        // PUT: api/ContentTags/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutContentTag(int id, ContentTag ContentTag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ContentTag.Id)
            {
                return BadRequest();
            }

            db.Entry(ContentTag).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContentTagExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ContentTags
        [ResponseType(typeof(ContentTag))]
        public async Task<IHttpActionResult> PostContentTag(ContentTag ContentTag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ContentTags.Add(ContentTag);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = ContentTag.Id }, ContentTag);
        }

        // DELETE: api/ContentTags/5
        [ResponseType(typeof(ContentTag))]
        public async Task<IHttpActionResult> DeleteContentTag(int id)
        {
            ContentTag ContentTag = await db.ContentTags.FindAsync(id);
            if (ContentTag == null)
            {
                return NotFound();
            }

            db.ContentTags.Remove(ContentTag);
            await db.SaveChangesAsync();

            return Ok(ContentTag);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContentTagExists(int id)
        {
            return db.ContentTags.Count(e => e.Id == id) > 0;
        }
    }
}