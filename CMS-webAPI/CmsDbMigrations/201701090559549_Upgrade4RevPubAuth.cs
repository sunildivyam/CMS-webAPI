namespace CMS_webAPI.CmsDbMigrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Upgrade4RevPubAuth : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Contents", "AuthorContentId", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Contents", "AuthorContentId");
        }
    }
}
