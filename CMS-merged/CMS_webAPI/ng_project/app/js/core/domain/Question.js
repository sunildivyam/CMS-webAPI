'use strict';
/*
*	Question
*	Description
*	Question model is for Question entity.
*/

(function() {
	var Question = function(EntityMapper, Tag, User, QuestionComment) {
		function Question(raw) {
			if (raw instanceof Object) {
				this.questionId = raw.QuestionId;				
				this.description = raw.Description;
				this.optionA = raw.OptionA;
				this.optionB = raw.OptionB;
				this.optionC = raw.OptionC;
				this.optionD = raw.OptionD;
				this.answer = raw.Answer;
				this.answerDescription = raw.AnswerDescription;
				this.author = new User(raw.Author);
				this.authorId = raw.AuthorId;
				this.tags = new EntityMapper(Tag).toEntities(raw.Tags);
				this.createdDate = raw.CreatedDate ? new Date(raw.CreatedDate) : undefined;
				this.updatedDate = raw.UpdatedDate ? new Date(raw.UpdatedDate) : undefined;
				this.updateCount = raw.UpdateCount;
				this.visitCount = raw.VisitCount;
				this.isLive = raw.IsLive;
				this.comments = new EntityMapper(QuestionComment).toEntities(raw.Comments);	
			}
		}

		Question.prototype = {			
		};
		return Question;
	};

	Question.$inject = ['EntityMapper', 'Tag', 'User', 'QuestionComment'];
	module.exports = Question;
})();
