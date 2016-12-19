namespace CMS_webAPI.CmsDbMigrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Upgrade1 : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Contents", new[] { "Name" });
            AddColumn("dbo.Contents", "PublishedDate", c => c.DateTime(nullable: false));
            DropColumn("dbo.Contents", "PublishDate");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Contents", "PublishDate", c => c.DateTime(nullable: false));
            DropColumn("dbo.Contents", "PublishedDate");
            CreateIndex("dbo.Contents", "Name", unique: true);
        }
    }
}
