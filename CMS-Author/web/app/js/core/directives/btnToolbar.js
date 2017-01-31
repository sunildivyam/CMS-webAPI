'use strict';
/**
* @ngdoc directive
* @name raiweb.core.directive:btnToolbar
* @scope
* @restrict E

* @description
* Displays a progress btnToolbar modal to parent or body

* @param {boolean} atBody defaults to "false".
* A "false" value specifies that btnToolbar should be modal to immidiate relative parent.
* A "true" value specifies that btnToolbar should be modal to body.

* @param {boolean} isLoading toggles the btnToolbar
* @param {string=} message loading message string
*/

(function() {
	var btnToolbar = function() {
		return {
			restrict: 'E',
			replace: false,
			scope: {
				buttons: '=',
				onSelect: '=',
				btnSizeClass: '@'
			},
			templateUrl: 'core/btn-toolbar.html',
			link: function($scope) {
				$scope.onButtonClick = function(event, btn) {
					if (typeof $scope.onSelect === 'function') {
						$scope.onSelect(event, btn);
					}
				};
			}
		};
	};

	btnToolbar.$inject = [];
	module.exports = btnToolbar;
})();
