namespace CMS_webAPI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class QuestionExamination
    {
        public int ID { get; set; }

        public int QuestionID { get; set; }

        [Required]
        [StringLength(100)]
        public string ExaminationID { get; set; }

        public virtual Examination Examination { get; set; }

        public virtual Question Question { get; set; }
    }
}
