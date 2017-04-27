using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.RBModels
{
    public class Resume
    {

        [Key]
        public int ResumeId { get; set; }



        // Foriegn keys
        [ForeignKey("Address")]
        public int PresentAddressId { get; set; }

        // Foriegn keys
        [ForeignKey("Address")]
        public int PermanentAddressId { get; set; }



        [Required]
        [MaxLength()]
        public string Name { get; set; }

        [Required]
        [MaxLength()]
        public string Gender { get; set; }

        [Required]        
        public DateTime BirthDate { get; set; }



        // Single-To-Many Relationship
        public List<Language> Languages { get; set; }
        public List<Employer> Employers { get; set; }
        public List<Project> Projects { get; set; }
        public List<Skill> Skills { get; set; }
    }
}