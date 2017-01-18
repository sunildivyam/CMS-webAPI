'use strict';
(function() {
	var resourceList = function(Utils, $timeout) {
		return {
			restrict: 'E',
			scope: {
				resourceItems: '=',
				onSelect: '=',
				onRefresh: '=',
				mode: '@',
				isLoading: '='
			},
			templateUrl: 'resourcebrowser/resource-list.html',
			link: function($scope, element) {
				$scope.searchKeywords = '';
				$scope.modes = Utils.getListModes();
				$scope.resourceFilter = function(resource) {
					return Utils.filterByKeywords(resource, $scope.searchKeywords);
				};

				$scope.onClick = function(event, resource) {
					event.preventDefault();
					if (typeof $scope.onSelect === 'function') {
						$scope.selectedResource = resource;
						$scope.onSelect(event, resource);
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
					if (typeof $scope.onRefresh === 'function') {
						$scope.onRefresh(event);
					}
				});
			}
		};
	};

	resourceList.$inject = ['Utils', '$timeout'];
	module.exports = resourceList;
})();
