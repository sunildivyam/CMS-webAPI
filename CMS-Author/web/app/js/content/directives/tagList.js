'use strict';
(function() {
	var tagList = function(Utils) {
		return {
			restrict: 'E',
			scope: {
				tagItems: '=',
				onSelect: '=',
				onRefresh: '='
			},
			templateUrl: 'content/tag-list.html',
			link: function($scope, element) {
				$scope.searchKeywords = '';
				$scope.tagFilter = function(tag) {
					return Utils.filterByKeywords(tag, $scope.searchKeywords);
				};

				$scope.onClick = function(event, tag) {
					event.preventDefault();
					if (typeof $scope.onSelect === 'function') {
						$scope.onSelect(event, tag);
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

	tagList.$inject = ['Utils'];
	module.exports = tagList;
})();
