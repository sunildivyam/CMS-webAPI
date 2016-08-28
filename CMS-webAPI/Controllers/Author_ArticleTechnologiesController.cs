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
    public class Author_ArticleTechnologiesController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();

        // GET: api/Author_ArticleTechnologies
        public IQueryable<Author_ArticleTechnology> GetAuthor_ArticleTechnologies()
        {
            return db.Author_ArticleTechnologies;
        }

        // GET: api/Author_ArticleTechnologies/5
        [ResponseType(typeof(Author_ArticleTechnology))]
        public async Task<IHttpActionResult> GetAuthor_ArticleTechnology(int id)
        {
            Author_ArticleTechnology author_ArticleTechnology = await db.Author_ArticleTechnologies.FindAsync(id);
            if (author_ArticleTechnology == null)
            {
                return NotFound();
            }

            return Ok(author_ArticleTechnology);
        }

        // PUT: api/Author_ArticleTechnologies/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutAuthor_ArticleTechnology(int id, Author_ArticleTechnology author_ArticleTechnology)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != author_ArticleTechnology.Id)
            {
                return BadRequest();
            }

            db.Entry(author_ArticleTechnology).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Author_ArticleTechnologyExists(id))
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

        // POST: api/Author_ArticleTechnologies
        [ResponseType(typeof(Author_ArticleTechnology))]
        public async Task<IHttpActionResult> PostAuthor_ArticleTechnology(Author_ArticleTechnology author_ArticleTechnology)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Author_ArticleTechnologies.Add(author_ArticleTechnology);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = author_ArticleTechnology.Id }, author_ArticleTechnology);
        }

        // DELETE: api/Author_ArticleTechnologies/5
        [ResponseType(typeof(Author_ArticleTechnology))]
        public async Task<IHttpActionResult> DeleteAuthor_ArticleTechnology(int id)
        {
            Author_ArticleTechnology author_ArticleTechnology = await db.Author_ArticleTechnologies.FindAsync(id);
            if (author_ArticleTechnology == null)
            {
                return NotFound();
            }

            db.Author_ArticleTechnologies.Remove(author_ArticleTechnology);
            await db.SaveChangesAsync();

            return Ok(author_ArticleTechnology);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Author_ArticleTechnologyExists(int id)
        {
            return db.Author_ArticleTechnologies.Count(e => e.Id == id) > 0;
        }
    }
}