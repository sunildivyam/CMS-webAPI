using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.Models
{
    public class Question
    {
        private string _AuthorId;
        
        public Question()
        {
            this.Quizs = new HashSet<Quiz>();
            this.Comments = new HashSet<QuestionComment>();
            this.Tags = new HashSet<Tag>();
            this.Author = UserService.GetUserViewModelById(this.AuthorId);
        }

        [Key]
        public int QuestionId { get; set; }
        
        [Required]
        public string Description { get; set; }

        [Required]
        public string OptionA { get; set; }

        [Required]
        public string OptionB { get; set; }
                
        public string OptionC { get; set; }
                
        public string OptionD { get; set; }

        [Required]
        public string Answer { get; set; }
        
        public string AnswerDescription { get; set; }
      
        [Required]
        public bool IsLive { get; set; }

        [Required]
        [StringLength(500)]
        public string AuthorId {
            get { return _AuthorId; }
            set { _AuthorId = value;  this.Author = UserService.GetUserViewModelById(value); }
        }

        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime UpdatedDate { get; set; }

        [Required]
        public int UpdateCount { get; set; }

        [Required]
        public int VisitCount { get; set; }


        //Navigation Properties        
        public virtual ICollection<Quiz> Quizs { get; set; }
        public ICollection<QuestionComment> Comments { get; set; }
        public virtual ICollection<Tag> Tags { get; set; }

        //Not Mapped Properties
        [NotMapped]
        public UserInfoViewModel Author { get; set; }

    }
}
