﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace CMS_webAPI.Models
{
    public class Author_ArticleTechnology
    {
        public Author_ArticleTechnology()
        {

        }

        [Key]
        public int Id { get; set; }

        [ForeignKey("Author_Article")]
        public int ArticleId { get; set; }

        [ForeignKey("Technology")]
        public int TagId { get; set; }

        public virtual Author_Article Author_Article { get; set; }
        public virtual Technology Technology { get; set; }
    }
}