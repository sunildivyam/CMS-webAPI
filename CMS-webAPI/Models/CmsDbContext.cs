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
        public virtual DbSet<Articles> Articles { get; set; }
        public virtual DbSet<ArticleUpdates> ArticleUpdates { get; set; }
        public virtual DbSet<AuthorActions> AuthorActions { get; set; }
        public virtual DbSet<Tags> Tags { get; set; }
    }
}