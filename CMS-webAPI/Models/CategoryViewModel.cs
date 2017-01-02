using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CMS_webAPI.Models
{
    public class CategoryViewModel
    {
        public Category Category { get; set; }
        public List<ContentViewModel> Contents { get; set; }
        public int TotalCount { get; set; }

        public CategoryViewModel()
        {
            
        }

        public CategoryViewModel(Category category, List<Content> contents, int totalCount)
        {
            this.Category = category;
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

        public CategoryViewModel(Category category, List<ContentViewModel> contentViews)
        {
            this.Category = category;
            this.Contents = contentViews;            
        }
    }
}
