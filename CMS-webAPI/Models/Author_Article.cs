using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.Models
{
    public class Author_Article
    {
        public Author_Article()
        {

        }

        [Key]
        public int Id { get; set; }

        [ForeignKey("Article")]
        public int ArticleId { get; set; }
        
        [Required]
        [StringLength(500)]
        public string Title { get; set; }

        [Required]
        public string ShortDescription { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public bool IsPublished { get; set; }

        [Required]
        public string Author { get; set; }
                
        public DateTime PublishedDate { get; set; }

        [Required]
        public DateTime UpdatedDate { get; set; }

        public virtual Article Article { get; set; }
        public virtual ICollection<Author_ArticleTag> Author_ArticleTags { get; set; }
        public virtual ICollection<Author_ArticleTechnology> Author_ArticleTechnologies { get; set; }
    }
}
