using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CMS_webAPI.Models
{
    public class Comment
    {
        public Comment()
        {

        }

        [Key]
        public int CommentId { get; set; }
        
        [Required]
        public string Description { get; set; }

        [Required]        
        public int ContentId { get; set; }

        [Required]
        [StringLength(500)]
        public string OwnerId { get; set; }

        [Required]
        public DateTime PostedDate { get; set; }
    }
}