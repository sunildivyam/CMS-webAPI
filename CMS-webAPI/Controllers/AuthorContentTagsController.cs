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
    public class AuthorContentTagsController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();

        // GET: api/AuthorContentTags
        public IQueryable<AuthorContentTag> GetAuthorContentTags()
        {
            return db.AuthorContentTags;
        }

        // GET: api/AuthorContentTags/5
        [ResponseType(typeof(AuthorContentTag))]
        public async Task<IHttpActionResult> GetAuthorContentTag(int id)
        {
            AuthorContentTag authorContentTag = await db.AuthorContentTags.FindAsync(id);
            if (authorContentTag == null)
            {
                return NotFound();
            }

            return Ok(authorContentTag);
        }

        // PUT: api/AuthorContentTags/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutAuthorContentTag(int id, AuthorContentTag authorContentTag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != authorContentTag.AuthorContentTagId)
            {
                return BadRequest();
            }

            db.Entry(authorContentTag).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuthorContentTagExists(id))
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

        // POST: api/AuthorContentTags
        [ResponseType(typeof(AuthorContentTag))]
        public async Task<IHttpActionResult> PostAuthorContentTag(AuthorContentTag authorContentTag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AuthorContentTags.Add(authorContentTag);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = authorContentTag.AuthorContentTagId }, authorContentTag);
        }

        // DELETE: api/AuthorContentTags/5
        [ResponseType(typeof(AuthorContentTag))]
        public async Task<IHttpActionResult> DeleteAuthorContentTag(int id)
        {
            AuthorContentTag authorContentTag = await db.AuthorContentTags.FindAsync(id);
            if (authorContentTag == null)
            {
                return NotFound();
            }

            db.AuthorContentTags.Remove(authorContentTag);
            await db.SaveChangesAsync();

            return Ok(authorContentTag);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AuthorContentTagExists(int id)
        {
            return db.AuthorContentTags.Count(e => e.AuthorContentTagId == id) > 0;
        }
    }
}