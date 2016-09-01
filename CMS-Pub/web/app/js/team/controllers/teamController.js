'use strict';
/*
*	teamController
*	Description
*	teamController controls the team page Level Scope Data.
*/

(function() {
	var teamController = function($rootScope, $scope, metaInformationService, pageTitleService) {
		function setMetaInfo(teamNav) {
			if (teamNav instanceof Object) {
				metaInformationService.setMetaDescription(teamNav.description);
				metaInformationService.setMetaKeywords(teamNav.keywords);
				pageTitleService.setPageTitle(teamNav.title);
			} else {
				metaInformationService.resetMetaDescription();
				metaInformationService.resetMetaKeywords();
				pageTitleService.setPageTitle();
			}
		}

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState /*, fromParams*/) {
			if (toState && toState.name && (fromState && fromState.name !== toState.name)) {
				var teamNav = $scope.getFirstLevelNavItemByStateName(toState.name);
				setMetaInfo(teamNav);
			}
		});
	};

	teamController.$inject = ['$rootScope', '$scope', 'metaInformationService', 'pageTitleService'];
	module.exports = teamController;
})();
