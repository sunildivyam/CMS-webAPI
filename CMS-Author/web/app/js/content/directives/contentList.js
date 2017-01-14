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
			link: function($scope, element) {
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
					$(element).find('.short-description').dotdotdot({
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

	contentList.$inject = ['Utils'];
	module.exports = contentList;
})();