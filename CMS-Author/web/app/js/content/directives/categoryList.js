'use strict';
(function() {
	var categoryList = function(Utils, $timeout) {
		return {
			restrict: 'E',
			scope: {
				categoryItems: '=',
				onSelect: '=',
				onRefresh: '=',
				mode: '@'
			},
			templateUrl: 'content/category-list.html',
			link: function($scope, element) {
				$scope.searchKeywords = '';
				$scope.modes = Utils.getListModes();
				$scope.categoryFilter = function(category) {
					return Utils.filterByKeywords(category, $scope.searchKeywords);
				};

				$scope.onClick = function(event, category) {
					event.preventDefault();
					if (typeof $scope.onSelect === 'function') {
						$scope.selectedCategory = category;
						$scope.onSelect(event, category);
					}
				};

				$scope.onModeChange = function(event, btn) {
					$scope.mode = btn.id;
					$timeout(function() {
						if (typeof $scope.onRefresh === 'function') {
							$scope.onRefresh(event);
						}
					}, 50);
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

	categoryList.$inject = ['Utils', '$timeout'];
	module.exports = categoryList;
})();
