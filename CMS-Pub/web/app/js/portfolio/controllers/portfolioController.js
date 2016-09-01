'use strict';
/*
*	portfolioController
*	Description
*	portfolioController controls the Portfolio page Level Scope Data.
*/

(function() {
	var portfolioController = function($rootScope, $scope, metaInformationService, pageTitleService) {
		function setMetaInfo(portfolioNav) {
			if (portfolioNav instanceof Object) {
				metaInformationService.setMetaDescription(portfolioNav.description);
				metaInformationService.setMetaKeywords(portfolioNav.keywords);
				pageTitleService.setPageTitle(portfolioNav.title);
			} else {
				metaInformationService.resetMetaDescription();
				metaInformationService.resetMetaKeywords();
				pageTitleService.setPageTitle();
			}
		}

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState /*, fromParams*/) {
			if (toState && toState.name && (fromState && fromState.name !== toState.name)) {
				var portfolioNav = $scope.getFirstLevelNavItemByStateName(toState.name);
				setMetaInfo(portfolioNav);
			}
		});
	};

	portfolioController.$inject = ['$rootScope', '$scope', 'metaInformationService', 'pageTitleService'];
	module.exports = portfolioController;
})();
