using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.Models
{
    public class Tag
    {
        public Tag()
        {

        }

        [Key]        
        public int TagId { get; set; }

        [Required]
        [StringLength(500)]
        [Index(IsUnique = true)]
        public string Name { get; set; }    // Tag name, - separated string generated from Title

        [Required]
        [StringLength(500)]        
        public string Title { get; set; }   // Tag title with no Special characters
                
        public string Description { get; set; }   // Tag Name with no Special characters        
    }
}