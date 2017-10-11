using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CMS_webAPI.Models
{
    public class QuizsViewModel
    {        
        public List<Quiz> Quizs { get; set; }
        public int TotalCount { get; set; }
        public Tag Tag { get; set; }

        public QuizsViewModel()
        {
            this.Quizs = new List<Quiz>();
            this.TotalCount = 0;
            this.Tag = null;
        }

        public QuizsViewModel(List<Quiz> quizs, int totalCount)
        {
            this.Quizs = quizs;
            this.TotalCount = totalCount;           
        }

        public QuizsViewModel(List<Quiz> quizs, int totalCount, Tag tag)
        {
            this.Quizs = quizs;
            this.TotalCount = totalCount;
            this.Tag = tag;
        }
    }
}
