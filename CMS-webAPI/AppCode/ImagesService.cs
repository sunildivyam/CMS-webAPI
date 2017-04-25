using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace CMS_webAPI.AppCode
{
    public class ImagesService
    {       
        public static FileStream GetImageFromDisk(string imageFullUrl)
        {
            FileStream fileStream = File.Open(imageFullUrl, FileMode.Open, FileAccess.Read);
            return fileStream;            
        }      
    }
}