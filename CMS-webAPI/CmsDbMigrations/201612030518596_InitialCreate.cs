namespace CMS_webAPI.CmsDbMigrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AuthorContents",
                c => new
                    {
                        AuthorContentId = c.Int(nullable: false, identity: true),
                        ContentId = c.Int(),
                        Name = c.String(maxLength: 500),
                        Title = c.String(maxLength: 500),
                        ShortDescription = c.String(),
                        Description = c.String(),
                        CategoryId = c.Int(nullable: false),
                        AuthorId = c.String(maxLength: 500),
                        PublishedDate = c.DateTime(),
                        UpdatedDate = c.DateTime(),
                        UpdateCount = c.Int(),
                    })
                .PrimaryKey(t => t.AuthorContentId)
                .ForeignKey("dbo.Categories", t => t.CategoryId, cascadeDelete: true)
                .Index(t => t.CategoryId);
            
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        CategoryId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 500),
                        Title = c.String(nullable: false, maxLength: 500),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.CategoryId)
                .Index(t => t.Name, unique: true);
            
            CreateTable(
                "dbo.AuthorContentTags",
                c => new
                    {
                        AuthorContentTagId = c.Int(nullable: false, identity: true),
                        AuthorContentId = c.Int(nullable: false),
                        TagId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.AuthorContentTagId)
                .ForeignKey("dbo.AuthorContents", t => t.AuthorContentId, cascadeDelete: true)
                .ForeignKey("dbo.Tags", t => t.TagId, cascadeDelete: true)
                .Index(t => t.AuthorContentId)
                .Index(t => t.TagId);
            
            CreateTable(
                "dbo.Tags",
                c => new
                    {
                        TagId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 500),
                        Title = c.String(nullable: false, maxLength: 500),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.TagId)
                .Index(t => t.Name, unique: true);
            
            CreateTable(
                "dbo.Contents",
                c => new
                    {
                        ContentId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 500),
                        Title = c.String(nullable: false, maxLength: 500),
                        ShortDescription = c.String(nullable: false),
                        Description = c.String(nullable: false),
                        CategoryId = c.Int(nullable: false),
                        IsLive = c.Boolean(nullable: false),
                        OwnerId = c.String(nullable: false, maxLength: 500),
                        PublishDate = c.DateTime(nullable: false),
                        VisitCount = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ContentId)
                .ForeignKey("dbo.Categories", t => t.CategoryId, cascadeDelete: true)
                .Index(t => t.Name, unique: true)
                .Index(t => t.CategoryId);
            
            CreateTable(
                "dbo.ContentTags",
                c => new
                    {
                        ContentTagId = c.Int(nullable: false, identity: true),
                        ContentId = c.Int(nullable: false),
                        TagId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ContentTagId)
                .ForeignKey("dbo.Contents", t => t.ContentId, cascadeDelete: true)
                .ForeignKey("dbo.Tags", t => t.TagId, cascadeDelete: true)
                .Index(t => t.ContentId)
                .Index(t => t.TagId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ContentTags", "TagId", "dbo.Tags");
            DropForeignKey("dbo.ContentTags", "ContentId", "dbo.Contents");
            DropForeignKey("dbo.Contents", "CategoryId", "dbo.Categories");
            DropForeignKey("dbo.AuthorContentTags", "TagId", "dbo.Tags");
            DropForeignKey("dbo.AuthorContentTags", "AuthorContentId", "dbo.AuthorContents");
            DropForeignKey("dbo.AuthorContents", "CategoryId", "dbo.Categories");
            DropIndex("dbo.ContentTags", new[] { "TagId" });
            DropIndex("dbo.ContentTags", new[] { "ContentId" });
            DropIndex("dbo.Contents", new[] { "CategoryId" });
            DropIndex("dbo.Contents", new[] { "Name" });
            DropIndex("dbo.Tags", new[] { "Name" });
            DropIndex("dbo.AuthorContentTags", new[] { "TagId" });
            DropIndex("dbo.AuthorContentTags", new[] { "AuthorContentId" });
            DropIndex("dbo.Categories", new[] { "Name" });
            DropIndex("dbo.AuthorContents", new[] { "CategoryId" });
            DropTable("dbo.ContentTags");
            DropTable("dbo.Contents");
            DropTable("dbo.Tags");
            DropTable("dbo.AuthorContentTags");
            DropTable("dbo.Categories");
            DropTable("dbo.AuthorContents");
        }
    }
}
