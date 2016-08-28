using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.Models
{
    public class Articles
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(500)]
        public string Name { get; set; }

        [Required]
        [StringLength(500)]
        public string Title { get; set; }

        [Required]
        public string ShortDescription { get; set; }

        [Required]
        public string Description { get; set; }        

    }
}
