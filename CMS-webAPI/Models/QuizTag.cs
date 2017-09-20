using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace CMS_webAPI.Models
{
    public class QuizTag
    {
        public QuizTag()
        {

        }

        [Key]
        public int QuizTagId { get; set; }

        [ForeignKey("Quiz")]
        public int QuizId { get; set; }

        [ForeignKey("Tag")]
        public int TagId { get; set; }

        public virtual Quiz Quiz { get; set; }
        public virtual Tag Tag { get; set; }
    }
}