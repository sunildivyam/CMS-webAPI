using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace CMS_webAPI.Models
{
    public class QuestionTag
    {
        public QuestionTag()
        {

        }

        [Key]
        public int QuestionTagId { get; set; }

        [ForeignKey("Question")]
        public int QuestionId { get; set; }

        [ForeignKey("Tag")]
        public int TagId { get; set; }

        public virtual Question Question { get; set; }
        public virtual Tag Tag { get; set; }
    }
}