namespace CMS_webAPI.IdentityMigrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserProfile_3Props : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "FirstName", c => c.String(nullable: false, maxLength: 500));
            AddColumn("dbo.AspNetUsers", "LastName", c => c.String(maxLength: 500));
            AddColumn("dbo.AspNetUsers", "Phone", c => c.String(maxLength: 50));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "Phone");
            DropColumn("dbo.AspNetUsers", "LastName");
            DropColumn("dbo.AspNetUsers", "FirstName");
        }
    }
}
