# CMS-webAPI
CMS-webAPI is an application in .Net MVC Web API
# Steps to Create membership database, init using EF first

use Nuget Package Manager Console
Enter following commands:

> Enable-Migrations
> Add-Migration Init
> Update-Database

Creates a database at location mentioned in Connection String

Other Commands

# To Run Specific Migration (Downgrade or Upgrade):
> Update-Database –TargetMigration: MigrationName

# To Run Migration in Verbose Mode:
> Update-Database –Verbose

# Updaing Database without actually updating database, rather to a script
> Update-Database -Script -SourceMigration: $InitialDatabase -TargetMigration: AddPostAbstract

# To Enable Migrations for Specific DBContext
> Enable-Migrations -ContextTypeName DBContextTypeName
	where DBContextTypeName can be CMS_webAPI.Models.CmsDbContext

# Migrating Multiple DB Contexts
> enable-migrations -ContextTypeName <DbContext-Name-with-Namespaces> -MigrationsDirectory:<Migrations-Directory-Name>
> Add-Migration -configuration <DbContext-Migrations-Configuration-Class-with-Namespaces> <Migrations-Name>
> Update-Database -configuration <DbContext-Migrations-Configuration-Class-with-Namespaces> -Verbose

Example: 
> enable-migrations -ContextTypeName CMS_webAPI.Models.DataContext -MigrationsDirectory:ApplicationDbContextMigrations
> Add-Migration -configuration CMS_webAPI.ApplicationDbContextMigrations.Configuration Initial
> Update-Database -configuration CMS_webAPI.ApplicationDbContextMigrations.Configuration -Verbose