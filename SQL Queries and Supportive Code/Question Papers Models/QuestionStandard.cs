namespace CMS_webAPI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class QuestionStandard
    {
        public int ID { get; set; }

        public int QuestionID { get; set; }

        [Required]
        [StringLength(100)]
        public string StandardID { get; set; }

        public virtual Question Question { get; set; }

        public virtual Standard Standard { get; set; }
    }
}
