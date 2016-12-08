using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CMS_webAPI.Models
{
    public class AuthorContentViewModel
    {
        [Key]
        public int AuthorContentId { get; set; }

        public int? ContentId { get; set; }

        public string Name { get; set; }

        public string Title { get; set; }

        public string ShortDescription { get; set; }

        public string Description { get; set; }

        public UserInfoViewModel Author { get; set; }

        public DateTime? PublishedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }

        public int? UpdateCount { get; set; }

        // RelationShips
        public Category Category { get; set; }
        public List<Tag> Tags { get; set; }

        // DB Context for Users
        ApplicationDbContext _appDB = new ApplicationDbContext();
        // DB Context for CMS
        CmsDbContext _db = new CmsDbContext();

        public AuthorContentViewModel()
        {

        }

        // The constructor gets AuthorContent from DB model and parse it to View model
        // and populates view model with relational and additional info objects.

        public AuthorContentViewModel(AuthorContent authorContent)
        { 
            if (authorContent != null)
            {
                this.AuthorContentId = authorContent.AuthorContentId;
                this.ContentId = authorContent.ContentId;
                this.Category = authorContent.Category;
                this.Name = authorContent.Name;
                this.Title = authorContent.Title;
                this.ShortDescription = authorContent.ShortDescription;
                this.Description = authorContent.Description;
                this.PublishedDate = authorContent.PublishedDate;
                this.UpdatedDate = authorContent.UpdatedDate;
                this.UpdateCount = authorContent.UpdateCount;
                
                // Tags               
                List<AuthorContentTag> authorContentTags = _db.AuthorContentTags.Where(t => t.AuthorContentId == authorContent.AuthorContentId).ToList<AuthorContentTag>();
                
                this.Tags = new List<Tag>();

                for (int i = 0; i < authorContentTags.Count; i++)
                {
                    this.Tags.Add(_db.Tags.Find(authorContentTags[i].TagId));
                }

                // Author                
                var author = _appDB.Users.Find(authorContent.AuthorId);
                this.Author = new UserInfoViewModel();
                this.Author.FirstName = author.FirstName;
                this.Author.LastName = author.LastName;
                this.Author.Email = author.Email;
                this.Author.HasRegistered = true;
                this.Author.Phone = author.Phone;
            }
        }

        
        // This parses the view model to DB model, ignoring info Objects and relational data

        public AuthorContent ToDbModel()
        {
            AuthorContent content = new AuthorContent();
            content.AuthorContentId = this.AuthorContentId;
            content.ContentId = this.ContentId;
            content.CategoryId = this.Category.CategoryId;
            content.Name = this.Name;
            content.Title = this.Title;
            content.ShortDescription = this.ShortDescription;
            content.Description = this.Description;
            content.PublishedDate = this.PublishedDate;
            content.UpdatedDate = this.UpdatedDate;
            content.UpdateCount = this.UpdateCount;

            
            var author = _appDB.Users.FirstOrDefault(u => u.Email == this.Author.Email);
            content.AuthorId = author.Id;
            return content;
        } 
        // Generates List of AuthorContentTag from view models Tags property.
        public List<AuthorContentTag> getAuthorContentTags() {
            List<AuthorContentTag> authorContentTags = new List<AuthorContentTag>();

            foreach (Tag tag in this.Tags)
            {
                authorContentTags.Add(new AuthorContentTag()
                {
                    AuthorContentId = this.AuthorContentId,
                    TagId = tag.TagId
                });
            }

            return authorContentTags;
        }
    }
}
