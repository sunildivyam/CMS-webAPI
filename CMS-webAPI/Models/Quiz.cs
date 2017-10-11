using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.Models
{
    public class Quiz
    {
        private string _AuthorId;

        public Quiz()
        {
            this.Questions = new HashSet<Question>();
            this.Comments = new HashSet<QuizComment>();
            this.Tags = new HashSet<Tag>();
            this.Author = UserService.GetUserViewModelById(this.AuthorId);
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

        public string QuestionIds { get; set; }

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
        public ICollection<Question> Questions { get; set; }
        public ICollection<QuizComment> Comments { get; set; }
        public ICollection<Tag> Tags { get; set; }

        //Not Mapped Properties
        [NotMapped]
        public UserInfoViewModel Author { get; set; }


        public Quiz Clone()
        {
            return (Quiz)this.MemberwiseClone();
        }
    }
}
