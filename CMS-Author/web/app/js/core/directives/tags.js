'use strict';
(function() {
	var tags = function() {
		return {
			restrict: 'E',
			scope: {
				tagItems: "=",
				onSelect: '='
			},
			templateUrl: 'core/tags.html',
			link: function($scope) {
				$scope.onClick = function(event, tag, index) {
					if (typeof $scope.onSelect === 'function') {
						event.preventDefault();
						$scope.onSelect(event, tag, index);
					}
				};
			}
		};
	};

	tags.$inject = [];
	module.exports = tags;
})();
