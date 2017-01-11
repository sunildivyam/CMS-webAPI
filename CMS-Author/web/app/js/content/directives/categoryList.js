'use strict';
(function() {
	var categoryList = function(Utils) {
		return {
			restrict: 'E',
			scope: {
				categoryItems: '=',
				onSelect: '=',
				onRefresh: '='
			},
			templateUrl: 'content/category-list.html',
			link: function($scope, element) {
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

				$scope.$on("onRepeatItemsLoaded", function(event) {
					$(element).find('.description').dotdotdot({
						wrap: 'letters',
						watch: 'window',
						height: (17 * 4)
					});

					if (typeof $scope.onRefresh === 'function') {
						$scope.onRefresh(event);
					}
				});
			}
		};
	};

	categoryList.$inject = ['Utils'];
	module.exports = categoryList;
})();
