'use strict';
(function() {
	var contentList = function(Utils) {
		return {
			restrict: 'E',
			scope: {
				contentItems: '=',
				onSelect: '='
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
			}
		};
	};

	contentList.$inject = ['Utils'];
	module.exports = contentList;
})();
