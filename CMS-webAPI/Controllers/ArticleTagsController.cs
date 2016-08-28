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
    public class ArticleTagsController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();

        // GET: api/ArticleTags
        public IQueryable<ArticleTag> GetArticleTags()
        {
            return db.ArticleTags;
        }

        // GET: api/ArticleTags/5
        [ResponseType(typeof(ArticleTag))]
        public async Task<IHttpActionResult> GetArticleTag(int id)
        {
            ArticleTag articleTag = await db.ArticleTags.FindAsync(id);
            if (articleTag == null)
            {
                return NotFound();
            }

            return Ok(articleTag);
        }

        // PUT: api/ArticleTags/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutArticleTag(int id, ArticleTag articleTag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != articleTag.Id)
            {
                return BadRequest();
            }

            db.Entry(articleTag).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleTagExists(id))
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

        // POST: api/ArticleTags
        [ResponseType(typeof(ArticleTag))]
        public async Task<IHttpActionResult> PostArticleTag(ArticleTag articleTag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ArticleTags.Add(articleTag);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = articleTag.Id }, articleTag);
        }

        // DELETE: api/ArticleTags/5
        [ResponseType(typeof(ArticleTag))]
        public async Task<IHttpActionResult> DeleteArticleTag(int id)
        {
            ArticleTag articleTag = await db.ArticleTags.FindAsync(id);
            if (articleTag == null)
            {
                return NotFound();
            }

            db.ArticleTags.Remove(articleTag);
            await db.SaveChangesAsync();

            return Ok(articleTag);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ArticleTagExists(int id)
        {
            return db.ArticleTags.Count(e => e.Id == id) > 0;
        }
    }
}