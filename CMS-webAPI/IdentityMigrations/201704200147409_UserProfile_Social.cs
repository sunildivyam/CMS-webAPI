namespace CMS_webAPI.IdentityMigrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserProfile_Social : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "Twitter", c => c.String());
            AddColumn("dbo.AspNetUsers", "Facebook", c => c.String());
            AddColumn("dbo.AspNetUsers", "Google", c => c.String());
            AddColumn("dbo.AspNetUsers", "Github", c => c.String());
            AddColumn("dbo.AspNetUsers", "Webpage", c => c.String());
            AddColumn("dbo.AspNetUsers", "Youtube", c => c.String());
            AddColumn("dbo.AspNetUsers", "Linkedin", c => c.String());
            AddColumn("dbo.AspNetUsers", "Description", c => c.String());
            AddColumn("dbo.AspNetUsers", "Organisation", c => c.String());
            AddColumn("dbo.AspNetUsers", "Designation", c => c.String());
            AddColumn("dbo.AspNetUsers", "CreatedOn", c => c.DateTime());
            DropColumn("dbo.AspNetUsers", "Phone");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "Phone", c => c.String(maxLength: 50));
            DropColumn("dbo.AspNetUsers", "CreatedOn");
            DropColumn("dbo.AspNetUsers", "Designation");
            DropColumn("dbo.AspNetUsers", "Organisation");
            DropColumn("dbo.AspNetUsers", "Description");
            DropColumn("dbo.AspNetUsers", "Linkedin");
            DropColumn("dbo.AspNetUsers", "Youtube");
            DropColumn("dbo.AspNetUsers", "Webpage");
            DropColumn("dbo.AspNetUsers", "Github");
            DropColumn("dbo.AspNetUsers", "Google");
            DropColumn("dbo.AspNetUsers", "Facebook");
            DropColumn("dbo.AspNetUsers", "Twitter");
        }
    }
}
