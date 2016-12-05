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
        public async Task<IHttpActionResult> GetContent(int id)
        {
            Content content = await db.Contents.FindAsync(id);
            if (content == null)
            {
                return NotFound();
            }

            return Ok(content);
        }

        // PUT: api/Contents/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutContent(int id, Content content)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != content.ContentId)
            {
                return BadRequest();
            }

            db.Entry(content).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContentExists(id))
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
        public async Task<IHttpActionResult> PostContent(Content content)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Contents.Add(content);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = content.ContentId }, content);
        }

        // DELETE: api/Contents/5
        [ResponseType(typeof(Content))]
        public async Task<IHttpActionResult> DeleteContent(int id)
        {
            Content content = await db.Contents.FindAsync(id);
            if (content == null)
            {
                return NotFound();
            }

            db.Contents.Remove(content);
            await db.SaveChangesAsync();

            return Ok(content);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContentExists(int id)
        {
            return db.Contents.Count(e => e.ContentId == id) > 0;
        }
    }
}