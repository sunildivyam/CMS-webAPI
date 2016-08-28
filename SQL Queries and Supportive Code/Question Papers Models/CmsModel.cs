namespace CMS_webAPI.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class CmsModel : DbContext
    {
        public CmsModel()
            : base("name=CmsModel")
        {
        }

        public virtual DbSet<AnswersByUser> AnswersByUsers { get; set; }
        public virtual DbSet<AnswersByUsersApprovedByUser> AnswersByUsersApprovedByUsers { get; set; }
        public virtual DbSet<AspNetRole> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUser> AspNetUsers { get; set; }
        public virtual DbSet<CompetitiveExamination> CompetitiveExaminations { get; set; }
        public virtual DbSet<Examination> Examinations { get; set; }
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<PaperCategory> PaperCategories { get; set; }
        public virtual DbSet<PaperExamination> PaperExaminations { get; set; }
        public virtual DbSet<Paper> Papers { get; set; }
        public virtual DbSet<PapersApprovedByuser> PapersApprovedByusers { get; set; }
        public virtual DbSet<PapersByUser> PapersByUsers { get; set; }
        public virtual DbSet<PapersPaperCategory> PapersPaperCategories { get; set; }
        public virtual DbSet<PaperStandard> PaperStandards { get; set; }
        public virtual DbSet<PaperSubject> PaperSubjects { get; set; }
        public virtual DbSet<PaperYear> PaperYears { get; set; }
        public virtual DbSet<QuestionCategory> QuestionCategories { get; set; }
        public virtual DbSet<QuestionCompetitiveExamination> QuestionCompetitiveExaminations { get; set; }
        public virtual DbSet<QuestionExamination> QuestionExaminations { get; set; }
        public virtual DbSet<QuestionQuestionCategory> QuestionQuestionCategories { get; set; }
        public virtual DbSet<Question> Questions { get; set; }
        public virtual DbSet<QuestionsApprovedByUser> QuestionsApprovedByUsers { get; set; }
        public virtual DbSet<QuestionsByUser> QuestionsByUsers { get; set; }
        public virtual DbSet<QuestionStandard> QuestionStandards { get; set; }
        public virtual DbSet<QuestionSubject> QuestionSubjects { get; set; }
        public virtual DbSet<SectionQuestion> SectionQuestions { get; set; }
        public virtual DbSet<Section> Sections { get; set; }
        public virtual DbSet<Standard> Standards { get; set; }
        public virtual DbSet<Subject> Subjects { get; set; }
        public virtual DbSet<Thread> Threads { get; set; }
        public virtual DbSet<ThreadsByUser> ThreadsByUsers { get; set; }
        public virtual DbSet<Year> Years { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AnswersByUser>()
                .Property(e => e.CorrectAnswer)
                .IsUnicode(false);

            modelBuilder.Entity<AnswersByUser>()
                .Property(e => e.Answer)
                .IsUnicode(false);

            modelBuilder.Entity<AnswersByUser>()
                .HasMany(e => e.AnswersByUsersApprovedByUsers)
                .WithRequired(e => e.AnswersByUser)
                .HasForeignKey(e => e.AnswersByUsersID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<AspNetRole>()
                .HasMany(e => e.AspNetUsers)
                .WithMany(e => e.AspNetRoles)
                .Map(m => m.ToTable("AspNetUserRoles").MapLeftKey("RoleId").MapRightKey("UserId"));

            modelBuilder.Entity<AspNetUser>()
                .HasMany(e => e.AnswersByUsers)
                .WithRequired(e => e.AspNetUser)
                .HasForeignKey(e => e.UserID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<AspNetUser>()
                .HasMany(e => e.AnswersByUsersApprovedByUsers)
                .WithRequired(e => e.AspNetUser)
                .HasForeignKey(e => e.UserID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<AspNetUser>()
                .HasMany(e => e.AspNetUserClaims)
                .WithRequired(e => e.AspNetUser)
                .HasForeignKey(e => e.UserId);

            modelBuilder.Entity<AspNetUser>()
                .HasMany(e => e.AspNetUserLogins)
                .WithRequired(e => e.AspNetUser)
                .HasForeignKey(e => e.UserId);

            modelBuilder.Entity<AspNetUser>()
                .HasMany(e => e.PapersApprovedByusers)
                .WithRequired(e => e.AspNetUser)
                .HasForeignKey(e => e.UserID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<AspNetUser>()
                .HasMany(e => e.PapersByUsers)
                .WithRequired(e => e.AspNetUser)
                .HasForeignKey(e => e.UserID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<AspNetUser>()
                .HasMany(e => e.QuestionsApprovedByUsers)
                .WithOptional(e => e.AspNetUser)
                .HasForeignKey(e => e.UserID);

            modelBuilder.Entity<AspNetUser>()
                .HasMany(e => e.QuestionsByUsers)
                .WithRequired(e => e.AspNetUser)
                .HasForeignKey(e => e.UserID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<AspNetUser>()
                .HasMany(e => e.ThreadsByUsers)
                .WithRequired(e => e.AspNetUser)
                .HasForeignKey(e => e.UserID)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CompetitiveExamination>()
                .Property(e => e.CompetitiveExaminationID)
                .IsUnicode(false);

            modelBuilder.Entity<CompetitiveExamination>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<CompetitiveExamination>()
                .HasMany(e => e.QuestionCompetitiveExaminations)
                .WithRequired(e => e.CompetitiveExamination)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Examination>()
                .Property(e => e.ExaminationID)
                .IsUnicode(false);

            modelBuilder.Entity<Examination>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Examination>()
                .HasMany(e => e.PaperExaminations)
                .WithRequired(e => e.Examination)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Examination>()
                .HasMany(e => e.QuestionExaminations)
                .WithRequired(e => e.Examination)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<News>()
                .Property(e => e.Title)
                .IsUnicode(false);

            modelBuilder.Entity<News>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<PaperCategory>()
                .Property(e => e.PaperCategoryID)
                .IsUnicode(false);

            modelBuilder.Entity<PaperCategory>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<PaperCategory>()
                .HasMany(e => e.PapersPaperCategories)
                .WithRequired(e => e.PaperCategory)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<PaperExamination>()
                .Property(e => e.ExaminationID)
                .IsUnicode(false);

            modelBuilder.Entity<Paper>()
                .Property(e => e.PaperName)
                .IsUnicode(false);

            modelBuilder.Entity<Paper>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Paper>()
                .HasMany(e => e.PaperExaminations)
                .WithRequired(e => e.Paper)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Paper>()
                .HasMany(e => e.PapersApprovedByusers)
                .WithRequired(e => e.Paper)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Paper>()
                .HasMany(e => e.PapersByUsers)
                .WithRequired(e => e.Paper)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Paper>()
                .HasMany(e => e.PapersPaperCategories)
                .WithRequired(e => e.Paper)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Paper>()
                .HasMany(e => e.PaperStandards)
                .WithRequired(e => e.Paper)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Paper>()
                .HasMany(e => e.PaperSubjects)
                .WithRequired(e => e.Paper)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Paper>()
                .HasMany(e => e.PaperYears)
                .WithRequired(e => e.Paper)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Paper>()
                .HasMany(e => e.Sections)
                .WithRequired(e => e.Paper)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<PapersPaperCategory>()
                .Property(e => e.PaperCategoryID)
                .IsUnicode(false);

            modelBuilder.Entity<PaperStandard>()
                .Property(e => e.StandardID)
                .IsUnicode(false);

            modelBuilder.Entity<PaperSubject>()
                .Property(e => e.SubjectID)
                .IsUnicode(false);

            modelBuilder.Entity<QuestionCategory>()
                .Property(e => e.QuestionCategoryID)
                .IsUnicode(false);

            modelBuilder.Entity<QuestionCategory>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<QuestionCategory>()
                .HasMany(e => e.QuestionQuestionCategories)
                .WithRequired(e => e.QuestionCategory)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<QuestionCompetitiveExamination>()
                .Property(e => e.CompetitiveExaminationID)
                .IsUnicode(false);

            modelBuilder.Entity<QuestionExamination>()
                .Property(e => e.ExaminationID)
                .IsUnicode(false);

            modelBuilder.Entity<QuestionQuestionCategory>()
                .Property(e => e.QuestionCategoryID)
                .IsUnicode(false);

            modelBuilder.Entity<Question>()
                .Property(e => e.Question1)
                .IsUnicode(false);

            modelBuilder.Entity<Question>()
                .Property(e => e.Option1)
                .IsUnicode(false);

            modelBuilder.Entity<Question>()
                .Property(e => e.Option2)
                .IsUnicode(false);

            modelBuilder.Entity<Question>()
                .Property(e => e.Option3)
                .IsUnicode(false);

            modelBuilder.Entity<Question>()
                .Property(e => e.Option4)
                .IsUnicode(false);

            modelBuilder.Entity<Question>()
                .Property(e => e.Option5)
                .IsUnicode(false);

            modelBuilder.Entity<Question>()
                .Property(e => e.Remarks)
                .IsUnicode(false);

            modelBuilder.Entity<Question>()
                .HasMany(e => e.AnswersByUsers)
                .WithRequired(e => e.Question)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Question>()
                .HasMany(e => e.QuestionCompetitiveExaminations)
                .WithRequired(e => e.Question)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Question>()
                .HasMany(e => e.QuestionExaminations)
                .WithRequired(e => e.Question)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Question>()
                .HasMany(e => e.QuestionQuestionCategories)
                .WithRequired(e => e.Question)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Question>()
                .HasMany(e => e.QuestionsApprovedByUsers)
                .WithRequired(e => e.Question)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Question>()
                .HasMany(e => e.QuestionsByUsers)
                .WithRequired(e => e.Question)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Question>()
                .HasMany(e => e.QuestionStandards)
                .WithRequired(e => e.Question)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Question>()
                .HasMany(e => e.QuestionSubjects)
                .WithRequired(e => e.Question)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Question>()
                .HasMany(e => e.SectionQuestions)
                .WithRequired(e => e.Question)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Question>()
                .HasMany(e => e.Threads)
                .WithRequired(e => e.Question)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<QuestionStandard>()
                .Property(e => e.StandardID)
                .IsUnicode(false);

            modelBuilder.Entity<QuestionSubject>()
                .Property(e => e.SubjectID)
                .IsUnicode(false);

            modelBuilder.Entity<Section>()
                .Property(e => e.SectionName)
                .IsUnicode(false);

            modelBuilder.Entity<Section>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Section>()
                .HasMany(e => e.SectionQuestions)
                .WithRequired(e => e.Section)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Standard>()
                .Property(e => e.StandardID)
                .IsUnicode(false);

            modelBuilder.Entity<Standard>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Standard>()
                .HasMany(e => e.PaperStandards)
                .WithRequired(e => e.Standard)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Standard>()
                .HasMany(e => e.QuestionStandards)
                .WithRequired(e => e.Standard)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Subject>()
                .Property(e => e.SubjectID)
                .IsUnicode(false);

            modelBuilder.Entity<Subject>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Subject>()
                .HasMany(e => e.PaperSubjects)
                .WithRequired(e => e.Subject)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Subject>()
                .HasMany(e => e.QuestionSubjects)
                .WithRequired(e => e.Subject)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Thread>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Thread>()
                .HasMany(e => e.ThreadsByUsers)
                .WithRequired(e => e.Thread)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Year>()
                .HasMany(e => e.PaperYears)
                .WithRequired(e => e.Year)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Year>()
                .HasMany(e => e.QuestionCompetitiveExaminations)
                .WithRequired(e => e.Year)
                .WillCascadeOnDelete(false);
        }
    }
}
