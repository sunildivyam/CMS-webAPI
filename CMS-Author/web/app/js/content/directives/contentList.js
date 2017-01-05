'use strict';
(function() {
	var contentList = function(Utils) {
		return {
			restrict: 'E',
			scope: {
				contentItems: '=',
				onSelect: '=',
				onRefresh: '='
			},
			templateUrl: 'content/content-list.html',
			link: function($scope) {
				$scope.searchKeywords = '';
				$scope.contentFilter = function(content) {
					return Utils.filterByKeywords(content, $scope.searchKeywords);
				};

				$scope.onClick = function(event, content) {
					event.preventDefault();
					if (typeof $scope.onSelect === 'function') {
						$scope.onSelect(event, content);
					}
				};

				$scope.$on("onRepeatItemsLoaded", function(event) {
					if (typeof $scope.onRefresh === 'function') {
						$scope.onRefresh(event);
					}
				});
			}
		};
	};

	contentList.$inject = ['Utils'];
	module.exports = contentList;
})();
