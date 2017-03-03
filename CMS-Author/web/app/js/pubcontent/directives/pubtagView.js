'use strict';
(function() {
	var pubTagView = function($location, pageTitleService) {
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

	pubTagView.$inject = ['$location', 'pageTitleService'];
	module.exports = pubTagView;
})();
