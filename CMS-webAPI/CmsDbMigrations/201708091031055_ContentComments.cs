namespace CMS_webAPI.CmsDbMigrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ContentComments : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        CommentId = c.Int(nullable: false, identity: true),
                        Description = c.String(nullable: false),
                        ContentId = c.Int(nullable: false),
                        OwnerId = c.String(nullable: false, maxLength: 500),
                        PostedDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.CommentId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Comments");
        }
    }
}
