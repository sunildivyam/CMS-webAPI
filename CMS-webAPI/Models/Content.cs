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
        public int Id { get; set; }

        [Required]
        [StringLength(500)]
        public string Name { get; set; }
        
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
        public int OwnerId { get; set; }

        [Required]
        public DateTime PublishedDate { get; set; }
        
        public int VisitCount { get; set; }

        // RelationShips
        public virtual Category Category { get; set; }    
    }
}
