using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMS_webAPI.Models
{
    public class MetaInfoModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Keywords { get; set; }
        public string PageImage { get; set; }
        public string PageImageAlt { get; set; }
        public string CanonicalUrl { get; set; }
        public string[] Tags { get; set; }
        public string Type { get; set; }
        public string PublishedDate { get; set; }
        public string UpdatedDate { get; set; }
        public string AuthorName { get; set; }
        public string TwitterAuthorHandle { get; set; }
        public string TwitterSiteHandle { get; set; }
    }
}
