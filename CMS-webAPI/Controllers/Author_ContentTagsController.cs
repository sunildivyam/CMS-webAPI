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
    public class Author_ContentTagsController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();

        // GET: api/Author_ContentTags
        public IQueryable<Author_ContentTag> GetAuthor_ContentTags()
        {
            return db.Author_ContentTags;
        }

        // GET: api/Author_ContentTags/5
        [ResponseType(typeof(Author_ContentTag))]
        public async Task<IHttpActionResult> GetAuthor_ContentTag(int id)
        {
            Author_ContentTag author_ContentTag = await db.Author_ContentTags.FindAsync(id);
            if (author_ContentTag == null)
            {
                return NotFound();
            }

            return Ok(author_ContentTag);
        }

        // PUT: api/Author_ContentTags/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutAuthor_ContentTag(int id, Author_ContentTag author_ContentTag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != author_ContentTag.Id)
            {
                return BadRequest();
            }

            db.Entry(author_ContentTag).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Author_ContentTagExists(id))
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

        // POST: api/Author_ContentTags
        [ResponseType(typeof(Author_ContentTag))]
        public async Task<IHttpActionResult> PostAuthor_ContentTag(Author_ContentTag author_ContentTag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Author_ContentTags.Add(author_ContentTag);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = author_ContentTag.Id }, author_ContentTag);
        }

        // DELETE: api/Author_ContentTags/5
        [ResponseType(typeof(Author_ContentTag))]
        public async Task<IHttpActionResult> DeleteAuthor_ContentTag(int id)
        {
            Author_ContentTag author_ContentTag = await db.Author_ContentTags.FindAsync(id);
            if (author_ContentTag == null)
            {
                return NotFound();
            }

            db.Author_ContentTags.Remove(author_ContentTag);
            await db.SaveChangesAsync();

            return Ok(author_ContentTag);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Author_ContentTagExists(int id)
        {
            return db.Author_ContentTags.Count(e => e.Id == id) > 0;
        }
    }
}