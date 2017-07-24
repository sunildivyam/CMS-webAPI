namespace CMS_webAPI.IdentityMigrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserProfile_Photo : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "Photo", c => c.Binary());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "Photo");
        }
    }
}
