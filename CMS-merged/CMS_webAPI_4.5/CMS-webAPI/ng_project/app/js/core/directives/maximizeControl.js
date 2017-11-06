'use strict';
/*
*	maximizeControl
*	Description
*	maximizeControl directive is responsible for
*	loading Application Footer
*/
(function() {
	var maximizeControl = function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				isMaximized: '=',
				top: '@',
				right: '@',
				bottom: '@',
				left: '@',
				onMaximize: '=',
				onRestore: '='
			},
			templateUrl: 'core/maximize-control.html',
			link: function($scope, element) {
				var parentOriginalStyle = '';				
				var $element = $(element);
				var $parentEl = $($element.parent());
				var parentOriginalPosition = $parentEl.css('position') || '';
				var ANIMATION_DURATION = 500;
				$element.css({
					position: 'absolute',
					top: $scope.top || 'initial',
					right: $scope.right || 'initial',
					left: $scope.left || 'initial',
					bottom: $scope.bottom || 'initial',
					zIndex: 1
				});

				if (!['absolute', 'relative', 'fixed'].includes(parentOriginalPosition)) {
					$parentEl.css({
						position: 'relative'
					});
				}
				
				$scope.onControlClick = function(event) {
					event && event.preventDefault();
					event.stopPropagation();
					$scope.isMaximized = !$scope.isMaximized;
					
					// trigger Events (callbacks)
					if ($scope.isMaximized === true) {
						parentOriginalStyle = $parentEl.attr('style') || '';

						$parentEl.css({
							position: 'fixed',
							zIndex: 9999
						});
						$parentEl.animate({							
							top: '0px',
							left: '0px',
							width: '100%',
							height: '100%'							
						}, ANIMATION_DURATION);

						if (typeof $scope.onMaximize === 'function') {
							$scope.onMaximize(event, $parentEl, $element);
						}
					} else {
						$parentEl.attr('style', parentOriginalStyle);
						if (typeof $scope.onRestore === 'function') {
							$scope.onRestore(event, $parentEl, $element);
						}
					}
				};
			}
		};
	};

	maximizeControl.$inject = [];
	module.exports = maximizeControl;
})();
