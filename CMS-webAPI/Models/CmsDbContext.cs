using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace CMS_webAPI.Models
{
    public class CmsDbContext: DbContext
    {
        public CmsDbContext()
            : base("DefaultConnection")
        {
        }

        public virtual DbSet<Tag> Tags { get; set; }
        public virtual DbSet<Category> Categories { get; set; }

        public virtual DbSet<Content> Contents { get; set; }
        public virtual DbSet<ContentTag> ContentTags { get; set; }

        public virtual DbSet<Author_Content> Author_Contents { get; set; }
        public virtual DbSet<Author_ContentTag> Author_ContentTags { get; set; }
    }
}