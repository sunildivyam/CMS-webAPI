using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.Models
{
    public class AuthorActions
    {
        [Key]
        [StringLength(50)]
        public string Id { get; set; }  // Actions: Create, update, delete, view, etc.

        [StringLength(500)]
        public string Description { get; set; } // descriptions
    }
}