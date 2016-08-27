namespace CMS_webAPI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class QuestionQuestionCategory
    {
        public int ID { get; set; }

        public int QuestionID { get; set; }

        [Required]
        [StringLength(100)]
        public string QuestionCategoryID { get; set; }

        public virtual QuestionCategory QuestionCategory { get; set; }

        public virtual Question Question { get; set; }
    }
}
