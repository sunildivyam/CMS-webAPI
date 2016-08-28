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
    public class Author_ArticleTagsController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();

        // GET: api/Author_ArticleTags
        public IQueryable<Author_ArticleTag> GetAuthor_ArticleTags()
        {
            return db.Author_ArticleTags;
        }

        // GET: api/Author_ArticleTags/5
        [ResponseType(typeof(Author_ArticleTag))]
        public async Task<IHttpActionResult> GetAuthor_ArticleTag(int id)
        {
            Author_ArticleTag author_ArticleTag = await db.Author_ArticleTags.FindAsync(id);
            if (author_ArticleTag == null)
            {
                return NotFound();
            }

            return Ok(author_ArticleTag);
        }

        // PUT: api/Author_ArticleTags/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutAuthor_ArticleTag(int id, Author_ArticleTag author_ArticleTag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != author_ArticleTag.Id)
            {
                return BadRequest();
            }

            db.Entry(author_ArticleTag).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Author_ArticleTagExists(id))
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

        // POST: api/Author_ArticleTags
        [ResponseType(typeof(Author_ArticleTag))]
        public async Task<IHttpActionResult> PostAuthor_ArticleTag(Author_ArticleTag author_ArticleTag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Author_ArticleTags.Add(author_ArticleTag);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = author_ArticleTag.Id }, author_ArticleTag);
        }

        // DELETE: api/Author_ArticleTags/5
        [ResponseType(typeof(Author_ArticleTag))]
        public async Task<IHttpActionResult> DeleteAuthor_ArticleTag(int id)
        {
            Author_ArticleTag author_ArticleTag = await db.Author_ArticleTags.FindAsync(id);
            if (author_ArticleTag == null)
            {
                return NotFound();
            }

            db.Author_ArticleTags.Remove(author_ArticleTag);
            await db.SaveChangesAsync();

            return Ok(author_ArticleTag);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Author_ArticleTagExists(int id)
        {
            return db.Author_ArticleTags.Count(e => e.Id == id) > 0;
        }
    }
}