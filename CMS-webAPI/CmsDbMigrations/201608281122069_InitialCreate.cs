namespace CMS_webAPI.CmsDbMigrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Articles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false, maxLength: 500),
                        ShortDescription = c.String(nullable: false),
                        Description = c.String(nullable: false),
                        IsLive = c.Boolean(nullable: false),
                        Author = c.String(nullable: false),
                        PublishedDate = c.DateTime(nullable: false),
                        Visits = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ArticleTags",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ArticleId = c.Int(nullable: false),
                        TagId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Articles", t => t.ArticleId, cascadeDelete: true)
                .ForeignKey("dbo.Tags", t => t.TagId, cascadeDelete: true)
                .Index(t => t.ArticleId)
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
                "dbo.ArticleTechnologies",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ArticleId = c.Int(nullable: false),
                        TagId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Articles", t => t.ArticleId, cascadeDelete: true)
                .ForeignKey("dbo.Technologies", t => t.TagId, cascadeDelete: true)
                .Index(t => t.ArticleId)
                .Index(t => t.TagId);
            
            CreateTable(
                "dbo.Technologies",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false, maxLength: 500),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Title, unique: true);
            
            CreateTable(
                "dbo.Author_Article",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ArticleId = c.Int(nullable: false),
                        Title = c.String(nullable: false, maxLength: 500),
                        ShortDescription = c.String(nullable: false),
                        Description = c.String(nullable: false),
                        IsPublished = c.Boolean(nullable: false),
                        Author = c.String(nullable: false),
                        PublishedDate = c.DateTime(nullable: false),
                        UpdatedDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Articles", t => t.ArticleId, cascadeDelete: true)
                .Index(t => t.ArticleId);
            
            CreateTable(
                "dbo.Author_ArticleTag",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ArticleId = c.Int(nullable: false),
                        TagId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Author_Article", t => t.ArticleId, cascadeDelete: true)
                .ForeignKey("dbo.Tags", t => t.TagId, cascadeDelete: true)
                .Index(t => t.ArticleId)
                .Index(t => t.TagId);
            
            CreateTable(
                "dbo.Author_ArticleTechnology",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ArticleId = c.Int(nullable: false),
                        TagId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Author_Article", t => t.ArticleId, cascadeDelete: true)
                .ForeignKey("dbo.Technologies", t => t.TagId, cascadeDelete: true)
                .Index(t => t.ArticleId)
                .Index(t => t.TagId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Author_ArticleTechnology", "TagId", "dbo.Technologies");
            DropForeignKey("dbo.Author_ArticleTechnology", "ArticleId", "dbo.Author_Article");
            DropForeignKey("dbo.Author_ArticleTag", "TagId", "dbo.Tags");
            DropForeignKey("dbo.Author_ArticleTag", "ArticleId", "dbo.Author_Article");
            DropForeignKey("dbo.Author_Article", "ArticleId", "dbo.Articles");
            DropForeignKey("dbo.ArticleTechnologies", "TagId", "dbo.Technologies");
            DropForeignKey("dbo.ArticleTechnologies", "ArticleId", "dbo.Articles");
            DropForeignKey("dbo.ArticleTags", "TagId", "dbo.Tags");
            DropForeignKey("dbo.ArticleTags", "ArticleId", "dbo.Articles");
            DropIndex("dbo.Author_ArticleTechnology", new[] { "TagId" });
            DropIndex("dbo.Author_ArticleTechnology", new[] { "ArticleId" });
            DropIndex("dbo.Author_ArticleTag", new[] { "TagId" });
            DropIndex("dbo.Author_ArticleTag", new[] { "ArticleId" });
            DropIndex("dbo.Author_Article", new[] { "ArticleId" });
            DropIndex("dbo.Technologies", new[] { "Title" });
            DropIndex("dbo.ArticleTechnologies", new[] { "TagId" });
            DropIndex("dbo.ArticleTechnologies", new[] { "ArticleId" });
            DropIndex("dbo.Tags", new[] { "Title" });
            DropIndex("dbo.ArticleTags", new[] { "TagId" });
            DropIndex("dbo.ArticleTags", new[] { "ArticleId" });
            DropTable("dbo.Author_ArticleTechnology");
            DropTable("dbo.Author_ArticleTag");
            DropTable("dbo.Author_Article");
            DropTable("dbo.Technologies");
            DropTable("dbo.ArticleTechnologies");
            DropTable("dbo.Tags");
            DropTable("dbo.ArticleTags");
            DropTable("dbo.Articles");
        }
    }
}
