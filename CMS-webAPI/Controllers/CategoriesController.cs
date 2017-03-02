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
using CMS_webAPI.AppCode;

namespace CMS_webAPI.Controllers
{
    public class CategoriesController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();

        public IHttpActionResult Get()
        {
            return BadRequest();
        }
        // GET: api/Categories        
        public IQueryable<Category> GetCategories()
        {
            string cacheKey = "api/Categories/GetCategories";
            IQueryable<Category> categoriesFromCache = (IQueryable < Category >)ApiCache.Get(cacheKey);

            if (categoriesFromCache != null)
            {
                IQueryable<Category> categories = db.Categories;
                ApiCache.Add(cacheKey, categories);
                return categories;
            }

            return categoriesFromCache;
        }

        // GET: api/Categories/5
        
        [ResponseType(typeof(Category))]
        public async Task<IHttpActionResult> GetCategory(int param1)
        {
            var id = param1;

            string cacheKey = "api/Categories/GetCategory/" + id;
            Category categoryFromCache = (Category)ApiCache.Get(cacheKey);

            if (categoryFromCache != null)
            {
                return Ok(categoryFromCache);
            }

            Category category = await db.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            ApiCache.Add(cacheKey, category);
            return Ok(category);
        }

        // GET: api/categories/GetCategoryByName/category-name
        
        [ResponseType(typeof(Category))]
        public async Task<IHttpActionResult> GetCategoryByName(string param1)
        {
            string categoryName = param1;

            string cacheKey = "api/Categories/GetCategoryByName/" + categoryName;
            Category categoryFromCache = (Category)ApiCache.Get(cacheKey);

            if (categoryFromCache != null)
            {
                return Ok(categoryFromCache);
            }

            Category category = await db.Categories.SingleOrDefaultAsync(c => c.Name == categoryName);

            if (category == null)
            {
                return NotFound();
            }

            ApiCache.Add(cacheKey, category);
            return Ok(category);
        }

        // PUT: api/Categories/5
        [HttpPost]
        [Authorize(Roles = "Administrators")]
        [ResponseType(typeof(Category))]
        public async Task<IHttpActionResult> PutCategory(int param1, Category category)
        {
            var id = param1;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != category.CategoryId)
            {
                return BadRequest();
            }

            db.Entry(category).State = EntityState.Modified;

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

            // return StatusCode(HttpStatusCode.NoContent);
            return Ok(category);
        }

        // POST: api/Categories
        [Authorize(Roles = "Administrators")]
        [ResponseType(typeof(Category))]
        public async Task<IHttpActionResult> PostCategory(Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.Categories.Add(category);
                await db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex); 
            }

            return Ok(category);
        }

        // DELETE: api/Categories/5
        [Authorize(Roles = "Administrators")]
        [ResponseType(typeof(Category))]
        public async Task<IHttpActionResult> DeleteCategory(int param1)
        {
            var id = param1;
            Category category = await db.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            db.Categories.Remove(category);
            await db.SaveChangesAsync();

            return Ok(category);
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
            return db.Categories.Count(e => e.CategoryId == id) > 0;
        }
    }
}