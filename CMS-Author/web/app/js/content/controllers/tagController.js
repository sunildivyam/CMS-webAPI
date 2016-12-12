'use strict';
/*
*	tagController
*	Description
*	tagController controls the content page Level Scope Data.
*/

(function() {
	var tagController = function($rootScope, $scope, $state, appService, contentService, modalService, Tag, metaInformationService, pageTitleService) {
		$scope.currentTag = new Tag();

		function setMetaInfo(tag) {
			if (tag instanceof Object) {
				metaInformationService.setMetaDescription(tag.description);
				metaInformationService.setMetaKeywords(tag.name);
				pageTitleService.setPageTitle(tag.title);
			} else {
				metaInformationService.resetMetaDescription();
				metaInformationService.resetMetaKeywords();
				pageTitleService.setPageTitle();
			}
		}

		function getTag(id) {
			if (id) {
				var tagId = parseInt(id);
				contentService.getTagById(tagId).then(function(response) {
					var tag = new Tag(response && response.data);
					if (tag instanceof Object) {
						$scope.currentTag = tag;
						setMetaInfo($scope.currentTag);
					} else {
						modalService.alert('md',
						'Tag Not Found',
						'Tag with Id: ' + id + ' not found',
						'Go to Dashboard').result.then(function() {
							$state.go('dashboard');
						});
					}
				}, function(rejection) {
					modalService.alert('md',
					'Tag loading Failed',
					'Reason/s: ' + (appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') || 'Tag Not Found.') ,
					'Go to Dashboard').result.then(function() {
						$state.go('dashboard');
					});
				});
			}
		}

		$scope.saveTag = function(event, tag) {
			contentService.addNewTag(tag).then(function(response) {
				var addedTag = new Tag(response && response.data);

				modalService.alert('md',
				'Tag Saved',
				'Tag saved successfully',
				'Go to Dashboard',
				'Continue..').result.then(function() {
					$state.go('dashboard');
				}, function() {
					$state.go('tag', {id: addedTag.tagId});
				});
			}, function(rejection) {
				modalService.alert('md',
				'Tag Saving Failed',
				'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
				'try Again');
			});
		};

		$scope.updateTag = function(event, tag) {
			contentService.updateTag(tag).then(function(response) {
				var updatedTag = new Tag(response && response.data);

				modalService.alert('md',
				'Tag Update',
				'Tag Updated successfully',
				'Go to Dashboard',
				'Continue..').result.then(function() {
					$state.go('dashboard');
				}, function() {
					$state.go('tag', {id: updatedTag.tagId});
				});
			}, function(rejection) {
				modalService.alert('md',
				'Tag Update Failed',
				'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
				'try Again');
			});
		};

		$scope.deleteTag = function(event, tag) {
			contentService.deleteTag(tag && tag.tagId).then(function(response) {
				var updatedTag = new Tag(response && response.data);

				modalService.alert('md',
				'Tag Delete',
				'Following Tag Deleted successfully: <br/>' + updatedTag.title + '(' + updatedTag.tagId + ')',
				'Go to Dashboard').result.then(function() {
					$state.go('dashboard');
				});
			}, function(rejection) {
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

	tagController.$inject = ['$rootScope', '$scope', '$state', 'appService', 'contentService', 'modalService', 'Tag', 'metaInformationService', 'pageTitleService'];
	module.exports = tagController;
})();
