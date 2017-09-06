'use strict';
/*
*	commentController
*	Description
*	commentController controls the content page Level Scope Data.
*/

(function() {
	var commentController = function($rootScope, $scope, $state, $stateParams, $timeout, appService, pubcontentService, modalService, Comment, EntityMapper, CkEditorService, accountService) {
		$scope.comment = new Comment();

		function loadUnsavedComment() {
			var unsavedCommentInfo = accountService.getReturnState();
			if (unsavedCommentInfo && unsavedCommentInfo.stateName === $state.$current.name && angular.equals(unsavedCommentInfo.stateParams, $stateParams)) {
				$scope.comment = unsavedCommentInfo.stateData && unsavedCommentInfo.stateData;
				accountService.setReturnState();
			}
		}

		function getCommentsOfContent(contentId) {
			if (contentId) {
				$scope.isLoading = true;
				$scope.loaderMsg = 'Loading Comments...';				
				pubcontentService.getCommentsByContentId(contentId).then(function(response) {
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
			$scope.comment.contentId = $scope.content.contentId;
			$scope.comment.postedDate = new Date();			
			$scope.isLoading = true;
			$scope.loaderMsg = 'Posting your Comment...';
			pubcontentService.addComment($scope.comment).then(function(response) {
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
			if (newContent && newContent.contentId) {
				getCommentsOfContent(newContent.contentId);
			}
		});

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
