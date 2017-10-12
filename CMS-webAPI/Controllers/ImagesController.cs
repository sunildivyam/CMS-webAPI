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

            // Gets the Published Article Content image or the DEFAULT Image
            return ImageHelper.GetImageResponseFromDisk(Request, id, name, "content");  // ContentType could be "quiz", "question", "content", or "authorcontent"
        }

        // For Author Article Image
        // Route: api/images/authorarticleimage/5
        public HttpResponseMessage GetAuthorArticleImage(int param1)
        {
            int id = param1;
            string name = null;

            // Gets the AuthorContent image or the DEFAULT Image
            return ImageHelper.GetImageResponseFromDisk(Request, id, name, "authorcontent");  // ContentType could be "quiz", "question", "content", or "authorcontent"
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

        // For Published Quiz Image
        // Route: api/images/quizimage/5/installing-angular-js
        public HttpResponseMessage GetQuizImage(int param1, string param2)
        {   
            int id = param1;
            string name = param2;

            // Gets the QUIZ image or the DEFAULT Quiz Image
            return ImageHelper.GetImageResponseFromDisk(Request, id, name, "quiz");  // ContentType could be "quiz", "question", "content", or "authorcontent"
        }

        // For Published Article Image
        // Route: api/images/articleimage/5/installing-angular-js
        public HttpResponseMessage GetQuizImage(int param1)
        {
            int id = param1;
            string name = null;

            // Gets the QUIZ image or the DEFAULT Quiz Image
            return ImageHelper.GetImageResponseFromDisk(Request, id, name, "quiz");  // ContentType could be "quiz", "question", "content", or "authorcontent"
        }
    }
}
