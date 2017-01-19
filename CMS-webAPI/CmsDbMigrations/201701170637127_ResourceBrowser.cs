namespace CMS_webAPI.CmsDbMigrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ResourceBrowser : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ContentResources",
                c => new
                    {
                        ContentResourceId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        ResourceData = c.Binary(nullable: false),
                        ResourceThumbnail = c.Binary(nullable: false),
                        Size = c.Int(nullable: false),
                        OwnerId = c.String(nullable: false, maxLength: 500),
                        CategoryId = c.Int(nullable: false),
                        UpdatedDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ContentResourceId)
                .ForeignKey("dbo.Categories", t => t.CategoryId, cascadeDelete: true)
                .Index(t => t.CategoryId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ContentResources", "CategoryId", "dbo.Categories");
            DropIndex("dbo.ContentResources", new[] { "CategoryId" });
            DropTable("dbo.ContentResources");
        }
    }
}
