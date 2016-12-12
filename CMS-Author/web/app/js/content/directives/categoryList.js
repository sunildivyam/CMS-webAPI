'use strict';
(function() {
	var categoryList = function(Utils) {
		return {
			restrict: 'E',
			scope: {
				categoryItems: '=',
				onSelect: '='
			},
			templateUrl: 'content/category-list.html',
			link: function($scope) {
				$scope.searchKeywords = '';
				$scope.categoryFilter = function(category) {
					return Utils.filterByKeywords(category, $scope.searchKeywords);
				};

				$scope.onClick = function(event, category) {
					event.preventDefault();
					if (typeof $scope.onSelect === 'function') {
						$scope.onSelect(event, category);
					}
				};
			}
		};
	};

	categoryList.$inject = ['Utils'];
	module.exports = categoryList;
})();
