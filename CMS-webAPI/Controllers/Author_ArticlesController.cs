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
    public class Author_ArticlesController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();

        // GET: api/Author_Articles
        public IQueryable<Author_Article> GetAuthor_Articles()
        {
            return db.Author_Articles;
        }

        // GET: api/Author_Articles/5
        [ResponseType(typeof(Author_Article))]
        public async Task<IHttpActionResult> GetAuthor_Article(int id)
        {
            Author_Article author_Article = await db.Author_Articles.FindAsync(id);
            if (author_Article == null)
            {
                return NotFound();
            }

            return Ok(author_Article);
        }

        // PUT: api/Author_Articles/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutAuthor_Article(int id, Author_Article author_Article)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != author_Article.Id)
            {
                return BadRequest();
            }

            db.Entry(author_Article).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Author_ArticleExists(id))
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

        // POST: api/Author_Articles
        [ResponseType(typeof(Author_Article))]
        public async Task<IHttpActionResult> PostAuthor_Article(Author_Article author_Article)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Author_Articles.Add(author_Article);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = author_Article.Id }, author_Article);
        }

        // DELETE: api/Author_Articles/5
        [ResponseType(typeof(Author_Article))]
        public async Task<IHttpActionResult> DeleteAuthor_Article(int id)
        {
            Author_Article author_Article = await db.Author_Articles.FindAsync(id);
            if (author_Article == null)
            {
                return NotFound();
            }

            db.Author_Articles.Remove(author_Article);
            await db.SaveChangesAsync();

            return Ok(author_Article);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Author_ArticleExists(int id)
        {
            return db.Author_Articles.Count(e => e.Id == id) > 0;
        }
    }
}