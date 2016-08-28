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
    public class TechnologiesController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();

        // GET: api/Technologies
        public IQueryable<Technology> GetTechnologies()
        {
            return db.Technologies;
        }

        // GET: api/Technologies/5
        [ResponseType(typeof(Technology))]
        public async Task<IHttpActionResult> GetTechnology(int id)
        {
            Technology technology = await db.Technologies.FindAsync(id);
            if (technology == null)
            {
                return NotFound();
            }

            return Ok(technology);
        }

        // PUT: api/Technologies/5
        [Authorize]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutTechnology(int id, Technology technology)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != technology.Id)
            {
                return BadRequest();
            }

            db.Entry(technology).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TechnologyExists(id))
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

        // POST: api/Technologies
        [Authorize]
        [ResponseType(typeof(Technology))]
        public async Task<IHttpActionResult> PostTechnology(Technology technology)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Technologies.Add(technology);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = technology.Id }, technology);
        }

        // DELETE: api/Technologies/5
        [Authorize(Roles="Administrator")]
        [ResponseType(typeof(Technology))]
        public async Task<IHttpActionResult> DeleteTechnology(int id)
        {
            Technology technology = await db.Technologies.FindAsync(id);
            if (technology == null)
            {
                return NotFound();
            }

            db.Technologies.Remove(technology);
            await db.SaveChangesAsync();

            return Ok(technology);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TechnologyExists(int id)
        {
            return db.Technologies.Count(e => e.Id == id) > 0;
        }
    }
}