'use strict';
/**
* @ngdoc directive
* @name raiweb.core.directive:loader
* @scope
* @restrict E

* @description
* Displays a progress loader modal to parent or body

* @param {boolean} atBody defaults to "false".
* A "false" value specifies that loader should be modal to immidiate relative parent.
* A "true" value specifies that loader should be modal to body.

* @param {boolean} isLoading toggles the loader
* @param {string=} message loading message string
*/

(function() {
	var loader = function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				atBody: '=',
				isLoading: '=',
				message: "@"
			},
			templateUrl: 'core/loader.html',
			link: function($scope, element) {
				$scope.$watch('atBody', function(newValue) {
					var $element = $(element);
					if (newValue === true) {
						$element.css('position', 'fixed');
					} else {
						$element.css('position', 'absolute');
					}
				});

				$scope.$watch('isLoading', function(newValue) {
					var $element = $(element);
					if (newValue === true) {
						$element.css('display', 'block');
					} else {
						$element.css('display', 'none');
					}
				});
			}
		};
	};

	loader.$inject = [];
	module.exports = loader;
})();
