﻿using System;
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
using CMS_webAPI.Controllers;

namespace CMS_webAPI.Controllers
{
    public class AuthorContentsController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();
       
        // GET: api/AuthorContents
        public IQueryable<AuthorContent> GetAuthorContents()
        {
            return db.AuthorContents;
        }

        // GET: api/AuthorContents/5
        [ResponseType(typeof(AuthorContent))]
        public async Task<IHttpActionResult> GetAuthorContent(int id)
        {
            AuthorContent authorContent = await db.AuthorContents.FindAsync(id);
            if (authorContent == null)
            {
                return NotFound();
            }
            
            var authorContentView = new AuthorContentViewModel(authorContent);

            return Ok(authorContentView);
        }

        // PUT: api/AuthorContents/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutAuthorContent(int id, AuthorContent authorContent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != authorContent.AuthorContentId)
            {
                return BadRequest();
            }

            db.Entry(authorContent).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuthorContentExists(id))
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

        // POST: api/AuthorContents
        [ResponseType(typeof(AuthorContent))]
        public async Task<IHttpActionResult> PostAuthorContent(AuthorContentViewModel authorContentView)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ApplicationUser user = await BaseApiController.UserManager.FindByNameAsync(User.Identity.Name);
            AuthorContent authorContent = authorContentView.ToAPIModel();
            var authorContentTags = new List<AuthorContentTag>();            

            for (var i = 0; i < authorContentView.Tags.Count; i++ ) 
            {
                var authorContentTag = new AuthorContentTag();
                authorContentTag.AuthorContentId = authorContentView.AuthorContentId;
                authorContentTag.TagId = authorContentView.Tags[i].TagId;
                authorContentTags.Add(authorContentTag);
            }

            authorContent.AuthorId = user.Id;
            authorContent.UpdatedDate = DateTime.Today;            

            db.AuthorContents.Add(authorContent);
            db.AuthorContentTags.AddRange(authorContentTags);

            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = authorContent.AuthorContentId }, authorContent);
        }

        // DELETE: api/AuthorContents/5
        [ResponseType(typeof(AuthorContent))]
        public async Task<IHttpActionResult> DeleteAuthorContent(int id)
        {
            AuthorContent authorContent = await db.AuthorContents.FindAsync(id);
            if (authorContent == null)
            {
                return NotFound();
            }

            db.AuthorContents.Remove(authorContent);
            await db.SaveChangesAsync();

            return Ok(authorContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AuthorContentExists(int id)
        {
            return db.AuthorContents.Count(e => e.AuthorContentId == id) > 0;
        }
    }
}