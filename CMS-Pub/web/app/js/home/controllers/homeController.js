'use strict';
/*
*	homeController
*	Description
*	homeController controls the Home page Level Scope Data.
*/

(function() {
	var homeController = function($scope, $rootScope, appHeaderService, servicesService, metaInformationService, pageTitleService) {
		resetCarousel();
		function resetCarousel() {
			$scope.homeCarousel = {
				"slides": [],
				"options": {}
			};
		}

		appHeaderService.getMainCarousel().then(function(mainCarousel) {
			if (mainCarousel instanceof Object) {
				servicesService.getServicesByIds(mainCarousel.slides).then(function(slidesObjs) {
					if (slidesObjs instanceof Array) {
						$scope.homeCarousel.slides = slidesObjs;
						$scope.homeCarousel.options = angular.copy(mainCarousel.options);
					} else {
						resetCarousel();
					}
				}, function() {
					resetCarousel();
				});
			} else {
				resetCarousel();
			}
		}, function() {
			resetCarousel();
		});

		function setMetaInfo(homeNav) {
			if (homeNav instanceof Object) {
				metaInformationService.setMetaDescription(homeNav.description);
				metaInformationService.setMetaKeywords(homeNav.keywords);
				pageTitleService.setPageTitle(homeNav.title);
			} else {
				metaInformationService.resetMetaDescription();
				metaInformationService.resetMetaKeywords();
				pageTitleService.setPageTitle();
			}
		}

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState /*, fromParams*/) {
			if (toState && toState.name && (fromState && fromState.name !== toState.name)) {
				var homeNav = $scope.getFirstLevelNavItemByStateName(toState.name);
				setMetaInfo(homeNav);
			}
		});
	};

	homeController.$inject = ['$scope', '$rootScope', 'appHeaderService', 'servicesService', 'metaInformationService', 'pageTitleService'];
	module.exports = homeController;
})();
