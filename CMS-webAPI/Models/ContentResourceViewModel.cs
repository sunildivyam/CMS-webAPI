using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.Models
{
    public class ContentResourceViewModel
    {
        [Key]
        public int ContentResourceId { get; set; }

        public string Name { get; set; }

        public byte[] ResourceData { get; set; }

        public byte[] ResourceThumbnail { get; set; }

        public UserInfoViewModel Owner { get; set; }

        public DateTime UpdatedDate { get; set; }

        public Category Category { get; set; }

        public int Size {get;set;}

        public string Extension { get; set; }

        // DB Context for CMS
        CmsDbContext _db = new CmsDbContext();

        public ContentResourceViewModel()
        {

        }

        public ContentResourceViewModel(ContentResource contentResource)
        {
            if (contentResource != null)
            {
                this.ContentResourceId = contentResource.ContentResourceId;
                this.Name = contentResource.Name;
                this.ResourceData = contentResource.ResourceData;
                this.ResourceThumbnail = contentResource.ResourceThumbnail;
                this.UpdatedDate = contentResource.UpdatedDate;
                this.Category = _db.Categories.Find(contentResource.CategoryId);
                this.Owner = UserService.GetUserViewModelById(contentResource.OwnerId);
                this.Size = contentResource.Size;
                //if (contentResource.ResourceData != null)
                //{
                //    this.Size = contentResource.ResourceData.Length;
                //}
                //else if (contentResource.ResourceThumbnail!= null)
                //{
                //    this.Size = contentResource.ResourceThumbnail.Length;
                //}
                //else
                //{
                //    this.Size = 0;
                //}

                var idxOfExt = contentResource.Name.LastIndexOf('.');
                string extension = "";
                if (idxOfExt >= 0)
                {
                    extension = contentResource.Name.Substring(idxOfExt + 1).ToLower();
                }                               

                this.Extension = extension;
            }
        }

        public ContentResource ToDbModel()
        {
            ContentResource contentResource = new ContentResource();
            contentResource.ContentResourceId = this.ContentResourceId;
            contentResource.Name = this.Name;
            contentResource.ResourceData = this.ResourceData;
            contentResource.ResourceThumbnail = this.ResourceThumbnail;
            contentResource.UpdatedDate = this.UpdatedDate;
            contentResource.CategoryId = this.Category.CategoryId;
            contentResource.Size = this.Size;

            ApplicationUser owner = UserService.getUserFromUserViewModel(this.Owner);
            if (owner != null)
            {
                contentResource.OwnerId = owner.Id;
            }
            else
            {
                contentResource.OwnerId = null;

            }
            return contentResource;
        }
    }
}