using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.Models
{
    public class Article
    {
        [Key]
        public int Id { get; set; }        

        [Required]
        [StringLength(500)]
        public string Title { get; set; }

        [Required]
        public string ShortDescription { get; set; }

        [Required]
        public string Description { get; set; }
        
        [Required]
        public bool IsLive { get; set; }

        [Required]
        public string Author { get; set; }

        [Required]
        public DateTime PublishedDate { get; set; }

        public int Visits { get; set; }

        public virtual ICollection<Author_Article> Author_Articles { get; set; }
        public virtual ICollection<ArticleTag> ArticleTags { get; set; }
        public virtual ICollection<ArticleTechnology> ArticleTechnologies { get; set; }
    }
}
