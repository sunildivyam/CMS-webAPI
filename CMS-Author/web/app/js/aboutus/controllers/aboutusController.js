'use strict';
/*
*	aboutusController
*	Description
*	aboutusController controls the aboutus page Level Scope Data.
*/

(function() {
	var aboutusController = function($rootScope, $scope, metaInformationService, pageTitleService, aboutusService) {
		function setMetaInfo(aboutusNav) {
			if (aboutusNav instanceof Object) {
				metaInformationService.setMetaDescription(aboutusNav.description);
				metaInformationService.setMetaKeywords(aboutusNav.keywords);
				pageTitleService.setPageTitle(aboutusNav.title);
			} else {
				metaInformationService.resetMetaDescription();
				metaInformationService.resetMetaKeywords();
				pageTitleService.setPageTitle();
			}
		}

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState /*, fromParams*/) {
			if (toState && toState.name && (fromState && fromState.name !== toState.name)) {
				var aboutusNav = $scope.getFirstLevelNavItemByStateName(toState.name);
				setMetaInfo(aboutusNav);
				$scope.aboutus = aboutusNav;
			}
		});

		aboutusService.getValues().then(function(response) {
			console.log(response.data);
		});
	};

	aboutusController.$inject = ['$rootScope', '$scope', 'metaInformationService', 'pageTitleService', 'aboutusService'];
	module.exports = aboutusController;
})();
