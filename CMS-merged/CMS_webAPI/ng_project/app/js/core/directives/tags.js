'use strict';
(function() {
	var tags = function() {
		return {
			restrict: 'E',
			scope: {
				tagType: '@',
				tagItems: "=",
				onSelect: '='
			},
			templateUrl: 'core/tags.html',
			link: function($scope) {
				$scope.tagType = $scope.tagType || 'articles';

				$scope.onClick = function(event, tag, index) {
					if (typeof $scope.onSelect === 'function') {
						event.preventDefault();
						$scope.onSelect(event, tag, index, $scope.tagType);
					}
				};
			}
		};
	};

	tags.$inject = [];
	module.exports = tags;
})();
