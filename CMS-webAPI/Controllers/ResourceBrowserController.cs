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
using System.Web;
using System.IO;
using System.Net.Http.Headers;

namespace CMS_webAPI.Controllers
{
    public class ResourceBrowserController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();

        private int thumbnailWidth = 100;
        private int thumbnailHeight = 100;

        private int MAX_FILE_SIZE = 1024 * 1024 * 1; //Size = 1 MB  
         
        // GET: api/ResourceBrowser
        public IHttpActionResult Get()
        {
            return BadRequest();
        }

        // GET: api/ResourceBrowser/GetContentResource/5?name="file.ext"
        
        [ResponseType(typeof(ContentResource))]
        public async Task<HttpResponseMessage> GetContentResource(int param1, string name, bool? thumbnail)
        {
            int fileId = param1;
            string fileName = name;
            bool isThumbnail;

            if (thumbnail == null)
            {
                isThumbnail = false;
            }
            else
            {
                isThumbnail = (bool)thumbnail;
            }

            HttpResponseMessage resMsg = Request.CreateResponse(HttpStatusCode.Found);
            try
            {
                ContentResource contentResource = await db.ContentResources.FindAsync(fileId);
                if (contentResource == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "File Not Found");
                }
                if (contentResource.Name.ToLower() != fileName.ToLower())
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "File Not Found");
                }
                if (contentResource.ResourceData.Length <= 0)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "File Not Found");
                }

                var idxOfExt = contentResource.Name.LastIndexOf('.');
                string extension = "";
                if (idxOfExt >= 0)
                {
                    extension = contentResource.Name.Substring(idxOfExt + 1).ToLower();
                }     

                string contentType = "";
                if (extension.Trim() == "")
                {
                    contentType = "application/octet-stream ";
                } else {
                    contentType = "image/" + extension;
                }

                if (isThumbnail == true)
                {
                    resMsg.Content = new ByteArrayContent(contentResource.ResourceThumbnail);
                }
                else
                {
                    resMsg.Content = new ByteArrayContent(contentResource.ResourceData);
                }
                
                resMsg.Content.Headers.ContentType = new MediaTypeHeaderValue(contentType);
            } catch(Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

            return resMsg;
        }

        // GET: api/ResourceBrowser/GetContentResourcesByCategory/5"
        [Authorize(Roles = "Administrators, Authors")]
        [ResponseType(typeof(List<ContentResourceViewModel>))]
        public async Task<IHttpActionResult> GetContentResourcesByCategory(int param1)
        {
            int categoryId = param1;
            //List<ContentResource> contentResources = await db.ContentResources
            //    .Where(r => r.CategoryId == categoryId && r.OwnerId == UserService.getUserByUserName(User.Identity.Name).Id)                
            //    .ToListAsync<ContentResource>();

            Category category = await db.Categories.FindAsync(categoryId);
            if (category == null)
            {
                return NotFound();
            }

            string userId = UserService.getUserByUserName(User.Identity.Name).Id;

            List<ContentResource> contentResources = db.Database
                .SqlQuery<ContentResource>("SELECT ContentResourceId, Name, ResourceData = NULL, ResourceThumbnail, Size, OwnerId, CategoryId, UpdatedDate FROM ContentResources WHERE CategoryId=" + categoryId + " AND OwnerId='" + userId + "'")                
                .ToList<ContentResource>();

            List<ContentResourceViewModel> contentResourceViewModels = new List<ContentResourceViewModel>();
            
            if (contentResources != null)
            {
                foreach (ContentResource contentResource in contentResources) {
                    contentResourceViewModels.Add(new ContentResourceViewModel(contentResource));
                }
            }

            return Ok(contentResourceViewModels);
        }

        // POST: api/ResourceBrowser
        [Authorize(Roles = "Administrators, Authors")]
        public async Task<HttpResponseMessage> PostContentResource(string param1)
        {
            var categoryName = param1;
            Category category = await db.Categories.SingleOrDefaultAsync(c => c.Name == categoryName);

            if (category == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "The Parent Category Not Found: " + categoryName);
            }

            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                // Get the uploaded image from the Files collection  
                var httpPostedFile = HttpContext.Current.Request.Files["file"];
                if (httpPostedFile != null && httpPostedFile.ContentLength > 0)
                {
                    ContentResource contentResource = new ContentResource();
                    try
                    {
                        int length = httpPostedFile.ContentLength;

                        var ext = httpPostedFile.FileName.Substring(httpPostedFile.FileName.LastIndexOf('.'));  
                        var extension = ext.ToLower();
                        if (!ImageHelper.IsImage(httpPostedFile))
                        {
                            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Please Upload image of type .jpg, .jpg, .gif, .png only");
                        }

                        if (length > MAX_FILE_SIZE)
                        {
                            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Please Upload a file upto 1 mb only");
                        }

                        contentResource.ResourceData = ImageHelper.ConvertToByteArray(httpPostedFile);
                        contentResource.ResourceThumbnail = ImageHelper.ConvertToByteArray(httpPostedFile, thumbnailWidth, thumbnailHeight);
                        contentResource.Size = length;
                        contentResource.Name = Path.GetFileName(httpPostedFile.FileName);
                        contentResource.UpdatedDate = DateTime.Now;
                        contentResource.OwnerId = UserService.getUserByUserName(User.Identity.Name).Id;
                        contentResource.CategoryId = category.CategoryId;

                        db.ContentResources.Add(contentResource);
                        await db.SaveChangesAsync();
                        return Request.CreateResponse(HttpStatusCode.Created, "File uploaded successfully");
                        
                        // var fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/UploadedFiles"), httpPostedFile.FileName);
                        // Save the uploaded file to "UploadedFiles" folder  
                        //httpPostedFile.SaveAs(fileSavePath);
                    }
                    catch (Exception ex)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
                    }                    
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NoContent, "No file to upload, Please select a file to upload");
                }
            }

            return Request.CreateErrorResponse(HttpStatusCode.NoContent, "No file to upload, Please select a file to upload");
        }

        // DELETE: api/ResourceBrowser/5
        [Authorize(Roles = "Administrators")]
        [ResponseType(typeof(ContentResource))]
        public async Task<IHttpActionResult> DeleteContentResource(int param1, string name)
        {
            int fileId = param1;
            string fileName = name;
            ContentResource contentResource = await db.ContentResources.FindAsync(fileId);
            if (contentResource == null)
            {
                return NotFound();
            }

            if (contentResource.Name.ToLower() != fileName.ToLower())
            {
                return NotFound();
            }

            db.ContentResources.Remove(contentResource);
            await db.SaveChangesAsync();

            return Ok(contentResource);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContentResourceExists(int id)
        {
            return db.ContentResources.Count(e => e.ContentResourceId == id) > 0;
        }
    }
}