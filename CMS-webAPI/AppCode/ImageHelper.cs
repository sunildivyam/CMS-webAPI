using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using System.IO;

namespace CMS_webAPI.AppCode
{

    public static class ImageHelper
    {
        public static string PUBLISHED_ARTICLE_IMAGES_PATH = "~/publishedarticleimages/";
        public static string AUTHOR_ARTICLE_IMAGES_PATH = "~/articleimages/";
        public static string PUBLISHED_ARTICLE_IMAGES_DEFAULT_FILEPATH = "~/publishedarticleimages/default.jpg";
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
        /// Gets the Image File for published Article
        /// </summary>
        /// <param name="publishedArticleId"></param>
        /// <param name="publishedArticleName"></param>
        /// <returns></returns>
        public static FileStream GetPublishedArticleImage(int publishedArticleId, string publishedArticleName)
        {
            string publishedArticleImageFullPath = IsPublishedArticleImageExist(publishedArticleId, publishedArticleName);

            if (publishedArticleImageFullPath == null)
            {
                return null;
            }

            FileStream fileStream = GetImageFromDisk(publishedArticleImageFullPath);
            return fileStream;
        }

        public static MemoryStream GetPublishedArticleDefaultImage()
        {
            string publishedArticleDefaultImageFullPath = HttpContext.Current.Server.MapPath(PUBLISHED_ARTICLE_IMAGES_DEFAULT_FILEPATH);
            
            if (publishedArticleDefaultImageFullPath == null)
            {
                return null;
            }

            byte[] streamBytes = (byte[])ApiCache.Get(PUBLISHED_ARTICLE_IMAGES_DEFAULT_FILEPATH);
            if (streamBytes == null)
            {
                FileStream fileStream = GetImageFromDisk(publishedArticleDefaultImageFullPath);
            
                using (MemoryStream ms = new MemoryStream())
                {
                    fileStream.CopyTo(ms);
                    streamBytes = ms.ToArray();
                    ApiCache.Add(PUBLISHED_ARTICLE_IMAGES_DEFAULT_FILEPATH, streamBytes);
                }
            }
            
            MemoryStream  fileMem = new MemoryStream(streamBytes);
            return fileMem;
        }

        /// <summary>
        /// Gets the Image File for Author Article
        /// </summary>
        /// <param name="authorArticleId"></param>
        /// <returns></returns>
        public static FileStream GetAuthorArticleImage(int authorArticleId)
        {
            string authorArticleImageFullPath = IsAuthorArticleImageExist(authorArticleId);

            if (authorArticleImageFullPath == null)
            {
                return null;
            }

            FileStream fileStream = GetImageFromDisk(authorArticleImageFullPath);
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
    }
}