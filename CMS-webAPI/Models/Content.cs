using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.Models
{    
    public class Content
    {
        public Content()
        {

        }

        [Key]
        public int ContentId { get; set; }

        [Required]
        [StringLength(500)]        
        public string Name { get; set; }    // name, - separated string generated from Title
        
        [Required]
        [StringLength(500)]
        public string Title { get; set; }

        [Required]
        public string ShortDescription { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        [Required]
        public bool IsLive { get; set; }

        [Required]
        [StringLength(500)]
        public string OwnerId { get; set; }

        [Required]
        public DateTime PublishedDate { get; set; }
        
        [Required]
        public int VisitCount { get; set; }
                
        public int? AuthorContentId { get; set; }

        // RelationShips
        public virtual Category Category { get; set; }        
    }
}
