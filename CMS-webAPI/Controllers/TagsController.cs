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
    public class TagsController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();

        public IHttpActionResult Get()
        {
            return BadRequest();
        }

        // GET: api/Tags        
        public IQueryable<Tag> GetTags()
        {
            return db.Tags;
        }

        // GET: api/Tags/5        
        [ResponseType(typeof(Tag))]
        public async Task<IHttpActionResult> GetTag(int param1)
        {
            var id = param1;

            Tag tag = await db.Tags.FindAsync(id);
            if (tag == null)
            {
                return NotFound();
            }

            return Ok(tag);
        }

        // PUT: api/Tags/5
        [HttpPost]
        [Authorize(Roles = "Administrators")]
        [ResponseType(typeof(Tag))]
        public async Task<IHttpActionResult> PutTag(int param1, Tag tag)
        {
            var id = param1;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tag.TagId)
            {
                return BadRequest();
            }

            db.Entry(tag).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TagExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok(tag);
            //return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Tags
        [Authorize(Roles = "Administrators, Authors")]
        [ResponseType(typeof(Tag))]
        public async Task<IHttpActionResult> PostTag(Tag tag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Tags.Add(tag);
            await db.SaveChangesAsync();
            return Ok(tag);
            //return CreatedAtRoute("DefaultApi", new { id = tag.TagId }, tag);
        }

        // POST: api/Tags
        [Authorize(Roles = "Administrators, Authors")]
        [ResponseType(typeof(IList<Tag>))]
        public async Task<IHttpActionResult> PostTags(IList<Tag> tags)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IList<Tag> tagsvalidForAddition = new List<Tag>();
            try
            {
                foreach (Tag tag in tags) {
                    if (TagExists(tag.Name) == false)
                    {
                        tagsvalidForAddition.Add(tag);
                    }
                }
                if (tagsvalidForAddition.Count > 0)
                {
                    db.Tags.AddRange(tagsvalidForAddition);
                    await db.SaveChangesAsync();
                }
                else
                {
                    return Conflict();
                }                
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok(tagsvalidForAddition);
            //return CreatedAtRoute("DefaultApi", new { id = tag.TagId }, tag);
        }

        // DELETE: api/Tags/5
        [Authorize(Roles = "Administrators")]
        [ResponseType(typeof(Tag))]
        public async Task<IHttpActionResult> DeleteTag(int param1)
        {
            var id = param1;

            Tag tag = await db.Tags.FindAsync(id);
            if (tag == null)
            {
                return NotFound();
            }

            db.Tags.Remove(tag);
            await db.SaveChangesAsync();

            return Ok(tag);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TagExists(int id)
        {
            return db.Tags.Count(e => e.TagId == id) > 0;
        }

        private bool TagExists(string name)
        {
            return db.Tags.Count(e => e.Name == name) > 0;
        }
    }
}