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

        public HttpResponseMessage GetArticleImage(int id)
        {
            string fileName = string.Format("{0}.jpg", id);
            string fullImageUrl = Path.Combine(HttpContext.Current.Server.MapPath("~/articleimages/"), fileName);
            string DefaultImageFullUrl = Path.Combine(HttpContext.Current.Server.MapPath("~/articleimages/"), DEFAULT_ARTICLE_IMAGE_FILENAME);
            FileStream fileStream;
            HttpResponseMessage response;

            try
            {
                if (File.Exists(fullImageUrl))
                {
                    fileStream = ImagesService.GetImageFromDisk(fullImageUrl);
                }
                else if (File.Exists(DefaultImageFullUrl))
                {
                    fileStream = ImagesService.GetImageFromDisk(DefaultImageFullUrl);
                }
                else
                {
                    response = new HttpResponseMessage(HttpStatusCode.NotFound);
                    return response;
                }

                response = new HttpResponseMessage { Content = new StreamContent(fileStream) };
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpg");
                response.Content.Headers.ContentLength = fileStream.Length;
            } catch (Exception ex) {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);                
            }

            return response;
        }

        public HttpResponseMessage GetUserImage(string userName)
        {                           
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
