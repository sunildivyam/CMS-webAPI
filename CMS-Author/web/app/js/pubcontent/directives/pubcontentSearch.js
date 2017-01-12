'use strict';
(function() {
	var pubcontentSearch = function() {
		return {
			restrict: 'E',
			scope: {
				search: '=',	// is object of searchString and category
				categories: '=',
				onSearch: '='
			},
			templateUrl: 'pubcontent/pubcontent-search.html',
			link: function($scope) {
				$scope.$watch('search', function(search) {
					if (!(search instanceof Object)) {
						search = {};
					}
				});

				$scope.onSearchClick = function(event) {
					if (typeof $scope.onSearch === 'function') {
						$scope.onSearch(event, $scope.search.category, $scope.search.searchString);
					}
				};
			}
		};
	};

	pubcontentSearch.$inject = [];
	module.exports = pubcontentSearch;
})();
