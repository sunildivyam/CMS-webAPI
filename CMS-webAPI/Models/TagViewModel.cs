using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS_webAPI.Models
{
    public class TagViewModel
    {
        public Tag Tag { get; set; }
        public List<ContentViewModel> Contents { get; set; }
        public int TotalCount { get; set; }

        public TagViewModel()
        {
            
        }

        public TagViewModel(Tag tag, List<Content> contents, int totalCount)
        {
            this.Tag = tag;
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

        public TagViewModel(Tag tag, List<ContentViewModel> contentViews)
        {
            this.Tag = tag;
            this.Contents = contentViews;            
        }
    }
}