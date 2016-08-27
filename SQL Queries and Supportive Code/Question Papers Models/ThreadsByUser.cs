namespace CMS_webAPI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ThreadsByUser
    {
        public int ID { get; set; }

        public int ThreadID { get; set; }

        [Required]
        [StringLength(128)]
        public string UserID { get; set; }

        public virtual AspNetUser AspNetUser { get; set; }

        public virtual Thread Thread { get; set; }
    }
}
