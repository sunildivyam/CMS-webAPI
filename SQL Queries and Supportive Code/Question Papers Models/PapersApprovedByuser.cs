namespace CMS_webAPI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class PapersApprovedByuser
    {
        public int ID { get; set; }

        public int PaperID { get; set; }

        [Required]
        [StringLength(128)]
        public string UserID { get; set; }

        public DateTime? CreatedDateTime { get; set; }

        public DateTime? EditedDateTime { get; set; }

        public bool IsApproved { get; set; }

        public virtual AspNetUser AspNetUser { get; set; }

        public virtual Paper Paper { get; set; }
    }
}
