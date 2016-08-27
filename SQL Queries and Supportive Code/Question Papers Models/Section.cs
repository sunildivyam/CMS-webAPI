namespace CMS_webAPI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Section
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Section()
        {
            SectionQuestions = new HashSet<SectionQuestion>();
        }

        public int SectionID { get; set; }

        public int PaperID { get; set; }

        [Required]
        [StringLength(500)]
        public string SectionName { get; set; }

        public string Description { get; set; }

        public int SectionNo { get; set; }

        public virtual Paper Paper { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SectionQuestion> SectionQuestions { get; set; }
    }
}
