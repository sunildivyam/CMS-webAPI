using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace CMS_webAPI.Models
{
    public class AuthorContentTag
    {
        public AuthorContentTag()
        {

        }

        [Key]
        public int AuthorContentTagId { get; set; }

        [ForeignKey("AuthorContent")]
        public int AuthorContentId { get; set; }

        [ForeignKey("Tag")]
        public int TagId { get; set; }

        public virtual AuthorContent AuthorContent { get; set; }
        public virtual Tag Tag { get; set; }
    }
}