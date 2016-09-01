using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace CMS_webAPI.Models
{
    public class Author_ContentTag
    {
        public Author_ContentTag()
        {

        }

        [Key]
        public int Id { get; set; }

        [ForeignKey("Author_Content")]
        public int ContentId { get; set; }

        [ForeignKey("Tag")]
        public int TagId { get; set; }

        public virtual Author_Content Author_Content { get; set; }
        public virtual Tag Tag { get; set; }
    }
}