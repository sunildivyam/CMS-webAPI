'use strict';
/*
*	dashboardController
*	Description
*	dashboardController controls the dashboard page Level Scope Data.
*/

(function() {
	var dashboardController = function($rootScope, $scope, $state, metaInformationService, pageTitleService, contentService, EntityMapper, Content, Category, Tag) {
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

		$scope.onDraftedContentSelect = function(event, content) {
			if(content instanceof Object) {
				$state.go('content', {id: content.authorContentId});
			}
		};

		$scope.onCategoriesSelect = function(event, category) {
			if(category instanceof Object) {
				$state.go('category', {id: category.categoryId});
			}
		};

		$scope.onTagsSelect = function(event, tag) {
			if(tag instanceof Object) {
				$state.go('tag', {id: tag.tagId});
			}
		};

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState /*, fromParams*/) {
			if (toState && toState.name && (fromState && fromState.name !== toState.name)) {
				$scope.getDraftedContents();
				$scope.getAvailableCategories();
				$scope.getAvailableTags();
			}
		});
	};

	dashboardController.$inject = ['$rootScope', '$scope', '$state', 'metaInformationService', 'pageTitleService', 'contentService', 'EntityMapper', 'Content', 'Category', 'Tag'];
	module.exports = dashboardController;
})();
