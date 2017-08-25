using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CMS_webAPI.Models
{
    public class CommentViewModel
    {
        [Key]
        public int CommentId { get; set; }

        public string Description { get; set; }

        public UserInfoViewModel Owner { get; set; }

        public DateTime PostedDate { get; set; }

        public int ContentId { get; set; }

        // DB Context for Users
        //ApplicationDbContext _appDB = new ApplicationDbContext();
        // DB Context for CMS
        //CmsDbContext _db = new CmsDbContext();

        public CommentViewModel()
        {

        }

        public CommentViewModel(Comment comment)
        {
            if (comment != null)
            {
                this.CommentId = (int)comment.CommentId;                
                this.Description = comment.Description;
                this.PostedDate = (DateTime)comment.PostedDate;
                this.ContentId = comment.ContentId;
                // Owner
                this.Owner = UserService.GetUserViewModelById(comment.OwnerId);                
            }
        }

        // This parses the view model to DB model, ignoring info Objects and relational data

        public Comment ToDbModel()
        {
            Comment comment = new Comment();
            comment.CommentId = this.CommentId;
            comment.Description = this.Description;
            comment.PostedDate = this.PostedDate;
            comment.ContentId = this.ContentId;
            var owner = UserService.getUserFromUserViewModel(this.Owner);
            if (owner != null)
            {
                comment.OwnerId = owner.Id;
            }
            else
            {
                comment.OwnerId = null;
            }

            return comment;
        }
    }
}
