using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CMS_webAPI.Models;

namespace CMS_webAPI.Controllers
{
    public class ArticlesController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();

        // GET: api/Articles
        public IQueryable<Articles> GetArticles()
        {
            return db.Articles;
        }

        // GET: api/Articles/5
        [ResponseType(typeof(Articles))]
        public IHttpActionResult GetArticles(int id)
        {
            Articles articles = db.Articles.Find(id);
            if (articles == null)
            {
                return NotFound();
            }

            return Ok(articles);
        }

        // PUT: api/Articles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutArticles(int id, Articles articles)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != articles.Id)
            {
                return BadRequest();
            }

            db.Entry(articles).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticlesExists(id))
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

        // POST: api/Articles
        [ResponseType(typeof(Articles))]
        public IHttpActionResult PostArticles(Articles articles)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Articles.Add(articles);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = articles.Id }, articles);
        }

        // DELETE: api/Articles/5
        [ResponseType(typeof(Articles))]
        public IHttpActionResult DeleteArticles(int id)
        {
            Articles articles = db.Articles.Find(id);
            if (articles == null)
            {
                return NotFound();
            }

            db.Articles.Remove(articles);
            db.SaveChanges();

            return Ok(articles);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ArticlesExists(int id)
        {
            return db.Articles.Count(e => e.Id == id) > 0;
        }
    }
}