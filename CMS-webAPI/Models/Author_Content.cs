using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.Models
{
    public class Author_Content
    {
        public Author_Content()
        {

        }

        [Key]
        public int Id { get; set; }
                        
        public int ContentId { get; set; }

        [StringLength(500)]
        public string Name { get; set; }

        [StringLength(500)]
        public string Title { get; set; }
        
        public string ShortDescription { get; set; }
        
        public string Description { get; set; }
        
        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        public int AuthorId { get; set; }
                
        public DateTime PublishedDate { get; set; }
        
        public DateTime UpdatedDate { get; set; }

        public int UpdateCount { get; set; }

        // RelationShips        
        public virtual Category Category { get; set; }
    }
}
