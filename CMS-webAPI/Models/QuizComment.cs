using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CMS_webAPI.Models
{
    public class QuizComment
    {
        private string _OwnerId;
        
        public QuizComment()
        {
            this.Owner = UserService.GetUserViewModelById(this.OwnerId);
        }

        [Key]
        public int QuizCommentId { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int QuizId { get; set; }

        [Required]
        [StringLength(500)]
        public string OwnerId {
            get { return _OwnerId; }
            set { _OwnerId = value;  this.Owner = UserService.GetUserViewModelById(value); }
        }

        [Required]
        public DateTime PostedDate { get; set; }


        // Navigation Properties
        public Quiz Quiz {get; set;}

        //Not Mapped Properties
        [NotMapped]
        public UserInfoViewModel Owner { get; set; }
    }
}