using CMS_webAPI.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CMS_webAPI.AppCode
{
    public class QuizService
    {
        public static void AddQuizBasicInfo(Quiz quiz, string authorId, CmsDbContext db)
        {
            setQuizDefaults(quiz, authorId);
            db.Quizs.Add(quiz);
        }

        public static void UpdateQuizBasicInfo(Quiz quiz, Quiz originalQuiz, string authorId, CmsDbContext db)
        {
            var quizEntry = db.Entry(originalQuiz);
            quizEntry.State = EntityState.Unchanged;

            setQuizDefaults(originalQuiz, authorId);
            originalQuiz.Name = quiz.Name;
            originalQuiz.Title = quiz.Title;
            originalQuiz.Description = quiz.Description;

            ////Propertis to Update
            quizEntry.Property(x => x.Name).IsModified = true;
            quizEntry.Property(x => x.Title).IsModified = true;
            quizEntry.Property(x => x.Description).IsModified = true;
            quizEntry.Property(x => x.UpdatedDate).IsModified = true;
            quizEntry.Property(x => x.IsLive).IsModified = true;
            quizEntry.Property(x => x.AuthorId).IsModified = true; 
        }

        public static void UpdateQuizTags(Quiz quiz, Quiz originalQuiz, string authorId, CmsDbContext db)
        {                       
            var quizEntry = db.Entry(originalQuiz);
            quizEntry.State = EntityState.Unchanged;

            setQuizDefaults(originalQuiz, authorId);

            List<int> selectedTagIds = quiz.Tags.Select(t => t.TagId).ToList<int>();
            List<int> originalTagIds = originalQuiz.Tags.Select(t => t.TagId).ToList<int>();

            /* 1- Find deleted Tags from Quiz */
            List<Tag> deletedTags = originalQuiz.Tags.Where(t => !selectedTagIds.Contains(t.TagId)).ToList();

            /* 2- Find Added Tags in Quiz' */
            var addedTags = quiz.Tags.Where(t => !originalTagIds.Contains(t.TagId)).ToList();

            deletedTags.ForEach(t => originalQuiz.Tags.Remove(t));

            foreach (Tag t in addedTags)
            {
                if (db.Entry(t).State == EntityState.Detached)
                {
                    db.Tags.Attach(t);
                }

                originalQuiz.Tags.Add(t);
            }
            // Properties to update            
            quizEntry.Property(x => x.UpdatedDate).IsModified = true;
            quizEntry.Property(x => x.IsLive).IsModified = true;
            quizEntry.Property(x => x.AuthorId).IsModified = true;
        }

        public static void UpdateQuizQuestions(Quiz quiz, Quiz originalQuiz, string authorId, CmsDbContext db)
        {
            var quizEntry = db.Entry(originalQuiz);
            quizEntry.State = EntityState.Unchanged;

            setQuizDefaults(originalQuiz, authorId);
            originalQuiz.QuestionIds = quiz.QuestionIds;

            List<int> selectedQuestionIds = quiz.Questions.Select(t => t.QuestionId).ToList<int>();
            List<int> originalQuestionIds = originalQuiz.Questions.Select(t => t.QuestionId).ToList<int>();

            /* 1- Find deleted Questions from Quiz */
            List<Question> deletedQuestions = originalQuiz.Questions.Where(t => !selectedQuestionIds.Contains(t.QuestionId)).ToList();

            /* 2- Find Added Questions in Quiz' */
            var addedQuestions = quiz.Questions.Where(t => !originalQuestionIds.Contains(t.QuestionId)).ToList();

            deletedQuestions.ForEach(t => originalQuiz.Questions.Remove(t));

            foreach (Question q in addedQuestions)
            {
                if (q.QuestionId == 0)
                {
                    AddQuestion(q, authorId, db);
                    if (db.Entry(q).State == EntityState.Detached)
                    {
                        db.Questions.Attach(q);
                    }
                }
                else
                {
                    q.Tags = new List<Tag>();
                    if (db.Entry(q).State == EntityState.Detached)
                    {
                        db.Questions.Attach(q);
                    }
                }                

                originalQuiz.Questions.Add(q);
            }            
            
            // Properties to update            
            quizEntry.Property(x => x.UpdatedDate).IsModified = true;
            quizEntry.Property(x => x.IsLive).IsModified = true;
            quizEntry.Property(x => x.AuthorId).IsModified = true;
            quizEntry.Property(x => x.QuestionIds).IsModified = true;
        }


        public static void AddQuestion(Question question, string authorId, CmsDbContext db)
        {
            setQuestionDefaults(question, authorId);
            // Add Tags              

            foreach (Tag t in question.Tags)
            {
                if (db.Entry(t).State == EntityState.Detached)
                {
                    db.Tags.Attach(t);
                }

                question.Tags.Add(t);
            }

            db.Questions.Add(question);  
            
        }


        public static void UpdateQuestion(Question question, Question originalQuestion, string authorId, CmsDbContext db)
        {
            var questionEntry = db.Entry(originalQuestion);
            questionEntry.State = EntityState.Modified;

            setQuestionDefaults(originalQuestion, authorId);
            originalQuestion.Description = question.Description;
            originalQuestion.Answer = question.Answer;
            originalQuestion.AnswerDescription = question.AnswerDescription;
            originalQuestion.OptionA = question.OptionA;
            originalQuestion.OptionB = question.OptionB;
            originalQuestion.OptionC = question.OptionC;
            originalQuestion.OptionD = question.OptionD;

            // Add or Update Tags
            UpdateQuestionTags(question,originalQuestion, authorId, db);
            
            // Properties not to update            
            questionEntry.Property(x => x.CreatedDate).IsModified = false;
            questionEntry.Property(x => x.VisitCount).IsModified = false;
        }


        public static void UpdateQuestionTags(Question question, Question originalQuestion, string authorId, CmsDbContext db)
        {
            List<int> selectedTagIds = question.Tags.Select(t => t.TagId).ToList<int>();
            List<int> originalTagIds = originalQuestion.Tags.Select(t => t.TagId).ToList<int>();

            /* 1- Find deleted Tags from Question */
            List<Tag> deletedTags = originalQuestion.Tags.Where(t => !selectedTagIds.Contains(t.TagId)).ToList();

            /* 2- Find Added Tags in Question' */
            var addedTags = question.Tags.Where(t => !originalTagIds.Contains(t.TagId)).ToList();

            deletedTags.ForEach(t => originalQuestion.Tags.Remove(t));

            foreach (Tag t in addedTags)
            {
                if (db.Entry(t).State == EntityState.Detached)
                {
                    db.Tags.Attach(t);
                }

                originalQuestion.Tags.Add(t);
            }
        }

        public static void UpdateQuizLiveStatus(Quiz quiz, string authorId, CmsDbContext db, Boolean toStatus)
        {           
            var quizEntry = db.Entry(quiz);
            quizEntry.State = EntityState.Unchanged;

            setQuizDefaults(quiz, authorId);
            quiz.IsLive = toStatus;     //Makes Live or Offline

            // Properties to update            
            quizEntry.Property(x => x.UpdatedDate).IsModified = true;
            quizEntry.Property(x => x.IsLive).IsModified = true;
            quizEntry.Property(x => x.AuthorId).IsModified = true;
        }

        
        public static void setQuizDefaults(Quiz quiz, string authorId)
        {
            quiz.AuthorId = authorId;
            quiz.UpdatedDate = DateTime.Now;
            quiz.IsLive = false;

            if (quiz.QuizId <= 0)
            {
                quiz.CreatedDate = DateTime.Now;
                quiz.UpdateCount = 1;
                quiz.VisitCount = 1; 
            }
        }

        public static void setQuestionDefaults(Question question, string authorId)
        {
            question.AuthorId = authorId;
            question.UpdatedDate = DateTime.Now;
            question.IsLive = true;

            if (question.QuestionId == 0)
            {
                question.CreatedDate = DateTime.Now;
                question.UpdateCount = 1;
                question.VisitCount = 1;                
            }            
        }


        /// GET LIVE Methods
        /// 

        public static List<Quiz> GetPagedData(IEnumerable<Quiz> quizsEnums, int pageNo, int pageSize, string sortField, bool sortDirAsc)
        {
            List<Quiz> quizs = new List<Quiz>();
            if (quizsEnums == null)
            {
                return quizs;
            }

            int skipSize = ((pageNo) * pageSize);

            if (sortDirAsc == true)
            {
                quizs = quizsEnums.OrderBy(c => c.GetType().GetProperty(sortField).GetValue(c, null))
                .Skip(skipSize)
                .Take(pageSize)
                .ToList();
            }
            else
            {
                quizs = quizsEnums.OrderByDescending(c => c.GetType().GetProperty(sortField).GetValue(c, null))
                .Skip(skipSize)
                .Take(pageSize)
                .ToList();
            }
            return quizs;
        }
                
    }
}