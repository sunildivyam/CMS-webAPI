'use strict';
/*
*	dashboardController
*	Description
*	dashboardController controls the dashboard page Level Scope Data.
*/

(function() {
	var dashboardController = function($rootScope, $scope, $state, servicesService, dashboardService, technologiesService, metaInformationService, pageTitleService) {
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
			$scope.relateddashboard = {};
			$scope.relatedServices = {};
			$scope.relatedTechnologies = {};

			if (currentStateName) {
				dashboardService.getArticleByStateName(currentStateName).then(function(article) {
					if (article instanceof Object) {
						$scope.currentArticle = article;
					} else {
						$scope.currentArticle = undefined;
					}
					setMetaInfo(article);
					loadRelateddashboard(article && article.relateddashboard);
					loadRelatedServices(article && article.relatedServices);
					loadRelatedTechnologies(article && article.relatedTechnologies);
				}, function() {
					setMetaInfo();
					$scope.currentArticle = undefined;
					loadRelateddashboard(null);
					loadRelatedServices(null);
					loadRelatedTechnologies(null);
				});
			}
		}

		function loadRelateddashboard(articleIds) {
			if(articleIds instanceof Array && articleIds.length > 0) {
				dashboardService.getdashboardByIds(articleIds).then(function(dashboard) {
					$scope.relateddashboard = dashboard;
				});
			} else {
				$scope.relateddashboard = undefined;
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

	dashboardController.$inject = ['$rootScope', '$scope', '$state', 'servicesService', 'dashboardService', 'technologiesService', 'metaInformationService', 'pageTitleService'];
	module.exports = dashboardController;
})();
