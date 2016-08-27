namespace CMS_webAPI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class AnswersByUsersApprovedByUser
    {
        public int ID { get; set; }

        [Required]
        [StringLength(128)]
        public string UserID { get; set; }

        public int AnswersByUsersID { get; set; }

        public DateTime? CreatedDateTime { get; set; }

        public DateTime? EditeddateTime { get; set; }

        public bool? IsApproved { get; set; }

        public virtual AnswersByUser AnswersByUser { get; set; }

        public virtual AspNetUser AspNetUser { get; set; }
    }
}
