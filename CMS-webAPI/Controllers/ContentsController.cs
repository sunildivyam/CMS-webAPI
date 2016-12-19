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

        // GET: api/Contents
        public IQueryable<Content> GetContents()
        {
            return db.Contents;
        }

        // Gets all Published And Live Contents for a Category Id and a Name
        // GET: api/Contents/GetContentById/5/content-name
        [ResponseType(typeof(Content))]
        public async Task<IHttpActionResult> GetContentById(int param1, string param2)
        {
            var Id = param1;
            var name = param2;

            Content content = await db.Contents.FindAsync(Id);
            if (content == null || !content.IsLive || content.Name != name)
            {
                return NotFound();
            }

            // Update and increment the VisitCount By 1
                // Code goes here

            return Ok(content);
        }

        // Gets all Published And Live Contents for a Category Name
        // GET: api/Contents/GetContentsByCategoryName/category-name
        [ResponseType(typeof(List<AuthorContent>))]
        public async Task<IHttpActionResult> GetContentsByCategoryName(string param1)
        {
            var name = param1;
            List<AuthorContent> contents = await db.AuthorContents.Where(c => c.Category.Name == name).ToListAsync();
            if (contents == null)
            {
                return NotFound();
            }

            return Ok(contents);
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