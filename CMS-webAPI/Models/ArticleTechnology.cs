using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace CMS_webAPI.Models
{
    public class ArticleTechnology
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Article")]
        public int ArticleId { get; set; }

        [ForeignKey("Technology")]
        public int TagId { get; set; }

        public virtual Article Article { get; set; }
        public virtual Technology Technology { get; set; }
    }
}