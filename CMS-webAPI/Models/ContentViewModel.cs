using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CMS_webAPI.Models
{
    public class ContentViewModel
    {
        [Key]
        public int ContentId { get; set; }

        public string Name { get; set; }

        public string Title { get; set; }

        public string ShortDescription { get; set; }

        public string Description { get; set; }        

        public UserInfoViewModel Owner { get; set; }

        public DateTime PublishedDate { get; set; }

        public int VisitCount { get; set; }

        public Boolean IsLive { get; set; }

        // RelationShips
        public Category Category { get; set; }
        public List<Tag> Tags { get; set; }

        // DB Context for Users
        ApplicationDbContext _appDB = new ApplicationDbContext();
        // DB Context for CMS
        CmsDbContext _db = new CmsDbContext();

        public ContentViewModel()
        {

        }

        public ContentViewModel(Content content)
        {
            if (content != null)
            {
                this.ContentId = (int)content.ContentId;
                this.Category = _db.Categories.Find(content.CategoryId);
                this.Name = content.Name;
                this.Title = content.Title;
                this.ShortDescription = content.ShortDescription;
                this.Description = content.Description;
                this.PublishedDate = (DateTime)content.PublishedDate;
                this.VisitCount = content.VisitCount;
                this.IsLive = content.IsLive;

                // Tags
                List<ContentTag> contentTags = _db.ContentTags.Where(t => t.ContentId == content.ContentId).ToList<ContentTag>();

                this.Tags = new List<Tag>();

                for (int i = 0; i < contentTags.Count; i++)
                {
                    this.Tags.Add(_db.Tags.Find(contentTags[i].TagId));
                }

                // Owner
                this.Owner = UserService.GetUserViewModelById(content.OwnerId);
            }
        }


        // The constructor gets AuthorContent from DB model and parse it to View model
        // and populates view model with relational and additional info objects.

        public ContentViewModel(AuthorContent authorContent)
        {
            if (authorContent != null)
            {
                this.ContentId = (int)authorContent.ContentId;
                this.Category = _db.Categories.Find(authorContent.CategoryId);
                this.Name = authorContent.Name;
                this.Title = authorContent.Title;
                this.ShortDescription = authorContent.ShortDescription;
                this.Description = authorContent.Description;
                //this.PublishedDate = (DateTime)authorContent.PublishedDate;

                // Tags
                List<AuthorContentTag> authorContentTags = _db.AuthorContentTags.Where(t => t.AuthorContentId == authorContent.AuthorContentId).ToList<AuthorContentTag>();

                this.Tags = new List<Tag>();

                for (int i = 0; i < authorContentTags.Count; i++)
                {
                    this.Tags.Add(_db.Tags.Find(authorContentTags[i].TagId));
                }

                // Author
                this.Owner = UserService.GetUserViewModelById(authorContent.AuthorId);
            }
        }


        public ContentViewModel(AuthorContentViewModel authorContentView)
        {
            if (authorContentView != null)
            {
                if (authorContentView.ContentId != null)
                {
                    this.ContentId = (int) authorContentView.ContentId;
                }
                else
                {
                    this.ContentId = 0;
                }
                
                this.Category = authorContentView.Category;
                this.Name = authorContentView.Name;
                this.Title = authorContentView.Title;
                this.ShortDescription = authorContentView.ShortDescription;
                this.Description = authorContentView.Description;
                //this.PublishedDate = (DateTime)authorContentView.PublishedDate;
                this.Tags = authorContentView.Tags;

                // Author
                this.Owner = authorContentView.Author;                
            }
        }

        // This parses the view model to DB model, ignoring info Objects and relational data

        public Content ToDbModel()
        {
            Content content = new Content();
            content.ContentId = this.ContentId;            
            content.CategoryId = this.Category.CategoryId;
            content.Name = this.Name;
            content.Title = this.Title;
            content.ShortDescription = this.ShortDescription;
            content.Description = this.Description;
            content.PublishedDate = this.PublishedDate;
            content.IsLive = this.IsLive;
            content.VisitCount = this.VisitCount;            
            var owner = UserService.getUserFromUserViewModel(this.Owner);
            if (owner != null) {
                content.OwnerId = owner.Id;
            }
            else
            {
                content.OwnerId = null;
            }
            
            return content;
        }
        // Generates List of ContentTag from view models Tags property.
        public List<ContentTag> getContentTags()
        {
            List<ContentTag> contentTags = new List<ContentTag>();

            foreach (Tag tag in this.Tags)
            {
                contentTags.Add(new ContentTag()
                {
                    ContentId = this.ContentId,
                    TagId = tag.TagId
                });
            }

            return contentTags;
        }
    }
}
