using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace CMS_webAPI.Models
{
    public class ContentTag
    {
        public ContentTag()
        {

        }

        [Key]
        public int ContentTagId { get; set; }
        
        [ForeignKey("Content")]
        public int ContentId { get; set; }

        [ForeignKey("Tag")]
        public int TagId { get; set; }

        public virtual Content Content { get; set; }
        public virtual Tag Tag { get; set; }
    }
}