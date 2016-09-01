'use strict';
/*
*	technologiesController
*	Description
*	technologiesController controls the Articles page Level Scope Data.
*/

(function() {
	var technologiesController = function($rootScope, $scope, $state, servicesService, technologiesService, articlesService, metaInformationService, pageTitleService) {
		function setMetaInfo(technology) {
			if (technology instanceof Object) {
				metaInformationService.setMetaDescription(technology.shortDescription);
				metaInformationService.setMetaKeywords(technology.tags);
				pageTitleService.setPageTitle(technology.name);
			} else {
				metaInformationService.resetMetaDescription();
				metaInformationService.resetMetaKeywords();
				pageTitleService.setPageTitle();
			}
		}

		function loadTechnologyForCurrentState(currentStateName) {
			$scope.currentTechnology = {};
			$scope.relatedArticles = {};
			$scope.relatedServices = {};
			$scope.relatedTechnologies = {};

			if (currentStateName) {
				technologiesService.getTechnologyByStateName(currentStateName).then(function(technology) {
					if (technology instanceof Object) {
						$scope.currentTechnology = technology;
					} else {
						$scope.currentTechnology = undefined;
					}
					setMetaInfo(technology);
					loadRelatedTechnologies(technology && technology.relatedTechnologies);
					loadRelatedServices(technology && technology.relatedServices);
					loadRelatedArticles(technology && technology.relatedArticles);
				}, function() {
					setMetaInfo();
					$scope.currenttechnology = undefined;
					loadRelatedTechnologies(null);
					loadRelatedServices(null);
					loadRelatedArticles(null);
				});
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

		function loadRelatedArticles(articleIds) {
			if(articleIds instanceof Array && articleIds.length > 0) {
				articlesService.getArticlesByIds(articleIds).then(function(articles) {
					$scope.relatedArticles = articles;
				});
			} else {
				$scope.relatedArticles = undefined;
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

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState /*, fromParams*/) {
			if (toState && toState.name && (fromState && fromState.name !== toState.name)) {
				loadTechnologyForCurrentState(toState.name);
			}
		});
	};

	technologiesController.$inject = ['$rootScope', '$scope', '$state', 'servicesService', 'technologiesService', 'articlesService', 'metaInformationService', 'pageTitleService'];
	module.exports = technologiesController;
})();
