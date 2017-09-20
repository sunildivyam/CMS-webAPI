using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.Models
{
    public class Question
    {
        public Question()
        {

        }

        [Key]
        public int QuestionId { get; set; }
        
        [Required]
        public string Description { get; set; }

        [Required]
        public string OptionA { get; set; }

        [Required]
        public string OptionB { get; set; }

        [Required]
        public string OptionC { get; set; }

        [Required]
        public string OptionD { get; set; }

        [Required]
        public string Answer { get; set; }
        
        public string AnswerDescription { get; set; }
      
        [Required]
        public bool IsLive { get; set; }

        [Required]
        [StringLength(500)]
        public string AuthorId { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime UpdatedDate { get; set; }

        [Required]
        public int UpdateCount { get; set; }

        [Required]
        public int VisitCount { get; set; } 
    }
}
