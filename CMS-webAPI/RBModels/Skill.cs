using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.RBModels
{
    public class Skill
    {
        [Key]
        public int SkillId { get; set; }

        [ForeignKey("Resume")]
        public int ResumeId { get; set; }

        [Required]
        [MaxLength()]
        public string Name { get; set; }
                
        [MaxLength()]
        public string Version { get; set; }

        [Required]
        public int Experience { get; set; }

        [Required]
        [MaxLength()]
        public string Proficiency { get; set; }
                
        public DateTime LastWorkedOn { get; set; }

        [MaxLength()]
        public string Comments { get; set; }
    }
}