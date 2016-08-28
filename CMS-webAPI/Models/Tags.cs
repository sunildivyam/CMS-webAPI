using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.Models
{
    public class Tags
    {
        [Key]
        [StringLength(500)]
        public string Id { get; set; }  // dash (-) separated Tag Name

        [Required]
        [StringLength(500)]
        [Index(IsUnique = true)]
        public string Name { get; set; }   // Tag Name with no Special characters
    }
}