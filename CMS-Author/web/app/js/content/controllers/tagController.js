'use strict';
/*
*	tagController
*	Description
*	tagController controls the content page Level Scope Data.
*/

(function() {
	var tagController = function($rootScope, $scope, $state, appService, contentService, modalService, Tag) {
		$scope.currentTag = new Tag();

		function getTag(id) {
			if (id) {
				$scope.isLoading = true;
				$scope.loaderMsg = 'Loading Tag...';
				var tagId = parseInt(id);
				contentService.getTagById(tagId).then(function(response) {
					var tag = new Tag(response && response.data);
					$scope.isLoading = false;
					$scope.loaderMsg = '';
					if (tag instanceof Object) {
						$scope.currentTag = tag;
					} else {
						modalService.alert('md',
						'Tag Not Found',
						'Tag with Id: ' + id + ' not found',
						'Go to Dashboard').result.then(function() {
							$state.go('author.dashboard');
						});
					}
				}, function(rejection) {
					$scope.isLoading = false;
					$scope.loaderMsg = '';
					modalService.alert('md',
					'Tag loading Failed',
					'Reason/s: ' + (appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') || 'Tag Not Found.') ,
					'Go to Dashboard').result.then(function() {
						$state.go('author.dashboard');
					});
				});
			}
		}

		$scope.saveTag = function(event, tag) {
			$scope.isLoading = true;
			$scope.loaderMsg = 'Saving Tag...';
			contentService.addNewTag(tag).then(function(response) {
				var addedTag = new Tag(response && response.data);
				$scope.isLoading = false;
				$scope.loaderMsg = '';
				modalService.alert('md',
				'Tag Saved',
				'Tag saved successfully',
				'Go to Dashboard',
				'Continue..').result.then(function() {
					$state.go('author.dashboard');
				}, function() {
					$state.go('author.tag', {id: addedTag.tagId});
				});
			}, function(rejection) {
				$scope.isLoading = false;
				$scope.loaderMsg = '';
				modalService.alert('md',
				'Tag Saving Failed',
				'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
				'try Again');
			});
		};

		$scope.updateTag = function(event, tag) {
			$scope.isLoading = true;
			$scope.loaderMsg = 'Updating Tag...';
			contentService.updateTag(tag).then(function(response) {
				var updatedTag = new Tag(response && response.data);
				$scope.isLoading = false;
				$scope.loaderMsg = '';
				modalService.alert('md',
				'Tag Update',
				'Tag Updated successfully',
				'Go to Dashboard',
				'Continue..').result.then(function() {
					$state.go('author.dashboard');
				}, function() {
					$state.go('author.tag', {id: updatedTag.tagId});
				});
			}, function(rejection) {
				$scope.isLoading = false;
				$scope.loaderMsg = '';
				modalService.alert('md',
				'Tag Update Failed',
				'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
				'try Again');
			});
		};

		$scope.deleteTag = function(event, tag) {
			$scope.isLoading = true;
			$scope.loaderMsg = 'Deleting Tag...';
			contentService.deleteTag(tag && tag.tagId).then(function(response) {
				var updatedTag = new Tag(response && response.data);
				$scope.isLoading = false;
				$scope.loaderMsg = '';
				modalService.alert('md',
				'Tag Delete',
				'Following Tag Deleted successfully: <br/>' + updatedTag.title + '(' + updatedTag.tagId + ')',
				'Go to Dashboard').result.then(function() {
					$state.go('author.dashboard');
				});
			}, function(rejection) {
				$scope.isLoading = false;
				$scope.loaderMsg = '';
				modalService.alert('md',
				'Tag Delete Failed',
				'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
				'try Again');
			});
		};

		$scope.cancelTag = function(event, tag) {
			$state.go('.', {id: tag && tag.tagId}, {reload: true});
		};

		$scope.addnewTag = function() {
			$state.go('.', {id: ''}, {reload: true});
		};

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams/*, fromState , fromParams*/) {
			if (toState && toState.name && toParams && toParams.id) {
				getTag(toParams.id);
			} else {
				$scope.currentTag = new Tag();
			}
		});
	};

	tagController.$inject = ['$rootScope', '$scope', '$state', 'appService', 'contentService', 'modalService', 'Tag'];
	module.exports = tagController;
})();
