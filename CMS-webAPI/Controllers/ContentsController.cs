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

        public IHttpActionResult Get()
        {
            return BadRequest();
        }        

        // Gets all Published And Live Contents for a Category, contnetId and a contentName
        // GET: api/Contents/GetContent/category-name/5/content-name
        [ResponseType(typeof(ContentViewModel))]
        public async Task<IHttpActionResult> GetContent(string param1, int param2, string param3)
        {
            var categoryName = param1;
            var contentId = param2;
            var contentName = param3;

            Content content = await db.Contents.FindAsync(contentId);
            if (content == null || !content.IsLive || content.Name != contentName || content.Category.Name != categoryName)
            {
                return NotFound();
            }

            ContentViewModel contentView = new ContentViewModel(content);

            // Update and increment the VisitCount By 1
                // Code goes here

            return Ok(contentView);
        }

        // Gets all Published And Live Contents for a Category Name
        // GET: api/Contents/GetContentsByCategoryName/category-name
        [ResponseType(typeof(CategoryViewModel))]
        public async Task<IHttpActionResult> GetContentsByCategoryName(string param1,int param2, int param3, string param4, bool param5)
        {
            string categoryName = param1;
            int pageNo = param2;
            int pageSize = param3;
            string sortField = param4;
            bool sortDirAsc = param5;

            if (pageNo < 1 || pageSize < 1)
            {
                return BadRequest();
            }  
            
            Category category = await db.Categories.FirstOrDefaultAsync(c => c.Name == categoryName);
            IEnumerable<Content> contentsEnums = db.Contents.Where(c => c.Category.Name == categoryName)
                .AsEnumerable();
            List<Content> contents = getPagedData(contentsEnums, pageNo, pageSize, sortField, sortDirAsc);                        

            if (contents == null)
            {
                return NotFound();
            }

            CategoryViewModel categoryView = new CategoryViewModel(category, contents, contentsEnums.Count());

            return Ok(categoryView);
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

        private List<Content> getPagedData(IEnumerable<Content> contentsEnums, int pageNo, int pageSize, string sortField, bool sortDirAsc)
        {
            List<Content> contents = new List<Content>();
            int skipSize = ((pageNo - 1) * pageSize);

            if (sortDirAsc == true)
            {
                contents = contentsEnums.OrderBy(c => c.GetType().GetProperty(sortField).GetValue(c, null))
                .Skip(skipSize)
                .Take(pageSize)
                .ToList();
            }
            else
            {
                contents = contentsEnums.OrderByDescending(c => c.GetType().GetProperty(sortField).GetValue(c, null))
                .Skip(skipSize)
                .Take(pageSize)
                .ToList();
            }
            return contents;
        }
    }
}