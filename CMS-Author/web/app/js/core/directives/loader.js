'use strict';
/*
*	loader
*	Description
*	loader directive is responsible to display spinning loader for page or component
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
