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
    public class ContentsController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();

        // GET: api/Contents
        public IQueryable<Content> GetContents()
        {
            return db.Contents;
        }

        // GET: api/Contents/5
        [ResponseType(typeof(Content))]
        public async Task<IHttpActionResult> GetArticle(int id)
        {
            Content article = await db.Contents.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            return Ok(article);
        }

        // PUT: api/Contents/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutArticle(int id, Content article)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != article.Id)
            {
                return BadRequest();
            }

            db.Entry(article).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleExists(id))
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

        // POST: api/Contents
        [ResponseType(typeof(Content))]
        public async Task<IHttpActionResult> PostArticle(Content article)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Contents.Add(article);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = article.Id }, article);
        }

        // DELETE: api/Contents/5
        [ResponseType(typeof(Content))]
        public async Task<IHttpActionResult> DeleteArticle(int id)
        {
            Content article = await db.Contents.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            db.Contents.Remove(article);
            await db.SaveChangesAsync();

            return Ok(article);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ArticleExists(int id)
        {
            return db.Contents.Count(e => e.Id == id) > 0;
        }
    }
}