namespace CMS_webAPI.CmsDbMigrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Upgrade3FullTextSearch : DbMigration
    {
        public override void Up()
        {
            string fullTextcatalog = "CREATE FULLTEXT CATALOG CmsFTS;";

            string fullTextIndexContents = "CREATE FULLTEXT INDEX ON Contents (Title, ShortDescription, Description) KEY INDEX \"PK_dbo.Contents\" ON CmsFTS;";

            string fullTextIndexTags = "CREATE FULLTEXT INDEX ON Tags (Title, Description) KEY INDEX \"PK_dbo.Tags\" ON CmsFTS;";

            Sql(fullTextcatalog, true);
            Sql(fullTextIndexContents, true);
            Sql(fullTextIndexTags, true);           
        }
        
        public override void Down()
        {
            Sql("DROP FULLTEXT INDEX ON Contents");
            Sql("DROP FULLTEXT INDEX ON Tags");
            Sql("DROP FULLTEXT CATALOG CmsFTS");
        }
    }
}
