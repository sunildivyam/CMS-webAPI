'use strict';
/*
*	contentController
*	Description
*	contentController controls the content page Level Scope Data.
*/

(function() {
	var contentController = function($rootScope, $scope, $state, servicesService, contentService, technologiesService, metaInformationService, pageTitleService) {
		function setMetaInfo(article) {
			if (article instanceof Object) {
				metaInformationService.setMetaDescription(article.shortDescription);
				metaInformationService.setMetaKeywords(article.tags);
				pageTitleService.setPageTitle(article.name);
			} else {
				metaInformationService.resetMetaDescription();
				metaInformationService.resetMetaKeywords();
				pageTitleService.setPageTitle();
			}
		}

		function loadArticleForCurrentState(currentStateName) {
			$scope.currentArticle = {};
			$scope.relatedcontent = {};
			$scope.relatedServices = {};
			$scope.relatedTechnologies = {};

			if (currentStateName) {
				contentService.getArticleByStateName(currentStateName).then(function(article) {
					if (article instanceof Object) {
						$scope.currentArticle = article;
					} else {
						$scope.currentArticle = undefined;
					}
					setMetaInfo(article);
					loadRelatedcontent(article && article.relatedcontent);
					loadRelatedServices(article && article.relatedServices);
					loadRelatedTechnologies(article && article.relatedTechnologies);
				}, function() {
					setMetaInfo();
					$scope.currentArticle = undefined;
					loadRelatedcontent(null);
					loadRelatedServices(null);
					loadRelatedTechnologies(null);
				});
			}
		}

		function loadRelatedcontent(articleIds) {
			if(articleIds instanceof Array && articleIds.length > 0) {
				contentService.getcontentByIds(articleIds).then(function(content) {
					$scope.relatedcontent = content;
				});
			} else {
				$scope.relatedcontent = undefined;
			}
		}

		function loadRelatedServices(serviceIds) {
			if(serviceIds instanceof Array && serviceIds.length > 0) {
				servicesService.getServicesByIds(serviceIds).then(function(services) {
					$scope.relatedServices = services;
				});
			} else {
				$scope.relatedServices = undefined;
			}
		}

		function loadRelatedTechnologies(technologyIds) {
			if(technologyIds instanceof Array && technologyIds.length > 0) {
				technologiesService.getTechnologiesByIds(technologyIds).then(function(technologies) {
					$scope.relatedTechnologies = technologies;
				});
			} else {
				$scope.relatedTechnologies = undefined;
			}
		}

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState /*, fromParams*/) {
			if (toState && toState.name && (fromState && fromState.name !== toState.name)) {
				loadArticleForCurrentState(toState.name);
			}
		});
	};

	contentController.$inject = ['$rootScope', '$scope', '$state', 'servicesService', 'contentService', 'technologiesService', 'metaInformationService', 'pageTitleService'];
	module.exports = contentController;
})();
