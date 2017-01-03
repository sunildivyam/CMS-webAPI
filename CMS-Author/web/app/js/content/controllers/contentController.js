'use strict';
/*
*	contentController
*	Description
*	contentController controls the content page Level Scope Data.
*/

(function() {
	var contentController = function($rootScope, $scope, $state, appService, contentService, modalService, Content, Tag, Category, EntityMapper, metaInformationService, pageTitleService) {
		$scope.currentContent = new Content();

		getTags();
		getCategories();

		function setMetaInfo(content) {
			if (content instanceof Object) {
				metaInformationService.setMetaDescription(content.description);
				metaInformationService.setMetaKeywords(content.name);
				pageTitleService.setPageTitle(content.title);
			} else {
				metaInformationService.resetMetaDescription();
				metaInformationService.resetMetaKeywords();
				pageTitleService.setPageTitle();
			}
		}

		function getTags() {
			contentService.getTags().then(function(response) {
				var tags = new EntityMapper(Tag).toEntities(response.data);

				if (tags instanceof Array && tags.length > 0) {
					$scope.tags = tags;
				} else {
					modalService.alert('md',
					'No Content Tags',
					'No content Tags Available <br> Please add One or more tags',
					'Add Tags').result.then(function() {
						$state.go('author.tag');
					});
				}
			}, function(rejection) {
				modalService.alert('md',
				'Content Tags Load Failed',
				'Reason/s: ' + (appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') || 'Unknown') ,
				'Go to Dashboard').result.then(function() {
					$state.go('author.dashboard');
				});
			});
		}

		function getCategories() {
			contentService.getCategories().then(function(response) {
				var categories = new EntityMapper(Category).toEntities(response.data);

				if (categories instanceof Array && categories.length > 0) {
					$scope.categories = categories;
				} else {
					modalService.alert('md',
					'No Content Categories',
					'No content Categories Available <br> Please add One or more categories',
					'Add Categories').result.then(function() {
						$state.go('author.category');
					});
				}
			}, function(rejection) {
				modalService.alert('md',
				'Content Categories Load Failed',
				'Reason/s: ' + (appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') || 'Unknown') ,
				'Go to Dashboard').result.then(function() {
					$state.go('author.dashboard');
				});
			});
		}

		function getContent(id) {
			if (id) {
				var contentId = parseInt(id);
				contentService.getContentById(contentId).then(function(response) {
					var content = new Content(response && response.data);

					if (content instanceof Object) {
						if (content.authorContentId !== contentId) {
							modalService.alert('md',
							'Already Exist for Authoring',
							'You have already taken this for Authoring.',
							'Open Drafted Content', 'Go to Dashboard').result.then(function() {
								$state.go('.', {id: content.authorContentId}, {notify: false});
							}, function() {
								$state.go('author.dashboard');
							});
						}
						$scope.currentContent = content;
						setMetaInfo($scope.currentContent);
					} else {
						modalService.alert('md',
						'Content Not Found',
						'Content with Id: ' + id + ' not found',
						'Go to Dashboard').result.then(function() {
							$state.go('author.dashboard');
						});
					}
				}, function(rejection) {
					modalService.alert('md',
					'Content loading Failed',
					'Reason/s: ' + (appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') || 'Content Not Found.') ,
					'Go to Dashboard').result.then(function() {
						$state.go('author.dashboard');
					});
				});
			}
		}

		$scope.saveContent = function(event, content) {
			if (content && content.contentId > 0) {
				content.publishedDate = undefined;
			}

			contentService.addNewContent(content).then(function(response) {
				var addedContent = new Content(response && response.data);

				modalService.alert('md',
				'Content Saved',
				'Content saved successfully',
				'Go to Dashboard',
				'Continue..').result.then(function() {
					$state.go('author.dashboard');
				}, function() {
					$state.go('author.content', {id: addedContent.authorContentId});
				});
			}, function(rejection) {
				modalService.alert('md',
				'Content Saving Failed',
				'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
				'try Again');
			});
		};

		$scope.updateContent = function(event, content) {
			contentService.updateContent(content).then(function(response) {
				var updatedContent = new Content(response && response.data);

				modalService.alert('md',
				'Content Update',
				'Content Updated successfully',
				'Go to Dashboard',
				'Continue..').result.then(function() {
					$state.go('author.dashboard');
				}, function() {
					$state.go('author.content', {id: updatedContent.authorContentId}, {
						reload: true
					});
				});
			}, function(rejection) {
				modalService.alert('md',
				'Content Update Failed',
				'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
				'try Again');
			});
		};

		$scope.deleteContent = function(event, content) {
			contentService.deleteContent(content && content.authorContentId).then(function(response) {
				var deletedContent = new Content(response && response.data);

				modalService.alert('md',
				'Content Delete',
				'Following Content Deleted successfully: <br/>' + deletedContent.title + '(' + deletedContent.authorContentId + ')',
				'Go to Dashboard').result.then(function() {
					$state.go('author.dashboard');
				});
			}, function(rejection) {
				modalService.alert('md',
				'Content Delete Failed',
				'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
				'try Again');
			});
		};

		$scope.cancelContent = function(event, content) {
			$state.go('.', {id: content && content.authorContentId}, {reload: true});
		};

		$scope.addnewContent = function() {
			$state.go('.', {id: ''}, {reload: true});
		};

		$scope.previewContent = function(event, content) {
			modalService.showContentPreviewModal(content);
		};

		$scope.publishContent = function(event, content) {
			contentService.publishContent(content).then(function(response) {
				var publishedContent = new Content(response && response.data);

				modalService.alert('md',
				'Content Published',
				'Following Content Published successfully: <br/>' + publishedContent.title + '(' + publishedContent.contentId + ')',
				'Go to Dashboard').result.then(function() {
					$state.go('author.dashboard');
				});
			}, function(rejection) {
				modalService.alert('md',
				'Content Publish Failed',
				'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
				'try Again');
			});
		};

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams/*, fromState , fromParams*/) {
			if (toState && toState.name && toParams && toParams.id) {
				getContent(toParams.id);
			} else {
				$scope.currentContent = new Content();
			}
		});
	};

	contentController.$inject = ['$rootScope', '$scope', '$state', 'appService', 'contentService', 'modalService', 'Content', 'Tag', 'Category', 'EntityMapper', 'metaInformationService', 'pageTitleService'];
	module.exports = contentController;
})();
