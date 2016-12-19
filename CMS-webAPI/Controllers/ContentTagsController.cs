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

        public IHttpActionResult Get()
        {
            return BadRequest();
        }

        // GET: api/ContentTags
        public IQueryable<ContentTag> GetContentTags()
        {
            return db.ContentTags;
        }

        // GET: api/ContentTags/5
        [ResponseType(typeof(ContentTag))]
        public async Task<IHttpActionResult> GetContentTag(int param1)
        {
            var id = param1;

            ContentTag contentTag = await db.ContentTags.FindAsync(id);
            if (contentTag == null)
            {
                return NotFound();
            }

            return Ok(contentTag);
        }

        // PUT: api/ContentTags/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutContentTag(int param1, ContentTag contentTag)
        {
            var id = param1;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contentTag.ContentTagId)
            {
                return BadRequest();
            }

            db.Entry(contentTag).State = EntityState.Modified;

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
        public async Task<IHttpActionResult> PostContentTag(ContentTag contentTag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ContentTags.Add(contentTag);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = contentTag.ContentTagId }, contentTag);
        }

        // DELETE: api/ContentTags/5
        [ResponseType(typeof(ContentTag))]
        public async Task<IHttpActionResult> DeleteContentTag(int param1)
        {
            var id = param1;
            ContentTag contentTag = await db.ContentTags.FindAsync(id);
            if (contentTag == null)
            {
                return NotFound();
            }

            db.ContentTags.Remove(contentTag);
            await db.SaveChangesAsync();

            return Ok(contentTag);
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
            return db.ContentTags.Count(e => e.ContentTagId == id) > 0;
        }
    }
}