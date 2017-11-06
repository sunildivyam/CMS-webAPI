'use strict';
/*
*	Comment
*	Description
*	Comment model is for content entity.
*/

(function() {
	var Comment = function(EntityMapper, User) {
		function Comment(raw) {
			if (raw instanceof Object) {				
				this.commentId = raw.CommentId;
				this.contentId = raw.ContentId;
				this.quizId = raw.QuizId;
				this.questionId = raw.QuestionId;
				this.description = raw.Description;				
				this.postedDate = raw.PostedDate ? new Date(raw.PostedDate) : undefined;
				this.owner = new User(raw.Owner);
			}
		}

		Comment.prototype = {			
		};
		return Comment;
	};

	Comment.$inject = ['EntityMapper', 'User'];
	module.exports = Comment;
})();
