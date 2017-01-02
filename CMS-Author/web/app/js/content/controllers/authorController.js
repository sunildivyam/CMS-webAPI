'use strict';
/*
*	authorController
*	Description
*	authorController controls the content page Level Scope Data.
*/

(function() {
	var authorController = function($scope, $state) {
		$scope.$on('$stateChangeSuccess', function(event, toState/*, toParams, fromState , fromParams*/) {
			if (toState && toState.name === 'author') {
				$state.go('author.dashboard');
			}
		});
	};

	authorController.$inject = ['$scope', '$state'];
	module.exports = authorController;
})();
