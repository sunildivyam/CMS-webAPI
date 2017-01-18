using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using System.IO;

namespace CMS_webAPI.Models
{

    public static class ImageHelper
    {
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

        public static string getImageTypeFromExtension(string extension) {
            return "image/extension";
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
    }
}