'use strict';
/*
*	Quiz
*	Description
*	Quiz model is for Quiz entity.
*/

(function() {
	var Quiz = function(EntityMapper, Tag, User, Question, QuizComment) {
		function Quiz(raw) {
			if (raw instanceof Object) {
				this.quizId = raw.QuizId;	
				this.name = raw.Name;
				this.title = raw.Title;			
				this.description = raw.Description;
				this.questionIds = raw.QuestionIds;
				this.questions = new EntityMapper(Question).toEntities(raw.Questions);	//Array of Question Object				
				this.authorId = raw.AuthorId;
				this.author = new User(raw.Author);
				this.tags = new EntityMapper(Tag).toEntities(raw.Tags);
				this.createdDate = raw.CreatedDate ? new Date(raw.CreatedDate) : undefined;
				this.updatedDate = raw.UpdatedDate ? new Date(raw.UpdatedDate) : undefined;
				this.updateCount = raw.UpdateCount;
				this.visitCount = raw.VisitCount;
				this.isLive = raw.IsLive;
				this.comments = new EntityMapper(QuizComment).toEntities(raw.Comments);	
			}
		}

		Quiz.prototype = {			
		};
		return Quiz;
	};

	Quiz.$inject = ['EntityMapper', 'Tag', 'User', 'Question', 'QuizComment'];
	module.exports = Quiz;
})();
