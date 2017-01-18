using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.Models
{
    public class ContentResource
    {
        public ContentResource()
        {

        }

        [Key]
        public int ContentResourceId {get;set;}

        [Required]
        public string Name { get; set; }

        [Required]
        public byte[] ResourceData { get; set; }

        [Required]
        public byte[] ResourceThumbnail { get; set; }

        [Required, StringLength(500)]
        public string OwnerId { get; set; }

        [Required, ForeignKey("Category")]
        public int CategoryId { get; set; }

        [Required]
        public DateTime UpdatedDate { get; set; }

        // RelationShips        
        public virtual Category Category { get; set; }
    }
}