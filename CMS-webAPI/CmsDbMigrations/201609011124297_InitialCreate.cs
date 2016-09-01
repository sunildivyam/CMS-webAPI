namespace CMS_webAPI.CmsDbMigrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Author_Content",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ContentId = c.Int(nullable: false),
                        Name = c.String(maxLength: 500),
                        Title = c.String(maxLength: 500),
                        ShortDescription = c.String(),
                        Description = c.String(),
                        CategoryId = c.Int(nullable: false),
                        AuthorId = c.Int(nullable: false),
                        PublishedDate = c.DateTime(nullable: false),
                        UpdatedDate = c.DateTime(nullable: false),
                        UpdateCount = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Categories", t => t.CategoryId, cascadeDelete: true)
                .Index(t => t.CategoryId);
            
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false, maxLength: 500),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Title, unique: true);
            
            CreateTable(
                "dbo.Author_ContentTag",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ContentId = c.Int(nullable: false),
                        TagId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Author_Content", t => t.ContentId, cascadeDelete: true)
                .ForeignKey("dbo.Tags", t => t.TagId, cascadeDelete: true)
                .Index(t => t.ContentId)
                .Index(t => t.TagId);
            
            CreateTable(
                "dbo.Tags",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false, maxLength: 500),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Title, unique: true);
            
            CreateTable(
                "dbo.Contents",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 500),
                        Title = c.String(maxLength: 500),
                        ShortDescription = c.String(nullable: false),
                        Description = c.String(nullable: false),
                        CategoryId = c.Int(nullable: false),
                        IsLive = c.Boolean(nullable: false),
                        OwnerId = c.Int(nullable: false),
                        PublishedDate = c.DateTime(nullable: false),
                        VisitCount = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Categories", t => t.CategoryId, cascadeDelete: true)
                .Index(t => t.CategoryId);
            
            CreateTable(
                "dbo.ContentTags",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ContentId = c.Int(nullable: false),
                        TagId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
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
            DropForeignKey("dbo.Author_ContentTag", "TagId", "dbo.Tags");
            DropForeignKey("dbo.Author_ContentTag", "ContentId", "dbo.Author_Content");
            DropForeignKey("dbo.Author_Content", "CategoryId", "dbo.Categories");
            DropIndex("dbo.ContentTags", new[] { "TagId" });
            DropIndex("dbo.ContentTags", new[] { "ContentId" });
            DropIndex("dbo.Contents", new[] { "CategoryId" });
            DropIndex("dbo.Tags", new[] { "Title" });
            DropIndex("dbo.Author_ContentTag", new[] { "TagId" });
            DropIndex("dbo.Author_ContentTag", new[] { "ContentId" });
            DropIndex("dbo.Categories", new[] { "Title" });
            DropIndex("dbo.Author_Content", new[] { "CategoryId" });
            DropTable("dbo.ContentTags");
            DropTable("dbo.Contents");
            DropTable("dbo.Tags");
            DropTable("dbo.Author_ContentTag");
            DropTable("dbo.Categories");
            DropTable("dbo.Author_Content");
        }
    }
}
