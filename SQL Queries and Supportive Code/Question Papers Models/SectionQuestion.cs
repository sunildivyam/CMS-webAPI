namespace CMS_webAPI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class SectionQuestion
    {
        public int ID { get; set; }

        public int SectionID { get; set; }

        public int QuestionID { get; set; }

        public int QuestionNo { get; set; }

        public int? MaximumMarks { get; set; }

        public virtual Question Question { get; set; }

        public virtual Section Section { get; set; }
    }
}
