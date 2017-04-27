using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.RBModels
{
    public class Project
    {
        [Key]
        public int ProjectId { get; set; }

        [ForeignKey("Resume")]
        public int ResumeId { get; set; }

        [Required]
        [MaxLength()]
        public string Name { get; set; }
                
        [MaxLength()]
        public string Description { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }
    }
}