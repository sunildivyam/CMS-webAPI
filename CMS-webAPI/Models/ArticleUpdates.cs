using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.Models
{
    public class ArticleUpdates
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Association("CONSTRAINT_REF_ArticleUpdates_Articles_ArticleId", "ArticleId", "Id")]
        public int ArticleId { get; set; }

        [Required]
        public DateTime ActionTimeStamp { get; set; }

        [Required]
        [StringLength(50)]
        [Association("CONSTRAINT_REF_ArticleUpdates_AuthorActions_AuthorAction", "AuthorAction", "Id")]
        public string AuthorAction { get; set; }
    }

}