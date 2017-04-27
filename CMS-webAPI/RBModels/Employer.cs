using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS_webAPI.RBModels
{
    public class Employer
    {
        [Key]
        public int EmployerId { get; set; }

        // Foreign Keys
        [ForeignKey("Resume")]
        public int ResumeId { get; set; }

        [ForeignKey("Address")]
        public int AddressId { get; set; }


        //
        [Required]
        [MaxLength()]
        public string Name { get; set; }

        [Required]
        [MaxLength()]
        public string Type { get; set; }

        [Required]       
        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        [Required]
        [MaxLength()]
        public string Designation { get; set; }

        [Required]
        public Boolean ManageTeam { get; set; }

        [MaxLength()]
        public string TeamSize { get; set; }

        [Required]
        [MaxLength()]
        public string JobDescription { get; set; }

        public int NoticePeriod { get; set; }

        public DateTime ExpectedLastWorkingDay { get; set; }

        public Decimal OfferedSalary { get; set; }

        [MaxLength()]
        public string NextEmployerName { get; set; }

        [MaxLength()]
        public string OfferedDesignation { get; set; }

        [MaxLength()]
        public string OfferedLocation { get; set; }


    }
}