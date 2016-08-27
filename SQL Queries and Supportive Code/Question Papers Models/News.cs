namespace CMS_webAPI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class News
    {
        public int NewsID { get; set; }

        [Required]
        [StringLength(500)]
        public string Title { get; set; }

        public string Description { get; set; }

        public bool? Broadcast { get; set; }

        public DateTime? CreatedDateTime { get; set; }

        public DateTime? EditedDateTime { get; set; }
    }
}
