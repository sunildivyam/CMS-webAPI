namespace CMS_webAPI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class PaperSubject
    {
        public int ID { get; set; }

        public int PaperID { get; set; }

        [Required]
        [StringLength(100)]
        public string SubjectID { get; set; }

        public virtual Paper Paper { get; set; }

        public virtual Subject Subject { get; set; }
    }
}
