namespace CMS_webAPI.CmsDbMigrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Upgrade2 : DbMigration
    {
        public override void Up()
        {
            string trigger_UpdateCountOnAuthorContents = @"CREATE trigger updateUpdateCountOnAuthorContents on AuthorContents AFTER Update AS 
            BEGIN
                declare @updateCount INT;
                set @updateCount = ISNULL((Select au.UpdateCount from AuthorContents au, INSERTED ins  WHERE au.AuthorContentId = ins.AuthorContentId ), 0);
                set @updateCount = @updateCount + 1;
                Update AuthorContents set UpdateCount = @updateCount Where AuthorContentId = (SELECT AuthorContentId from INSERTED);
            END";

            string proc_UpdateVisitCountOnContents = @"Create Procedure proc_updateVisitCountOnContents @ContentId INT AS
            BEGIN
                DECLARE @visitCount INT;
                SET @visitCount = ISNULL((Select VisitCount from Contents WHERE ContentId = @ContentId), 0);
                SET @visitCount = @visitCount + 1;

                UPDATE Contents SET VisitCount = @visitCount WHERE ContentId = @ContentId;
            END";

            Sql(trigger_UpdateCountOnAuthorContents);
            Sql(proc_UpdateVisitCountOnContents);
        }

        public override void Down()
        {
            Sql("IF OBJECT_ID ('updateUpdateCountOnAuthorContents', 'TR') IS NOT NULL  DROP TRIGGER updateUpdateCountOnAuthorContents");
            Sql("IF OBJECT_ID ('proc_UpdateVisitCountOnContents', 'P') IS NOT NULL  DROP PROCEDURE proc_UpdateVisitCountOnContents");
        }
    }
}
