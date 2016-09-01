'use strict';
/*
*	servicesController
*	Description
*	servicesController controls the Services page Level Scope Data.
*/

(function() {
	var servicesController = function($rootScope, $scope, $state,servicesService, articlesService, technologiesService, metaInformationService, pageTitleService) {
		function setMetaInfo(service) {
			if (service instanceof Object) {
				metaInformationService.setMetaDescription(service.shortDescription);
				metaInformationService.setMetaKeywords(service.tags);
				pageTitleService.setPageTitle(service.name);
			} else {
				metaInformationService.resetMetaDescription();
				metaInformationService.resetMetaKeywords();
				pageTitleService.setPageTitle();
			}
		}

		function loadServiceForCurrentState(currentStateName) {
			$scope.currentService = {};
			$scope.relatedServices = {};
			$scope.relatedArticles = {};
			$scope.relatedTechnologies = {};

			if (currentStateName) {
				servicesService.getServiceByStateName(currentStateName).then(function(service) {
					if (service instanceof Object) {
						$scope.currentService = service;
					} else {
						$scope.currentService = undefined;
					}
					setMetaInfo(service);
					loadRelatedServices(service && service.relatedServices);
					loadRelatedArticles(service && service.relatedArticles);
					loadRelatedTechnologies(service && service.relatedTechnologies);
				}, function() {
					setMetaInfo();
					$scope.currentService = undefined;
					loadRelatedServices(null);
					loadRelatedArticles(null);
					loadRelatedTechnologies(null);
				});
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

		function loadRelatedArticles(articleIds) {
			if(articleIds instanceof Array && articleIds.length > 0) {
				articlesService.getArticlesByIds(articleIds).then(function(articles) {
					$scope.relatedArticles = articles;
				});
			} else {
				$scope.relatedArticles = undefined;
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
				loadServiceForCurrentState(toState.name);
			}
		});
	};

	servicesController.$inject = ['$rootScope', '$scope', '$state', 'servicesService', 'articlesService', 'technologiesService', 'metaInformationService', 'pageTitleService'];
	module.exports = servicesController;
})();
