using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using CMS_webAPI.AppCode;
using CMS_webAPI.Models;
using System.Web;

namespace CMS_webAPI.Controllers
{
    public class ImagesController : ApiController
    {        
        private const string DEFAULT_ARTICLE_IMAGE_FILENAME = "article-image.jpg";

        // This is Default Route and should return a BadRequest.
        // GET: api/Images
        public IHttpActionResult Get()
        {
            return BadRequest();
        }

        // For Published Article Image
        // Route: api/images/articleimage/5/installing-angular-js
        public HttpResponseMessage GetArticleImage(int param1, string param2)
        {   
            int id = param1;
            string name = param2;
            FileStream fileStream;
            HttpResponseMessage response;

            try
            {
                string articleImageFullPath = ImageHelper.IsPublishedArticleImageExist(id, name);

                if (articleImageFullPath != null)
                {
                    fileStream = ImageHelper.GetPublishedArticleImage(id, name);                    
                }
                else
                {
                    fileStream = ImageHelper.GetPublishedArticleDefaultImage();                    
                    //response = new HttpResponseMessage(HttpStatusCode.NotFound);
                    //return response;
                }
                response = new HttpResponseMessage { Content = new StreamContent(fileStream) };
                response.Content.Headers.ContentType = new MediaTypeHeaderValue(ImageHelper.GetImageTypeFromExtension("jpg"));
                response.Content.Headers.ContentLength = fileStream.Length;
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);                
            }

            return response;
        }

        // For Author Article Image
        // Route: api/images/authorarticleimage/5
        public HttpResponseMessage GetAuthorArticleImage(int param1)
        {
            int id = param1;
            FileStream fileStream;
            HttpResponseMessage response;

            try
            {
                string articleImageFullPath = ImageHelper.IsAuthorArticleImageExist(id);

                if (articleImageFullPath != null)
                {
                    fileStream = ImageHelper.GetAuthorArticleImage(id);
                }
                else
                {
                    response = new HttpResponseMessage(HttpStatusCode.NotFound);
                    return response;
                }

                response = new HttpResponseMessage { Content = new StreamContent(fileStream) };
                response.Content.Headers.ContentType = new MediaTypeHeaderValue(ImageHelper.GetImageTypeFromExtension(articleImageFullPath.Substring(articleImageFullPath.LastIndexOf(".") + 1)));
                response.Content.Headers.ContentLength = fileStream.Length;
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

            return response;
        }

        public HttpResponseMessage GetUserImage(string param1)
        {
            string userName = param1;
            HttpResponseMessage response;
                       
            try
            {
                byte[] photoBytes = UserService.GetPhoto(userName);
                if (photoBytes == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound,"User Image Not Found");
                }

                response = new HttpResponseMessage { Content = new ByteArrayContent(photoBytes) };
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpg");
                response.Content.Headers.ContentLength = photoBytes.Length;
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

            return response;
        }
    }
}
