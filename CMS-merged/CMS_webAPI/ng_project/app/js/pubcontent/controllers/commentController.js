'use strict';
/*
*	commentController
*	Description
*	commentController controls the content page Level Scope Data.
*/

(function() {
	var commentController = function($rootScope, $scope, $state, $stateParams, $timeout, appService, pubcontentService, modalService, Comment, EntityMapper, CkEditorService, accountService) {
		$scope.comment = new Comment();
		var CONTENT_TYPES = {
			ARTICLE: 'article',
			QUIZ: 'quiz',
			QUESTION: 'question'
		};
		function loadUnsavedComment() {
			var unsavedCommentInfo = accountService.getReturnState();
			if (unsavedCommentInfo && unsavedCommentInfo.stateName === $state.$current.name && angular.equals(unsavedCommentInfo.stateParams, $stateParams)) {
				$scope.comment = unsavedCommentInfo.stateData && unsavedCommentInfo.stateData;
				accountService.setReturnState();
			}
		}

		function getCommentsOfContent(contentId, contentType) {
			if (contentId) {
				$scope.isLoading = true;
				$scope.loaderMsg = 'Loading Comments...';
				var getCommentsFn = getCommentsFnForContentType(contentType);				
				getCommentsFn(contentId).then(function(response) {
					$scope.currentComments = new EntityMapper(Comment).toEntities(response && response.data);
					$scope.isLoading = false;
					$scope.loaderMsg = '';
					loadUnsavedComment();			
				}, function(rejection) {
					$scope.isLoading = false;
					$scope.loaderMsg = '';
					$scope.currentComments = new EntityMapper(Comment).toEntities([]);
					loadUnsavedComment();
				});
			}
		}

		$scope.saveComment = function(event) {
			var contentType = getContentType($scope.content);	
			//Only one out of these three will be having value, and rest are nbot.
			$scope.comment.contentId = $scope.content.contentId; 
			$scope.comment.quizId = $scope.content.quizId; 
			$scope.comment.questionId = $scope.content.questionId;

			$scope.comment.ownerId = 0;
			$scope.comment.postedDate = new Date();			
			$scope.isLoading = true;
			$scope.loaderMsg = 'Posting your Comment...';
			var addCommentFn = addCommentFnForContentType(contentType);	
			addCommentFn($scope.comment).then(function(response) {
				var addedComment = new Comment(response && response.data);
				$scope.isLoading = false;
				$scope.loaderMsg = '';
				$scope.currentComments.push(addedComment);

				//reset
				$timeout(function(){
					$scope.comment = new Comment();	
				});															
			}, function(rejection) {
				$scope.isLoading = false;
				$scope.loaderMsg = '';
				modalService.alert('md',
				'Posting Comment Failed',
				'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
				'Try Again');
			});
		};

		$scope.getUserThumbnailUrl = function(userName) {
            if (userName) {
                return [appService.getUserImagesUrl(), userName].join('/');
            } else {
            	return '';
            }
        }

        $scope.goToLogin = function(event) {
        	// Saves  the unsaved Comment Text with details for retrieval.
        	accountService.setReturnStateData($scope.comment);
        	$state.go('login');
        };
        
        $scope.goToRegister = function(event) {
        	// Saves  the unsaved Comment Text with details for retrieval.
        	accountService.setReturnStateData($scope.comment);
        	$state.go('register');
        };

        $scope.isAnonymous = function() {
        	return accountService.isAnonymous();
        };

		$scope.$watch('content', function(newContent) {			
			if (newContent) {
				var id = newContent.contentId || newContent.quizId || newContent.questionId;
				if (id) {
					getCommentsOfContent(id, getContentType(newContent));
				}
			}
		});

		function getContentType(content) {
			if (content) {
				if (content.contentId) {
					return CONTENT_TYPES.ARTICLE;
				} else if (content.quizId) {
					return CONTENT_TYPES.QUIZ;
				} else if (content.questionId) {
					return CONTENT_TYPES.QUESTION;
				}
			}
			return CONTENT_TYPES.ARTICLE;
		}

		function getCommentsFnForContentType(contentType) {
			switch(contentType) {
				case CONTENT_TYPES.ARTICLE:
					return pubcontentService.getCommentsByContentId;
				case CONTENT_TYPES.QUIZ:
					return pubcontentService.getCommentsByQuizId;
				case CONTENT_TYPES.QUESTION:
					return pubcontentService.getCommentsByQuestionId;
			}

			return pubcontentService.getCommentsByContentId;
		}

		function addCommentFnForContentType(contentType) {
			switch(contentType) {
				case CONTENT_TYPES.ARTICLE:
					return pubcontentService.addComment;
				case CONTENT_TYPES.QUIZ:
					return pubcontentService.addQuizComment;
				case CONTENT_TYPES.QUESTION:
					return pubcontentService.addQuestionComment;
			}

			return pubcontentService.addComment;
		}

		$scope.$on("onCommentsListLoaded", function(event) {
            $timeout(function(){
				CkEditorService.updateCodeHighlight($('.comments-component .comments-list'));
				CkEditorService.updateMathJax();
			});
        });
	};

	commentController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'appService', 'pubcontentService', 'modalService', 'Comment', 'EntityMapper', 'CkEditorService', 'accountService'];
	module.exports = commentController;
})();
