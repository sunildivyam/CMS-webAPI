'use strict';
(function() {
	var pubtagView = function($location, pageTitleService) {
		return {
			restrict: 'E',
			scope: {
				tag: '=',
				isLoading: '='
			},
			templateUrl: 'pubcontent/pubtag-view.html',
			link: function($scope) {
				$scope.$location = $location;
				$scope.pageTitleService = pageTitleService;
			}
		};
	};

	pubtagView.$inject = ['$location', 'pageTitleService'];
	module.exports = pubtagView;
})();
