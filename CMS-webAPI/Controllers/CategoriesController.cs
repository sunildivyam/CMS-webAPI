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
    public class CategoriesController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();

        // GET: api/Categories
        public IQueryable<Category> GetCategories()
        {
            return db.Categories;
        }

        // GET: api/Categories/5
        [ResponseType(typeof(Category))]
        public async Task<IHttpActionResult> GetCategory(int id)
        {
            Category Category = await db.Categories.FindAsync(id);
            if (Category == null)
            {
                return NotFound();
            }

            return Ok(Category);
        }

        // PUT: api/Categories/5
        [Authorize]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCategory(int id, Category Category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != Category.Id)
            {
                return BadRequest();
            }

            db.Entry(Category).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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

        // POST: api/Categories
        [Authorize]
        [ResponseType(typeof(Category))]
        public async Task<IHttpActionResult> PostCategory(Category Category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Categories.Add(Category);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = Category.Id }, Category);
        }

        // DELETE: api/Categories/5
        [Authorize(Roles="Administrator")]
        [ResponseType(typeof(Category))]
        public async Task<IHttpActionResult> DeleteCategory(int id)
        {
            Category Category = await db.Categories.FindAsync(id);
            if (Category == null)
            {
                return NotFound();
            }

            db.Categories.Remove(Category);
            await db.SaveChangesAsync();

            return Ok(Category);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoryExists(int id)
        {
            return db.Categories.Count(e => e.Id == id) > 0;
        }
    }
}