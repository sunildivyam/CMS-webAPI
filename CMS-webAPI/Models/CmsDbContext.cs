﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace CMS_webAPI.Models
{
    public class CmsDbContext: DbContext
    {
        public CmsDbContext()
            //: base("CmsConnection")
            : base("DefaultConnection")
        {
        }

        public virtual DbSet<Tag> Tags { get; set; }
        public virtual DbSet<Category> Categories { get; set; }

        public virtual DbSet<Content> Contents { get; set; }
        public virtual DbSet<ContentTag> ContentTags { get; set; }

        public virtual DbSet<AuthorContent> AuthorContents { get; set; }
        public virtual DbSet<AuthorContentTag> AuthorContentTags { get; set; }
        public virtual DbSet<ContentResource> ContentResources { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }

        public virtual DbSet<Question> Questions { get; set; }
        public virtual DbSet<Quiz> Quizs { get; set; }
        public virtual DbSet<QuizComment> QuizComments { get; set; }
        public virtual DbSet<QuestionComment> QuestionComments { get; set; }
    }
}