'use strict';
(function() {
	var pubCategoryView = function($location, pageTitleService) {
		return {
			restrict: 'E',
			scope: {
				category: '=',
				isLoading: '='
			},
			templateUrl: 'pubcontent/pubcategory-view.html',
			link: function($scope) {
				$scope.$location = $location;
				$scope.pageTitleService = pageTitleService;
			}
		};
	};

	pubCategoryView.$inject = ['$location', 'pageTitleService'];
	module.exports = pubCategoryView;
})();
