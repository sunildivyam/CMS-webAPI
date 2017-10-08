using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CMS_webAPI.Models
{
    public class QuestionComment
    {
        private string _OwnerId;

        public QuestionComment()
        {
            this.Owner = UserService.GetUserViewModelById(this.OwnerId);
        }

        [Key]
        public int QuestionCommentId { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int QuestionId { get; set; }

        [Required]
        [StringLength(500)]
        public string OwnerId {
            get { return _OwnerId; }
            set { _OwnerId = value;  this.Owner = UserService.GetUserViewModelById(value); }
        }

        [Required]
        public DateTime PostedDate { get; set; }


        // Navigation Properties
        public virtual Question Question { get; set; }

        //Not Mapped Properties
        [NotMapped]
        public UserInfoViewModel Owner { get; set; }
    }
}