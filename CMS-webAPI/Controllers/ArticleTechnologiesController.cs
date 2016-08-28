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
    public class ArticleTechnologiesController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();

        // GET: api/ArticleTechnologies
        public IQueryable<ArticleTechnology> GetArticleTechnologies()
        {
            return db.ArticleTechnologies;
        }

        // GET: api/ArticleTechnologies/5
        [ResponseType(typeof(ArticleTechnology))]
        public async Task<IHttpActionResult> GetArticleTechnology(int id)
        {
            ArticleTechnology articleTechnology = await db.ArticleTechnologies.FindAsync(id);
            if (articleTechnology == null)
            {
                return NotFound();
            }

            return Ok(articleTechnology);
        }

        // PUT: api/ArticleTechnologies/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutArticleTechnology(int id, ArticleTechnology articleTechnology)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != articleTechnology.Id)
            {
                return BadRequest();
            }

            db.Entry(articleTechnology).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleTechnologyExists(id))
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

        // POST: api/ArticleTechnologies
        [ResponseType(typeof(ArticleTechnology))]
        public async Task<IHttpActionResult> PostArticleTechnology(ArticleTechnology articleTechnology)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ArticleTechnologies.Add(articleTechnology);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = articleTechnology.Id }, articleTechnology);
        }

        // DELETE: api/ArticleTechnologies/5
        [ResponseType(typeof(ArticleTechnology))]
        public async Task<IHttpActionResult> DeleteArticleTechnology(int id)
        {
            ArticleTechnology articleTechnology = await db.ArticleTechnologies.FindAsync(id);
            if (articleTechnology == null)
            {
                return NotFound();
            }

            db.ArticleTechnologies.Remove(articleTechnology);
            await db.SaveChangesAsync();

            return Ok(articleTechnology);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ArticleTechnologyExists(int id)
        {
            return db.ArticleTechnologies.Count(e => e.Id == id) > 0;
        }
    }
}