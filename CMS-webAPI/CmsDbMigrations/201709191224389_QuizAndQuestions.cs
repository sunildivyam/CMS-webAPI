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
                        OptionC = c.String(nullable: false),
                        OptionD = c.String(nullable: false),
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
                "dbo.QuestionTags",
                c => new
                    {
                        QuestionTagId = c.Int(nullable: false, identity: true),
                        QuestionId = c.Int(nullable: false),
                        TagId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.QuestionTagId)
                .ForeignKey("dbo.Questions", t => t.QuestionId, cascadeDelete: true)
                .ForeignKey("dbo.Tags", t => t.TagId, cascadeDelete: true)
                .Index(t => t.QuestionId)
                .Index(t => t.TagId);

            CreateTable(
                "dbo.QuizTags",
                c => new
                    {
                        QuizTagId = c.Int(nullable: false, identity: true),
                        QuizId = c.Int(nullable: false),
                        TagId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.QuizTagId)
                .ForeignKey("dbo.Quizzes", t => t.QuizId, cascadeDelete: true)
                .ForeignKey("dbo.Tags", t => t.TagId, cascadeDelete: true)
                .Index(t => t.QuizId)
                .Index(t => t.TagId);

            CreateTable(
                "dbo.Quizzes",
                c => new
                    {
                        QuizId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 500),
                        Title = c.String(nullable: false, maxLength: 500),
                        Description = c.String(nullable: false),
                        IsLive = c.Boolean(nullable: false),
                        AuthorId = c.String(nullable: false, maxLength: 500),
                        CreatedDate = c.DateTime(nullable: false),
                        UpdatedDate = c.DateTime(nullable: false),
                        UpdateCount = c.Int(nullable: false),
                        VisitCount = c.Int(nullable: false),
                        QuestionIds = c.String(),
                    })
                .PrimaryKey(t => t.QuizId);

            string trigger_UpdateCountOnQuizzes = @"CREATE trigger trigger_UpdateCountOnQuizzes on Quizzes AFTER Update AS
            BEGIN
                declare @updateCount INT;
                set @updateCount = ISNULL((Select au.UpdateCount from Quizzes au, INSERTED ins  WHERE au.QuizId = ins.QuizId ), 0);
                set @updateCount = @updateCount + 1;
                Update Quizzes set UpdateCount = @updateCount Where QuizId = (SELECT QuizId from INSERTED);
            END";

            string trigger_UpdateCountOnQuestions = @"CREATE trigger trigger_UpdateCountOnQuestions on Questions AFTER Update AS
            BEGIN
                declare @updateCount INT;
                set @updateCount = ISNULL((Select au.UpdateCount from Questions au, INSERTED ins  WHERE au.QuestionId = ins.QuestionId ), 0);
                set @updateCount = @updateCount + 1;
                Update Questions set UpdateCount = @updateCount Where QuestionId = (SELECT QuestionId from INSERTED);
            END";

            string proc_UpdateVisitCountOnQuizzes = @"Create Procedure proc_updateVisitCountOnQuizzes @QuizId INT AS
            BEGIN
                DECLARE @visitCount INT;
                SET @visitCount = ISNULL((Select VisitCount from Quizzes WHERE QuizId = @QuizId), 0);
                SET @visitCount = @visitCount + 1;

                UPDATE Quizzes SET VisitCount = @visitCount WHERE QuizId = @QuizId;
            END";

            string proc_UpdateVisitCountOnQuestions = @"Create Procedure proc_updateVisitCountOnQuestions @QuestionId INT AS
            BEGIN
                DECLARE @visitCount INT;
                SET @visitCount = ISNULL((Select VisitCount from Questions WHERE QuestionId = @QuestionId), 0);
                SET @visitCount = @visitCount + 1;

                UPDATE Questions SET VisitCount = @visitCount WHERE QuestionId = @QuestionId;
            END";

            // Publish/unpublish Quiz
            string proc_UpdateIsLiveOnQuizzes = @"Create Procedure proc_UpdateIsLiveOnQuizzes @QuizId INT, @IsLive BIT AS
            BEGIN
                UPDATE Quizzes SET IsLive = @IsLive WHERE QuizId = @QuizId;
            END";

            // Publish/unpublish Question
            string proc_UpdateIsLiveOnQuestions = @"Create Procedure proc_UpdateIsLiveOnQuestions @QuestionId INT, @IsLive BIT AS
            BEGIN
                UPDATE Questions SET IsLive = @IsLive WHERE QuestionId = @QuestionId;
            END";


            Sql(trigger_UpdateCountOnQuestions);
            Sql(trigger_UpdateCountOnQuizzes);
            Sql(proc_UpdateVisitCountOnQuizzes);
            Sql(proc_UpdateVisitCountOnQuestions);
            Sql(proc_UpdateIsLiveOnQuizzes);
            Sql(proc_UpdateIsLiveOnQuestions);
        }

        public override void Down()
        {
            Sql("IF OBJECT_ID ('trigger_UpdateCountOnQuestions', 'TR') IS NOT NULL  DROP TRIGGER trigger_UpdateCountOnQuestions");
            Sql("IF OBJECT_ID ('trigger_UpdateCountOnQuizzes', 'TR') IS NOT NULL  DROP TRIGGER trigger_UpdateCountOnQuizzes");

            Sql("IF OBJECT_ID ('proc_UpdateVisitCountOnQuizzes', 'P') IS NOT NULL  DROP PROCEDURE proc_UpdateVisitCountOnQuizzes");
            Sql("IF OBJECT_ID ('proc_UpdateVisitCountOnQuestions', 'P') IS NOT NULL  DROP PROCEDURE proc_UpdateVisitCountOnQuestions");
            Sql("IF OBJECT_ID ('proc_UpdateIsLiveOnQuizzes', 'P') IS NOT NULL  DROP PROCEDURE proc_UpdateIsLiveOnQuizzes");
            Sql("IF OBJECT_ID ('proc_UpdateIsLiveOnQuestions', 'P') IS NOT NULL  DROP PROCEDURE proc_UpdateIsLiveOnQuestions");

            DropForeignKey("dbo.QuizTags", "TagId", "dbo.Tags");
            DropForeignKey("dbo.QuizTags", "QuizId", "dbo.Quizzes");
            DropForeignKey("dbo.QuestionTags", "TagId", "dbo.Tags");
            DropForeignKey("dbo.QuestionTags", "QuestionId", "dbo.Questions");
            DropIndex("dbo.QuizTags", new[] { "TagId" });
            DropIndex("dbo.QuizTags", new[] { "QuizId" });
            DropIndex("dbo.QuestionTags", new[] { "TagId" });
            DropIndex("dbo.QuestionTags", new[] { "QuestionId" });
            DropTable("dbo.Quizzes");
            DropTable("dbo.QuizTags");
            DropTable("dbo.QuestionTags");
            DropTable("dbo.Questions");
        }
    }
}
