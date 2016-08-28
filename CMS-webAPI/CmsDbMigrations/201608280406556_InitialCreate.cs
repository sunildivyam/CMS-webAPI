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
                        Name = c.String(nullable: false, maxLength: 500),
                        Title = c.String(nullable: false, maxLength: 500),
                        ShortDescription = c.String(nullable: false),
                        Description = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ArticleUpdates",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ArticleId = c.Int(nullable: false),
                        ActionTimeStamp = c.DateTime(nullable: false),
                        AuthorAction = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AuthorActions",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 50),
                        Description = c.String(maxLength: 500),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Tags",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 500),
                        Name = c.String(nullable: false, maxLength: 500),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.Tags", new[] { "Name" });
            DropTable("dbo.Tags");
            DropTable("dbo.AuthorActions");
            DropTable("dbo.ArticleUpdates");
            DropTable("dbo.Articles");
        }
    }
}
