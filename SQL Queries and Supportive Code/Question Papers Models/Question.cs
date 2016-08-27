namespace CMS_webAPI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Question
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Question()
        {
            AnswersByUsers = new HashSet<AnswersByUser>();
            QuestionCompetitiveExaminations = new HashSet<QuestionCompetitiveExamination>();
            QuestionExaminations = new HashSet<QuestionExamination>();
            QuestionQuestionCategories = new HashSet<QuestionQuestionCategory>();
            QuestionsApprovedByUsers = new HashSet<QuestionsApprovedByUser>();
            QuestionsByUsers = new HashSet<QuestionsByUser>();
            QuestionStandards = new HashSet<QuestionStandard>();
            QuestionSubjects = new HashSet<QuestionSubject>();
            SectionQuestions = new HashSet<SectionQuestion>();
            Threads = new HashSet<Thread>();
        }

        public int QuestionID { get; set; }

        [Column("Question")]
        [Required]
        [StringLength(900)]
        public string Question1 { get; set; }

        [StringLength(500)]
        public string Option1 { get; set; }

        [StringLength(500)]
        public string Option2 { get; set; }

        [StringLength(500)]
        public string Option3 { get; set; }

        [StringLength(500)]
        public string Option4 { get; set; }

        [StringLength(500)]
        public string Option5 { get; set; }

        public string Remarks { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AnswersByUser> AnswersByUsers { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<QuestionCompetitiveExamination> QuestionCompetitiveExaminations { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<QuestionExamination> QuestionExaminations { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<QuestionQuestionCategory> QuestionQuestionCategories { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<QuestionsApprovedByUser> QuestionsApprovedByUsers { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<QuestionsByUser> QuestionsByUsers { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<QuestionStandard> QuestionStandards { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<QuestionSubject> QuestionSubjects { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SectionQuestion> SectionQuestions { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Thread> Threads { get; set; }
    }
}
