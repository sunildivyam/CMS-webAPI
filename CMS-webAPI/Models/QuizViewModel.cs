using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CMS_webAPI.Models
{
    public class QuizViewModel
    {
        [Key]
        public int QuizId { get; set; }

        public string Name { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }        

        public UserInfoViewModel Author { get; set; }

        public DateTime CreatedDate { get; set; }
        
        public DateTime UpdatedDate { get; set; }

        public int VisitCount { get; set; }

        public int UpdateCount { get; set; }

        public Boolean IsLive { get; set; }        

        public string QuestionIds { get; set; }

        // RelationShips
        public List<QuestionViewModel> Questions { get; set; }
        public List<Tag> Tags { get; set; }

        // DB Context for Users
        ApplicationDbContext _appDB = new ApplicationDbContext();
        // DB Context for CMS
        CmsDbContext _db = new CmsDbContext();

        public QuizViewModel()
        {

        }

        public QuizViewModel(Quiz quiz)
        {
            if (quiz != null)
            {
                this.QuizId = (int)quiz.QuizId;
                this.Name = quiz.Name;
                this.Title = quiz.Title;                
                this.Description = quiz.Description;
                this.CreatedDate = (DateTime)quiz.CreatedDate;
                this.UpdatedDate = (DateTime)quiz.UpdatedDate;
                this.VisitCount = quiz.VisitCount;
                this.UpdateCount = quiz.UpdateCount;
                this.IsLive = quiz.IsLive;
                this.QuestionIds = quiz.QuestionIds;
                // Tags
                List<QuizTag> quizTags = _db.QuizTags.Where(t => t.QuizId == quiz.QuizId).ToList<QuizTag>();

                this.Tags = new List<Tag>();

                for (int i = 0; i < quizTags.Count; i++)
                {
                    this.Tags.Add(_db.Tags.Find(quizTags[i].TagId));
                }

                // Questions
                this.Questions = new List<QuestionViewModel>();
                if (this.QuestionIds != null)
                {
                    List<Question> quizQuestions = _db.Questions.Include(this.QuestionIds).ToList();
                    this.Questions = QuestionViewModel.ToQuestionViewModels(quizQuestions);
                }
                // Owner
                this.Author = UserService.GetUserViewModelById(quiz.AuthorId);
            }
        }
                      
        // This parses the view model to DB model, ignoring info Objects and relational data

        public Quiz ToDbModel()
        {
            Quiz quiz = new Quiz();
            quiz.QuizId = this.QuizId;                        
            quiz.Name = this.Name;
            quiz.Title = this.Title;
            quiz.Description = this.Description;
            quiz.CreatedDate = this.CreatedDate;
            quiz.UpdatedDate = this.UpdatedDate;
            quiz.IsLive = this.IsLive;
            quiz.VisitCount = this.VisitCount;
            quiz.UpdateCount = this.UpdateCount;
            quiz.QuestionIds = this.QuestionIds;
            var author = UserService.getUserFromUserViewModel(this.Author);
            if (author != null) {
                quiz.AuthorId = author.Id;
            }
            else
            {
                quiz.AuthorId = null;
            }
            
            return quiz;
        }

        // Generates List of ContentTag from view models Tags property.
        public List<QuizTag> getQuizTags()
        {
            List<QuizTag> quizTags = new List<QuizTag>();

            foreach (Tag tag in this.Tags)
            {
                quizTags.Add(new QuizTag()
                {
                    QuizId = this.QuizId,
                    TagId = tag.TagId
                });
            }

            return quizTags;
        }
    }
}


