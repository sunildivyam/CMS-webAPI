namespace CMS_webAPI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class AnswersByUser
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public AnswersByUser()
        {
            AnswersByUsersApprovedByUsers = new HashSet<AnswersByUsersApprovedByUser>();
        }

        public int ID { get; set; }

        [Required]
        [StringLength(128)]
        public string UserID { get; set; }

        public int QuestionID { get; set; }

        public DateTime? CreatedDateTime { get; set; }

        public DateTime? EditeddateTime { get; set; }

        [StringLength(100)]
        public string CorrectAnswer { get; set; }

        public string Answer { get; set; }

        public virtual Question Question { get; set; }

        public virtual AspNetUser AspNetUser { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AnswersByUsersApprovedByUser> AnswersByUsersApprovedByUsers { get; set; }
    }
}
