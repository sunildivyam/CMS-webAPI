'use strict';
/*
*	dashboardController
*	Description
*	dashboardController controls the dashboard page Level Scope Data.
*/

(function() {
	var dashboardController = function($rootScope, $scope, $state, $timeout, metaInformationService, pageTitleService, contentService, EntityMapper, Content, Category, Tag, modalService) {
		// function setMetaInfo(article) {
		// 	if (article instanceof Object) {
		// 		metaInformationService.setMetaDescription(article.shortDescription);
		// 		metaInformationService.setMetaKeywords(article.tags);
		// 		pageTitleService.setPageTitle(article.name);
		// 	} else {
		// 		metaInformationService.resetMetaDescription();
		// 		metaInformationService.resetMetaKeywords();
		// 		pageTitleService.setPageTitle();
		// 	}
		// }

		$scope.getDraftedContents = function() {
			contentService.getDraftedContents().then(function(response) {
				var contents = new EntityMapper(Content).toEntities(response.data);
				$scope.draftedContents = contents;
			}, function() {
				$scope.draftedContents = new EntityMapper(Content).toEntities([]);
			});
		};

		$scope.getAvailableCategories = function() {
			contentService.getCategories().then(function(response) {
				var categories = new EntityMapper(Category).toEntities(response.data);
				$scope.availableCategories = categories;
			}, function() {
				$scope.availableCategories = new EntityMapper(Category).toEntities([]);
			});
		};

		$scope.getAvailableTags = function() {
			contentService.getTags().then(function(response) {
				var tags = new EntityMapper(Tag).toEntities(response.data);
				$scope.availableTags = tags;
			}, function() {
				$scope.availableTags = new EntityMapper(Tag).toEntities([]);
			});
		};

		$scope.getAvailablePublishedContents = function() {
			contentService.getPublishedContents().then(function(response) {
				var contents = new EntityMapper(Content).toEntities(response.data);
				$scope.publishedContents = contents;
			}, function() {
				$scope.publishedContents = new EntityMapper(TaContentg).toEntities([]);
			});
		};

		$scope.onDraftedContentSelect = function(event, content) {
			if(content instanceof Object) {
				$state.go('author.content', {id: content.authorContentId});
			}
		};

		$scope.onCategoriesSelect = function(event, category) {
			if(category instanceof Object) {
				$state.go('author.category', {id: category.categoryId});
			}
		};

		$scope.onTagsSelect = function(event, tag) {
			if(tag instanceof Object) {
				$state.go('author.tag', {id: tag.tagId});
			}
		};

		$scope.onPublishedContentSelect = function(event, content) {
			var contentHistory = new EntityMapper(Content).toEntities();
			if (content && content.authorContentId) {
				contentService.getContentAuthoringHistory(content.contentId).then(function(response) {
					contentHistory = new EntityMapper(Content).toEntities(response.data);
					$scope.contentHistoryModal = modalService.showContentHistoryModal(contentHistory, 'lg', $scope.onHistoryContentSelect);
				}, function() {
					contentHistory = new EntityMapper(Content).toEntities();
					$scope.contentHistoryModal = modalService.showContentHistoryModal(contentHistory, 'lg', $scope.onHistoryContentSelect);
				});
			}
		};

		$scope.onHistoryContentSelect = function(event, content) {
			if(content instanceof Object && $scope.contentHistoryModal && $scope.contentHistoryModal.close) {
				$scope.contentHistoryModal.close();
				$state.go('author.content', {id: content.authorContentId});
			}
		};
		$scope.onListsRefresh = function(event) {
			$scope.refreshIsotopeLayout();
		};

		$scope.refreshIsotopeLayout =  function(elm) {
			if (!$scope.iso) {
				if (elm) {
					$scope.iso = new Isotope(elm, {
		                "itemSelector": ".grid-item"
		            });
				}
			} else {
				$timeout(function() {
					$scope.iso.layout();
				});
			}
		};

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState /*, fromParams*/) {
			if (toState && toState.name && (fromState && fromState.name !== toState.name)) {
				$scope.iso = undefined;
				$scope.getDraftedContents();
				$scope.getAvailableCategories();
				$scope.getAvailableTags();
				$scope.getAvailablePublishedContents();
			}
		});
	};

	dashboardController.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'metaInformationService', 'pageTitleService', 'contentService', 'EntityMapper', 'Content', 'Category', 'Tag', 'modalService'];
	module.exports = dashboardController;
})();
