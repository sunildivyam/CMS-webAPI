'use strict';
(function() {
	var pubUserProfile = function($location, pageTitleService) {
		return {
			restrict: 'E',
			scope: {
				user: '=',
				isLoading: '='
			},
			templateUrl: 'pubcontent/pub-user-profile.html',
			link: function($scope) {
				$scope.$location = $location;
				$scope.pageTitleService = pageTitleService;
			}
		};
	};

	pubUserProfile.$inject = ['$location', 'pageTitleService'];
	module.exports = pubUserProfile;
})();
