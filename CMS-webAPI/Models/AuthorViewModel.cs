using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS_webAPI.Models
{
    public class AuthorViewModel
    {
        public UserInfoViewModel Author { get; set; }
        public List<ContentViewModel> Contents { get; set; }
        public int TotalCount { get; set; }

        public AuthorViewModel()
        {

        }

        public AuthorViewModel(UserInfoViewModel author, List<Content> contents, int totalCount)
        {
            this.Author = author;
            this.Contents = new List<ContentViewModel>();
            this.TotalCount = totalCount;
            if (contents != null)
            {
                foreach (Content content in contents)
                {
                    this.Contents.Add(new ContentViewModel(content));
                }
            }
            else
            {
                this.Contents = null;
            }
        }

        public AuthorViewModel(UserInfoViewModel author, List<ContentViewModel> contentViews)
        {
            this.Author = author;
            this.Contents = contentViews;
        }
    }
}