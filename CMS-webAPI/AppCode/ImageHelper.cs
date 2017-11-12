using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net;

namespace CMS_webAPI.AppCode
{

    public static class ImageHelper
    {
        public static string PUBLISHED_ARTICLE_IMAGES_PATH = "~/publishedarticleimages/";
        public static string AUTHOR_ARTICLE_IMAGES_PATH = "~/articleimages/";
        public static string QUIZ_IMAGES_PATH = "~/quizimages/";
        public static string CATEGORY_IMAGES_PATH = "~/categoryimages/";

        public static string PUBLISHED_ARTICLE_IMAGES_DEFAULT_FILEPATH = "~/publishedarticleimages/default.jpg";
        public static string AUTHOR_ARTICLE_IMAGES_DEFAULT_FILEPATH = "~/articleimages/default.jpg";
        public static string QUIZ_IMAGES_DEFAULT_FILEPATH = "~/quizimages/default.jpg";
        public static string CATEGORY_IMAGES_DEFAULT_FILEPATH = "~/categoryimages/default.jpg";

        public static int MAX_FILE_SIZE = 1024 * 512; //Size = 512 kb 

        /// <summary>
        /// Checking whether the image needs to be resized
        /// </summary>
        /// <param name="uploadImage"></param>
        /// <param name="height"></param>
        /// <param name="width"></param>
        /// <returns>true or false depending on the size</returns>
        private static bool IsResizeNeeded(Image uploadImage, int width, int height)
        {             
            var originalWidth = uploadImage.Width;
            var originalHeight = uploadImage.Height;
            return (originalHeight != height) || (originalWidth != width);
        }

       
        /// <summary>
        /// Resize the image depending on the size given
        /// </summary>
        /// <param name="uploadImage"></param>
        /// <param name="height"></param>
        /// <param name="width"></param>
        /// <returns></returns>
        private static Image ResizeBySize(Image uploadImage, int width, int height)
        {
            var originalWidth = uploadImage.Width;
            var originalHeight = uploadImage.Height;

            var modifiedHeight = height;
            var modifiedWidth = width;

            var bitmap = new Bitmap(modifiedWidth, modifiedHeight,
                                     PixelFormat.Format32bppPArgb);
            bitmap.SetResolution(uploadImage.HorizontalResolution, uploadImage.VerticalResolution);

            var graphics = Graphics.FromImage(bitmap);
            graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;

            graphics.DrawImage(uploadImage,
                              new Rectangle(0, 0, modifiedWidth, modifiedHeight),
                              new Rectangle(0, 0, originalWidth, originalHeight),
                              GraphicsUnit.Pixel);

            graphics.Dispose();

            return bitmap;
        }

        /// <summary>
        /// Since we need the ImageFormat inorder to convert Image -> MemoryStream
        /// </summary>
        /// <param name="imageType"></param>
        /// <returns>ImageFormat according to the image type(Ex: jpg, jpeg etc.)</returns>
        public static ImageFormat GetImageFormat(string imageType)
        {
            ImageFormat imageFormat;
            switch (imageType)
            {
                case "image/jpg":
                    imageFormat = ImageFormat.Jpeg;
                    break;
                case "image/jpeg":
                    imageFormat = ImageFormat.Jpeg;
                    break;
                case "image/pjpeg":
                    imageFormat = ImageFormat.Jpeg;
                    break;
                case "image/gif":
                    imageFormat = ImageFormat.Gif;
                    break;
                case "image/png":
                    imageFormat = ImageFormat.Png;
                    break;
                case "image/x-png":
                    imageFormat = ImageFormat.Png;
                    break;
                default:
                    imageFormat = null;
                    break;                    
            }

            return imageFormat;
        }

        public static string GetImageTypeFromExtension(string extension) {
            if (extension != null && extension != "")
            {
                return "image/" + extension.ToLower();
            }
            return "image/jpg";
        }

        /// <summary>
        /// Convert files to byte array(Special function added for images which needs to be resized)
        /// </summary>
        /// <param name="fileUpLoad"></param>
        /// <returns>byte array of the image file</returns>
        public static byte[] ConvertToByteArray(HttpPostedFile fileUpLoad)
        {   
            return ByteArrayConvertion(fileUpLoad);
        }

        /// <summary>
        /// Convert files to byte array(Special function added for images which needs to be resized)
        /// </summary>
        /// <param name="fileUpLoad"></param>
        /// <returns>byte array of the image file</returns>
        public static byte[] ConvertToByteArray(HttpPostedFile fileUpLoad, int width, int height)
        {
            byte[] byteArray;

            if (IsImage(fileUpLoad))
            {
                //converting to a bitmap
                var uploadImage = new Bitmap(fileUpLoad.InputStream);

                //checking whether resize is needed
                if (IsResizeNeeded(uploadImage, width, height))
                {
                    //resizing the image
                    var resizedImage = ResizeBySize(uploadImage, width, height);
                    //getting the image format(not the type)
                    var resizedImageFormat = GetImageFormat(fileUpLoad.ContentType);

                    using (resizedImage)
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            //loading it to the memory stream
                            if (resizedImageFormat != null)
                            {
                                resizedImage.Save(memoryStream, resizedImageFormat);
                            }
                            memoryStream.Position = 0;
                            byteArray = memoryStream.ToArray();
                        }
                    }
                }
                else
                {
                    byteArray = ByteArrayConvertion(fileUpLoad);
                }
            }
            // for non-image files
            else
            {
                byteArray = ByteArrayConvertion(fileUpLoad);
            }

            return byteArray;
        }

        /// <summary>
        /// Default byte array creation
        /// </summary>
        /// <param name="fileUpload"></param>
        /// <returns>byte array</returns>
        private static byte[] ByteArrayConvertion(HttpPostedFile fileUpload)
        {
            byte[] byteArray;
           
            var memoryStream = new MemoryStream();
            fileUpload.InputStream.CopyTo(memoryStream);
            byteArray = memoryStream.ToArray();               
            
            return byteArray;
        }

        /// <summary>
        /// Checking the file is an image....
        /// </summary>
        /// <param name="fileUpload"></param>
        /// <returns>True if the file is an image</returns>
       
        public static bool IsImage(HttpPostedFile fileUpload)
        {
            var formats = new string[] { ".jpg", ".png", ".gif", ".jpeg" }; // add more if u like...
            if (fileUpload.ContentType.Contains("image") && formats.Any(item => fileUpload.FileName.EndsWith(item, StringComparison.OrdinalIgnoreCase)))
            {
                return true;
            }
            return false;
        }


        // ********* Static Image Files Handling Methods
        
        /// <summary>
        /// Reads Image from Disk, Article Image
        /// </summary>
        /// <param name="imageFullUrl"></param>
        /// <returns></returns>
        public static FileStream GetImageFromDisk(string imageFullUrl)
        {
            FileStream fileStream = File.Open(imageFullUrl, FileMode.Open, FileAccess.Read, FileShare.Read);
            return fileStream;            
        }

   
        /// <summary>
        /// Gets Published ArticleImage Name, excluding extension
        /// </summary>
        /// <param name="publishedArticleId"></param>
        /// <param name="publishedArticleName"></param>
        /// <returns></returns>
        public static string GetPublishedArticleImageName(int publishedArticleId, string publishedArticleName)
        {
            return publishedArticleId + "-" + publishedArticleName;
        }

        /// <summary>
        /// Gets Published ArticleImage Name, excluding extension
        /// </summary>
        /// <param name="authorArticleId"></param>
        /// <returns></returns>
        public static string GetAuthorArticleImageName(int authorArticleId)
        {
            return authorArticleId.ToString();
        }


        /// <summary>
        /// Returns full path if Image exists, else returns null
        /// </summary>
        /// <param name="publishedArticleId"></param>
        /// <param name="publishedArticleName"></param>
        /// <returns></returns>
        public static string IsPublishedArticleImageExist(int publishedArticleId, string publishedArticleName)
        {
            string publishedArticleImageFullPath = null;
            string[] foundFiles = Directory.GetFiles(HttpContext.Current.Server.MapPath(PUBLISHED_ARTICLE_IMAGES_PATH), GetPublishedArticleImageName(publishedArticleId, publishedArticleName) + ".*");

            if (foundFiles != null && foundFiles.Length > 0)
            {
                publishedArticleImageFullPath = foundFiles[0];
            }
            return publishedArticleImageFullPath;
        }

        /// <summary>
        /// Returns full path if Image exists, else returns null
        /// </summary>
        /// <param name="authorArticleId"></param>
        /// <returns></returns>
        public static string IsAuthorArticleImageExist(int authorArticleId)
        {
            string authorArticleImageFullPath = null;
            string[] foundFiles = Directory.GetFiles(HttpContext.Current.Server.MapPath(AUTHOR_ARTICLE_IMAGES_PATH), GetAuthorArticleImageName(authorArticleId) + ".*");

            if (foundFiles != null && foundFiles.Length > 0)
            {
                authorArticleImageFullPath = foundFiles[0];
            }
            return authorArticleImageFullPath;
        }

        /// <summary>
        /// Generates Full Path for new Published Article Image, excluding Extension name
        /// </summary>
        /// <param name="publishedArticleId"></param>
        /// <param name="publishedArticleName"></param>
        /// <returns></returns>
        public static string GenerateFullPublishedArticleImagePathWithoutExtension(int publishedArticleId, string publishedArticleName)
        {
            return Path.Combine(
                 HttpContext.Current.Server.MapPath(PUBLISHED_ARTICLE_IMAGES_PATH),
                 GetPublishedArticleImageName(publishedArticleId, publishedArticleName)
            );                
        }

        /// <summary>
        ///  Generates Full Path for new Author Article Image, excluding Extension name
        /// </summary>
        /// <param name="authorArticleId"></param>
        /// <returns></returns>
        public static string GenerateFullAuthorArticleImagePathWithoutExtension(int authorArticleId)
        {
            return Path.Combine(
                 HttpContext.Current.Server.MapPath(AUTHOR_ARTICLE_IMAGES_PATH),
                 GetAuthorArticleImageName(authorArticleId)
            );
        }

        /// <summary>
        /// Deletes all Published Article Images for an Article Id (means article Image with multiple extensions, if exists)
        /// This enables to Save any type of image(jpg, png etc) but one at a time for a single article
        /// </summary>
        /// <param name="publishedArticleId"></param>
        /// <param name="publishedArticleName"></param>
        /// <returns></returns>
        public static bool DeletePublishedArticleImages(int publishedArticleId, string publishedArticleName)
        {
            try
            {
                string[] foundFiles = Directory.GetFiles(HttpContext.Current.Server.MapPath(PUBLISHED_ARTICLE_IMAGES_PATH), publishedArticleId + "-*.*");

                if (foundFiles != null && foundFiles.Length > 0)
                {
                    foreach (string file in foundFiles)
                    {
                        File.Delete(file);
                    }
                }
                return true;
            } catch(Exception) {
                return false;
            }
        }

        /// <summary>
        /// Deletes all Author Article Images for an Article Id (means article Image with multiple extensions, if exists)
        /// This enables to Save any type of image(jpg, png etc) but one at a time for a single article
        /// </summary>
        /// <param name="authorArticleId"></param>
        /// <returns></returns>
        public static bool DeleteAuthorArticleImages(int authorArticleId)
        {
            try
            {
                string[] foundFiles = Directory.GetFiles(HttpContext.Current.Server.MapPath(AUTHOR_ARTICLE_IMAGES_PATH), GetAuthorArticleImageName(authorArticleId) + ".*");

                if (foundFiles != null && foundFiles.Length > 0)
                {
                    foreach (string file in foundFiles)
                    {
                        File.Delete(file);
                    }
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static bool PublishAuthorImage(int authorArticleId, int publishedArticleId, string publishedArticleName)
        {
            try
            {
                DeletePublishedArticleImages(publishedArticleId, publishedArticleName);
                string authorArticleImageFullPath = IsAuthorArticleImageExist(authorArticleId);
                string publishedArticleImageFullPath = GenerateFullPublishedArticleImagePathWithoutExtension(publishedArticleId, publishedArticleName) + 
                    "." + authorArticleImageFullPath.Substring(authorArticleImageFullPath.LastIndexOf(".") + 1);

                if (authorArticleImageFullPath != null)
                {
                    File.Copy(authorArticleImageFullPath, publishedArticleImageFullPath);
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static bool AuthorPublishedImage(int authorArticleId, int publishedArticleId)
        {
            try
            {
                string[] foundFiles = Directory.GetFiles(HttpContext.Current.Server.MapPath(PUBLISHED_ARTICLE_IMAGES_PATH), publishedArticleId + "-*.*");
                string publishedArticleImageFullPath = null;

                if (foundFiles != null && foundFiles.Length > 0)
                {
                    publishedArticleImageFullPath = foundFiles[0];
                }

                if (publishedArticleImageFullPath != null)
                {
                    string authorArticleImageFullPath = GenerateFullAuthorArticleImagePathWithoutExtension(authorArticleId) +
                    "." + publishedArticleImageFullPath.Substring(publishedArticleImageFullPath.LastIndexOf(".") + 1);

                    File.Copy(publishedArticleImageFullPath, authorArticleImageFullPath);
                }                
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static bool DuplicateAuthorImageFromPrevious(int authorArticleId, int previousAuthorContentId)
        {
            try
            {
                string[] foundFiles = Directory.GetFiles(HttpContext.Current.Server.MapPath(AUTHOR_ARTICLE_IMAGES_PATH), previousAuthorContentId + ".*");
                string previousArticleImageFullPath = null;

                if (foundFiles != null && foundFiles.Length > 0)
                {
                    previousArticleImageFullPath = foundFiles[0];
                }

                if (previousArticleImageFullPath != null)
                {
                    string authorArticleImageFullPath = GenerateFullAuthorArticleImagePathWithoutExtension(authorArticleId) +
                    "." + previousArticleImageFullPath.Substring(previousArticleImageFullPath.LastIndexOf(".") + 1);

                    File.Copy(previousArticleImageFullPath, authorArticleImageFullPath);
                }                
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }


        ////////////// Generic GetImageResponseFromDisk()

        public static string GetImageFolderPath(string contentType, bool isDefaultImageFolder = false)
        {
            switch (contentType)
            {
                case "quiz":
                    return isDefaultImageFolder == false? QUIZ_IMAGES_PATH : QUIZ_IMAGES_DEFAULT_FILEPATH;
                case "question":
                    return isDefaultImageFolder == false? QUIZ_IMAGES_PATH : QUIZ_IMAGES_DEFAULT_FILEPATH;
                case "authorcontent":
                    return isDefaultImageFolder == false ? AUTHOR_ARTICLE_IMAGES_PATH : AUTHOR_ARTICLE_IMAGES_DEFAULT_FILEPATH;
                case "content":   // Content (Article)
                    return isDefaultImageFolder == false ? PUBLISHED_ARTICLE_IMAGES_PATH : PUBLISHED_ARTICLE_IMAGES_DEFAULT_FILEPATH;
                case "category":   // CATEGORY
                    return isDefaultImageFolder == false ? CATEGORY_IMAGES_PATH : CATEGORY_IMAGES_DEFAULT_FILEPATH;
            }
            return isDefaultImageFolder == false ? PUBLISHED_ARTICLE_IMAGES_PATH : PUBLISHED_ARTICLE_IMAGES_DEFAULT_FILEPATH;
        } 

        public static HttpResponseMessage GetImageResponseFromDisk(HttpRequestMessage Request, int id, string name, string contentType) 
        {   
            //1) Create a Wildcard Search Path based on contentType and id or Name
            string fileNameSearch = "";
            string fullFilePathSearch = HttpContext.Current.Server.MapPath(GetImageFolderPath(contentType));
            string imageFullPath;
            bool isDefaultImage = false;
            HttpResponseMessage response;
            try
            {
                if (name != null)
                {
                    fileNameSearch = id + "-" + name + ".*";
                }
                else
                {
                    fileNameSearch = id + ".*";
                    if (contentType == "quiz")
                    {
                        fileNameSearch = id + "-*.*";
                    }
                }

                // 2) Search with wildcards and Check if Image Exists and Gets its full path and filename with extension
                string[] foundFiles = Directory.GetFiles(fullFilePathSearch, fileNameSearch);
                if (foundFiles != null && foundFiles.Length > 0)
                {
                    imageFullPath = foundFiles[0];
                }
                else
                {
                    isDefaultImage = true;
                    imageFullPath = HttpContext.Current.Server.MapPath(GetImageFolderPath(contentType, true));
                }

                // Reads the Image from DISK, Original One or the DEFAULT IMAGE
                if (isDefaultImage == true)
                {
                    // Reads the Dfeualt Image from CACHE, if EXISTS else reads from DISK and set CACHE
                    string CACHE_KEY = GetImageFolderPath(contentType, true);
                    byte[] streamBytes = (byte[])ApiCache.Get(CACHE_KEY);
                    if (streamBytes == null)
                    {
                        FileStream fileStream = GetImageFromDisk(imageFullPath);

                        using (MemoryStream ms = new MemoryStream())
                        {
                            fileStream.CopyTo(ms);
                            streamBytes = ms.ToArray();
                            ApiCache.Add(CACHE_KEY, streamBytes);
                        }
                    }
                    MemoryStream fileMem = new MemoryStream(streamBytes);
                    response = new HttpResponseMessage { Content = new StreamContent(fileMem) };
                    response.Content.Headers.ContentLength = fileMem.Length;
                }
                else
                {
                    // Reads Original Image from DISK and should not be cached.
                    FileStream fileStream = GetImageFromDisk(imageFullPath);
                    response = new HttpResponseMessage { Content = new StreamContent(fileStream) };
                    response.Content.Headers.ContentLength = fileStream.Length;
                }

                response.Content.Headers.ContentType = new MediaTypeHeaderValue(GetImageTypeFromExtension("jpg"));
            }
            catch (Exception ex)
            {
                response = Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

            return response;
        }

        public static HttpResponseMessage UploadImageRequestToDisk(HttpRequestMessage Request, int id, string name, string contentType)
        {
            string fileName;
            string extensionName;
            string fileNameSearch;
            string fullImageFilePath;
            int fileContentLength;
            HttpPostedFile httpPostedFile;
            HttpResponseMessage response;
            
            // 1) Get the File with Contents from Request Object
            httpPostedFile = HttpContext.Current.Request.Files["file"];
            // 1.1) if No File to Upload create Response Error
            if (httpPostedFile == null || (httpPostedFile != null && httpPostedFile.ContentLength <= 0))
            {
                response = Request.CreateErrorResponse(HttpStatusCode.NoContent, "No file to upload, Please select a file to upload");
                return response;
            }

            extensionName = httpPostedFile.FileName.Substring(httpPostedFile.FileName.LastIndexOf('.') + 1).ToLower();
            fileContentLength = httpPostedFile.ContentLength;


            // 2) create Full target imageFile Path using id, name and contentType
            if (name != null)
            {
                fileName =  id + "-" + name + "." + extensionName;
                fileNameSearch = id + "-" + name + ".*";

                if (contentType == "quiz")
                {
                    fileNameSearch = id + "-*.*";
                }
            }
            else
            {
                fileName =  id +  "." + extensionName;
                fileNameSearch = id + ".*";                
            }

            fullImageFilePath = HttpContext.Current.Server.MapPath(GetImageFolderPath(contentType) + fileName);            
            
            
            // 3) Validate Image for Its TYPE, SIZE or any other rules
            if (!ImageHelper.IsImage(httpPostedFile))
            {
                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Please Upload image of type .jpg, .jpg, .gif, .png only");
                return response;
            }

            if (fileContentLength > MAX_FILE_SIZE)
            {
                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Please Upload a file upto " + (MAX_FILE_SIZE / 1024) + "kb only");                
                return response;
            }

            try
            {
                // 4) Delete Image File if already Exists for this ContentType. This ensures, there is only one Image exist for Content/Quiz.
                string[] foundFiles = Directory.GetFiles(HttpContext.Current.Server.MapPath(GetImageFolderPath(contentType)), fileNameSearch);
                if (foundFiles != null && foundFiles.Length > 0)
                {
                    foreach (string file in foundFiles)
                    {
                        File.Delete(file);
                    }
                }

                // 5) Save the Image File to target Folder
                httpPostedFile.SaveAs(fullImageFilePath);
                response = Request.CreateResponse(HttpStatusCode.OK, "Image Successfully Uploaded");
            }
            catch (Exception ex)
            {
                response = Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
                return response;
            }

            return response;
        }

        public static bool RenameImageForContentType(int id, string name, string contentType)
        {
            string fileName;
            string extensionName = "";
            string fileNameSearch;
            string fullImageFilePath;
           
            // create Full target imageFile Path using id, name and contentType
            fileNameSearch = id + "-*.*";           
            fileName =  id + "-" + name;
           
            fullImageFilePath = Path.Combine(HttpContext.Current.Server.MapPath(GetImageFolderPath(contentType)),fileName);            
            
            try
            {
                // Rename Image File if already Exists for this ContentType. This ensures, there is only one Image exist for Content/Quiz/Category.
                string[] foundFiles = Directory.GetFiles(HttpContext.Current.Server.MapPath(GetImageFolderPath(contentType)), fileNameSearch);
                if (foundFiles != null && foundFiles.Length > 0)
                {
                    string oldFilePath = foundFiles[0];
                    extensionName = Path.GetExtension(oldFilePath);
                    fullImageFilePath = fullImageFilePath + extensionName;
                    if (fullImageFilePath != oldFilePath)
                    {
                        File.Move(oldFilePath, fullImageFilePath);
                    }                    
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}