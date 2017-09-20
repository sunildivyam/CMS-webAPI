using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.Models
{
    public class Quiz
    {
        public Quiz()
        {

        }

        [Key]
        public int QuizId { get; set; }

        [Required]
        [StringLength(500)]        
        public string Name { get; set; }    // name, - separated string generated from Title
        
        [Required]
        [StringLength(500)]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

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
        
        public string QuestionIds { get; set; }
    }
}
