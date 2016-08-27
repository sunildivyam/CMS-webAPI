namespace CMS_webAPI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class PaperYear
    {
        public int ID { get; set; }

        public int PaperID { get; set; }

        public int YearID { get; set; }

        public virtual Paper Paper { get; set; }

        public virtual Year Year { get; set; }
    }
}
