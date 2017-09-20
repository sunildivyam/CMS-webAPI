using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CMS_webAPI.Models
{
    public class QuestionViewModel
    {
        [Key]
        public int QuestionId { get; set; }

        public string Description { get; set; }

        public string OptionA { get; set; }        
        public string OptionB { get; set; }        
        public string OptionC { get; set; }        
        public string OptionD { get; set; }

        public string Answer { get; set; }
        public string AnswerDescription { get; set; }        

        public UserInfoViewModel Author { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public int VisitCount { get; set; }

        public int UpdateCount { get; set; }

        public Boolean IsLive { get; set; }

        // RelationShips        
        public List<Tag> Tags { get; set; }

        // DB Context for Users
        ApplicationDbContext _appDB = new ApplicationDbContext();
        // DB Context for CMS
        CmsDbContext _db = new CmsDbContext();

        public QuestionViewModel()
        {

        }

        public QuestionViewModel(Question question)
        {
            if (question != null)
            {
                this.QuestionId = (int)question.QuestionId;                
                this.Description = question.Description;
                this.OptionA = question.OptionA;
                this.OptionB = question.OptionB;
                this.OptionC = question.OptionC;
                this.OptionD = question.OptionD;
                this.Answer = question.Answer;
                this.AnswerDescription = question.AnswerDescription;
                this.CreatedDate = (DateTime)question.CreatedDate;
                this.UpdatedDate = (DateTime)question.UpdatedDate;
                this.VisitCount = question.VisitCount;
                this.UpdateCount = question.UpdateCount;
                this.IsLive = question.IsLive;

                // Tags
                List<QuestionTag> questionTags = _db.QuestionTags.Where(t => t.QuestionId == question.QuestionId).ToList<QuestionTag>();

                this.Tags = new List<Tag>();

                for (int i = 0; i < questionTags.Count; i++)
                {
                    this.Tags.Add(_db.Tags.Find(questionTags[i].TagId));
                }
                
                // Author
                this.Author = UserService.GetUserViewModelById(question.AuthorId);
            }
        }

        // This parses the view model to DB model, ignoring info Objects and relational data

        public Question ToDbModel()
        {
            Question question = new Question();
            question.QuestionId = this.QuestionId;
            question.Description = this.Description;
            question.OptionA = this.OptionA;
            question.OptionB = this.OptionB;
            question.OptionC = this.OptionC;
            question.OptionD = this.OptionD;
            question.Answer = this.Answer;
            question.AnswerDescription = this.AnswerDescription;
            question.CreatedDate = this.CreatedDate;
            question.UpdatedDate = this.UpdatedDate;
            question.IsLive = this.IsLive;
            question.VisitCount = this.VisitCount;
            question.UpdateCount = this.UpdateCount;

            var author = UserService.getUserFromUserViewModel(this.Author);
            if (author != null)
            {
                question.AuthorId = author.Id;
            }
            else
            {
                question.AuthorId = null;
            }

            return question;
        }

        public static List<QuestionViewModel> ToQuestionViewModels(List<Question> questions)
        {
            List<QuestionViewModel> questionViewModels = new List<QuestionViewModel>();
            if (questions != null)
            {
                foreach(Question question in questions)
                {
                    questionViewModels.Add(new QuestionViewModel(question));
                }   
            }

            return questionViewModels;
        }

        // Generates List of ContentTag from view models Tags property.
        public List<QuestionTag> getQuestionTags()
        {
            List<QuestionTag> questionTags = new List<QuestionTag>();

            foreach (Tag tag in this.Tags)
            {
                questionTags.Add(new QuestionTag()
                {
                    QuestionId = this.QuestionId,
                    TagId = tag.TagId
                });
            }

            return questionTags;
        }
    }
}


