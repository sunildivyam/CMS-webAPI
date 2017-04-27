using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.RBModels
{
    public class Language
    {
        [Key]
        public int LanguageId { get; set; }

        [ForeignKey("Resume")]
        [Required]
        public int ResumeId { get; set; }

        [Required]
        [StringLength(100)]
        public String Name { get; set; }

        [Required]
        [StringLength(100)]
        public string Proficiency { get; set; }

        [Required]
        public Boolean Read { get; set; }

        [Required]
        public Boolean Write { get; set; }

        [Required]
        public Boolean Speak { get; set; }


        //RelationShips
        //public virtual Resume Resume { get; set; }
    }
}