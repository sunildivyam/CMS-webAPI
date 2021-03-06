﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.Models
{
    public class Category
    {
        public Category()
        {

        }

        [Key]
        public int CategoryId { get; set; }

        [Required]
        [StringLength(500)]
        [Index(IsUnique = true)]
        public string Name { get; set; }    // name, - separated string generated from Title
        
        [Required]
        [StringLength(500)]        
        public string Title { get; set; }   //Categories may be like Article, Technology, Service

        public string Description { get; set; }   
    }
}