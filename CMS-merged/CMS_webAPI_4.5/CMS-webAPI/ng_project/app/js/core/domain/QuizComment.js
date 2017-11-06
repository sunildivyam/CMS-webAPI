'use strict';
/*
*	QuizComment
*	Description
*	QuizComment model is for Quiz entity.
*/

(function() {
	var QuizComment = function(EntityMapper, User) {
		function QuizComment(raw) {
			if (raw instanceof Object) {				
				this.commentId = raw.QuizCommentId;
				this.quizId = raw.QuizId;
				this.description = raw.Description;				
				this.postedDate = raw.PostedDate ? new Date(raw.PostedDate) : undefined;
                this.owner = new User(raw.Owner);
                
                // Navigation
                this.quizs = [];
			}
		}

		QuizComment.prototype = {			
		};
		return QuizComment;
	};

	QuizComment.$inject = ['EntityMapper', 'User'];
	module.exports = QuizComment;
})();
