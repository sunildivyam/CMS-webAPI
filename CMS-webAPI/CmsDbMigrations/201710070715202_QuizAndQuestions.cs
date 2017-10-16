namespace CMS_webAPI.CmsDbMigrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class QuizAndQuestions : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Questions",
                c => new
                    {
                        QuestionId = c.Int(nullable: false, identity: true),
                        Description = c.String(nullable: false),
                        OptionA = c.String(nullable: false),
                        OptionB = c.String(nullable: false),
                        OptionC = c.String(),
                        OptionD = c.String(),
                        Answer = c.String(nullable: false),
                        AnswerDescription = c.String(),
                        IsLive = c.Boolean(nullable: false),
                        AuthorId = c.String(nullable: false, maxLength: 500),
                        CreatedDate = c.DateTime(nullable: false),
                        UpdatedDate = c.DateTime(nullable: false),
                        UpdateCount = c.Int(nullable: false),
                        VisitCount = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.QuestionId);
            
            CreateTable(
                "dbo.QuestionComments",
                c => new
                    {
                        QuestionCommentId = c.Int(nullable: false, identity: true),
                        Description = c.String(nullable: false),
                        QuestionId = c.Int(nullable: false),
                        OwnerId = c.String(nullable: false, maxLength: 500),
                        PostedDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.QuestionCommentId)
                .ForeignKey("dbo.Questions", t => t.QuestionId, cascadeDelete: true)
                .Index(t => t.QuestionId);
            
            CreateTable(
                "dbo.Quizs",
                c => new
                    {
                        QuizId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 500),
                        Title = c.String(nullable: false, maxLength: 500),
                        Description = c.String(nullable: false),
                        QuestionIds = c.String(),
                        IsLive = c.Boolean(nullable: false),
                        AuthorId = c.String(nullable: false, maxLength: 500),
                        CreatedDate = c.DateTime(nullable: false),
                        UpdatedDate = c.DateTime(nullable: false),
                        UpdateCount = c.Int(nullable: false),
                        VisitCount = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.QuizId);
            
            CreateTable(
                "dbo.QuizComments",
                c => new
                    {
                        QuizCommentId = c.Int(nullable: false, identity: true),
                        Description = c.String(nullable: false),
                        QuizId = c.Int(nullable: false),
                        OwnerId = c.String(nullable: false, maxLength: 500),
                        PostedDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.QuizCommentId)
                .ForeignKey("dbo.Quizs", t => t.QuizId, cascadeDelete: true)
                .Index(t => t.QuizId);
            
            CreateTable(
                "dbo.QuizQuestions",
                c => new
                    {
                        Quiz_QuizId = c.Int(nullable: false),
                        Question_QuestionId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Quiz_QuizId, t.Question_QuestionId })
                .ForeignKey("dbo.Quizs", t => t.Quiz_QuizId, cascadeDelete: true)
                .ForeignKey("dbo.Questions", t => t.Question_QuestionId, cascadeDelete: true)
                .Index(t => t.Quiz_QuizId)
                .Index(t => t.Question_QuestionId);
            
            CreateTable(
                "dbo.QuizTags",
                c => new
                    {
                        Quiz_QuizId = c.Int(nullable: false),
                        Tag_TagId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Quiz_QuizId, t.Tag_TagId })
                .ForeignKey("dbo.Quizs", t => t.Quiz_QuizId, cascadeDelete: true)
                .ForeignKey("dbo.Tags", t => t.Tag_TagId, cascadeDelete: true)
                .Index(t => t.Quiz_QuizId)
                .Index(t => t.Tag_TagId);
            
            CreateTable(
                "dbo.QuestionTags",
                c => new
                    {
                        Question_QuestionId = c.Int(nullable: false),
                        Tag_TagId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Question_QuestionId, t.Tag_TagId })
                .ForeignKey("dbo.Questions", t => t.Question_QuestionId, cascadeDelete: true)
                .ForeignKey("dbo.Tags", t => t.Tag_TagId, cascadeDelete: true)
                .Index(t => t.Question_QuestionId)
                .Index(t => t.Tag_TagId);
            string trigger_UpdateCountOnQuizs = @"CREATE trigger trigger_UpdateCountOnQuizs on Quizs AFTER Update AS
            BEGIN
                declare @updateCount INT;
                set @updateCount = ISNULL((Select au.UpdateCount from Quizs au, INSERTED ins  WHERE au.QuizId = ins.QuizId ), 0);
                set @updateCount = @updateCount + 1;
                Update Quizs set UpdateCount = @updateCount Where QuizId = (SELECT QuizId from INSERTED);
            END";

            string trigger_UpdateCountOnQuestions = @"CREATE trigger trigger_UpdateCountOnQuestions on Questions AFTER Update AS
            BEGIN
                declare @updateCount INT;
                set @updateCount = ISNULL((Select au.UpdateCount from Questions au, INSERTED ins  WHERE au.QuestionId = ins.QuestionId ), 0);
                set @updateCount = @updateCount + 1;
                Update Questions set UpdateCount = @updateCount Where QuestionId = (SELECT QuestionId from INSERTED);
            END";

            string proc_UpdateVisitCountOnQuiz = @"Create Procedure proc_updateVisitCountOnQuiz @QuizId INT, @VisitCount INT OUT AS
            BEGIN
                SET @VisitCount = ISNULL((Select VisitCount from Quizs WHERE QuizId = @QuizId), 0);
                SET @VisitCount = @VisitCount + 1;

                UPDATE Quizs SET VisitCount = @VisitCount WHERE QuizId = @QuizId;
                SELECT @VisitCount;
            END";


            string proc_UpdateVisitCountOnQuestion = @"Create Procedure proc_updateVisitCountOnQuestion @QuestionId INT, @VisitCount INT OUT AS
            BEGIN
                SET @VisitCount = ISNULL((Select VisitCount from Questions WHERE QuestionId = @QuestionId), 0);
                SET @VisitCount = @VisitCount + 1;

                UPDATE Questions SET VisitCount = @VisitCount WHERE QuestionId = @QuestionId;
                SELECT @VisitCount;
            END";


            Sql(trigger_UpdateCountOnQuestions);
            Sql(trigger_UpdateCountOnQuizs);
            Sql(proc_UpdateVisitCountOnQuiz);
            Sql(proc_UpdateVisitCountOnQuestion);
            
        }
        
        public override void Down()
        {
            Sql("IF OBJECT_ID ('trigger_UpdateCountOnQuestions', 'TR') IS NOT NULL  DROP TRIGGER trigger_UpdateCountOnQuestions");
            Sql("IF OBJECT_ID ('trigger_UpdateCountOnQuizs', 'TR') IS NOT NULL  DROP TRIGGER trigger_UpdateCountOnQuizs");
            Sql("DROP PROCEDURE proc_UpdateVisitCountOnQuiz");
            Sql("DROP PROCEDURE proc_UpdateVisitCountOnQuestion");
            
            DropForeignKey("dbo.QuestionTags", "Tag_TagId", "dbo.Tags");
            DropForeignKey("dbo.QuestionTags", "Question_QuestionId", "dbo.Questions");
            DropForeignKey("dbo.QuizTags", "Tag_TagId", "dbo.Tags");
            DropForeignKey("dbo.QuizTags", "Quiz_QuizId", "dbo.Quizs");
            DropForeignKey("dbo.QuizQuestions", "Question_QuestionId", "dbo.Questions");
            DropForeignKey("dbo.QuizQuestions", "Quiz_QuizId", "dbo.Quizs");
            DropForeignKey("dbo.QuizComments", "QuizId", "dbo.Quizs");
            DropForeignKey("dbo.QuestionComments", "QuestionId", "dbo.Questions");
            DropIndex("dbo.QuestionTags", new[] { "Tag_TagId" });
            DropIndex("dbo.QuestionTags", new[] { "Question_QuestionId" });
            DropIndex("dbo.QuizTags", new[] { "Tag_TagId" });
            DropIndex("dbo.QuizTags", new[] { "Quiz_QuizId" });
            DropIndex("dbo.QuizQuestions", new[] { "Question_QuestionId" });
            DropIndex("dbo.QuizQuestions", new[] { "Quiz_QuizId" });
            DropIndex("dbo.QuizComments", new[] { "QuizId" });
            DropIndex("dbo.QuestionComments", new[] { "QuestionId" });
            DropTable("dbo.QuestionTags");
            DropTable("dbo.QuizTags");
            DropTable("dbo.QuizQuestions");
            DropTable("dbo.QuizComments");
            DropTable("dbo.Quizs");
            DropTable("dbo.QuestionComments");
            DropTable("dbo.Questions");
        }
    }
}
