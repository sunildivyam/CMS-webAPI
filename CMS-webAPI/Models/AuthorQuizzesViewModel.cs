using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS_webAPI.Models
{
    public class AuthorQuizzesViewModel
    {
        public UserInfoViewModel Author { get; set; }
        public List<QuizViewModel> Quizzes { get; set; }
        public int TotalCount { get; set; }

        public AuthorQuizzesViewModel()
        {

        }

        public AuthorQuizzesViewModel(UserInfoViewModel author, List<Quiz> quizzes, int totalCount)
        {
            this.Author = author;
            this.Quizzes = new List<QuizViewModel>();
            this.TotalCount = totalCount;
            if (quizzes != null)
            {
                foreach (Quiz quiz in quizzes)
                {
                    this.Quizzes.Add(new QuizViewModel(quiz));
                }
            }
            else
            {
                this.Quizzes = null;
            }
        }

        public AuthorQuizzesViewModel(UserInfoViewModel author, List<QuizViewModel> quizViews)
        {
            this.Author = author;
            this.Quizzes = quizViews;
        }
    }
}
