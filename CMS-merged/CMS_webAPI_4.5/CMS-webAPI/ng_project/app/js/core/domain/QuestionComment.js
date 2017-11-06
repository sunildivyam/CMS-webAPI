'use strict';
/*
*	QuestionComment
*	Description
*	QuestionComment model is for Question entity.
*/

(function() {
	var QuestionComment = function(EntityMapper, User) {
		function QuestionComment(raw) {
			if (raw instanceof Object) {				
				this.commentId = raw.QuestionCommentId;
				this.questionId = raw.QuestionId;
				this.description = raw.Description;				
				this.postedDate = raw.PostedDate ? new Date(raw.PostedDate) : undefined;
                this.owner = new User(raw.Owner);
                
                // Navigation
                this.questions = [];
			}
		}

		QuestionComment.prototype = {			
		};
		return QuestionComment;
	};

	QuestionComment.$inject = ['EntityMapper', 'User'];
	module.exports = QuestionComment;
})();
