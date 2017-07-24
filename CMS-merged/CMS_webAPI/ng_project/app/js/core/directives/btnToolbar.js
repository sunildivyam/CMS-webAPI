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
				btnSizeClass: '@',
				showForRoles: '='
			},
			templateUrl: 'core/btn-toolbar.html',
			link: function($scope) {
				$scope.isDisplayable = function(btn) {
					if (btn && btn.inRoles instanceof Array && btn.inRoles.length > 0 && $scope.showForRoles instanceof Array && $scope.showForRoles.length > 0) {						
						var foundRoles = btn.inRoles.filter(function(btnRole) {
							if ($scope.showForRoles.includes(btnRole) === true) {
								return btnRole;
							}
						});
						if (foundRoles.length > 0 && foundRoles.length === btn.inRoles.length) {
							return true;
						} else {
							return false;
						}
					} else {
						return true;
					}
				};

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
