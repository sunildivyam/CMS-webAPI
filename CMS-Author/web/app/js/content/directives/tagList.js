'use strict';
(function() {
	var tagList = function(Utils) {
		return {
			restrict: 'E',
			scope: {
				tagItems: '=',
				onSelect: '='
			},
			templateUrl: 'content/tag-list.html',
			link: function($scope) {
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
			}
		};
	};

	tagList.$inject = ['Utils'];
	module.exports = tagList;
})();
