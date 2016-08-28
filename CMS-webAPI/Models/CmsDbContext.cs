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
        public virtual DbSet<Technology> Technologies { get; set; }
        public virtual DbSet<Article> Articles { get; set; }
        public virtual DbSet<ArticleTag> ArticleTags { get; set; }
        public virtual DbSet<ArticleTechnology> ArticleTechnologies { get; set; }

        public virtual DbSet<Author_Article> Author_Articles { get; set; }
        public virtual DbSet<Author_ArticleTag> Author_ArticleTags { get; set; }
        public virtual DbSet<Author_ArticleTechnology> Author_ArticleTechnologies { get; set; }
    }
}