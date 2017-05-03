'use strict';
(function() {
	var dropZone = function($timeout) {
		var widthSizes = {};

		// function getButton(el) {
		// 	var $el = $(el);
		// 	if ($el.hasClass('btn')) return $el;
		// 	return $el.closest('.btn');
		// }

		function getWidthSizes() {
			widthSizes = {};
			var wSizes = [];
			for (var i = 1; i <= 12; i++) {
				widthSizes[i + 'x'] = 'col-sm-' + i;
				wSizes.push(i + 'x');
			}
			return wSizes;
		}

		function setAlignCenter(element, wSize) {
			var $element = $(element);
			wSize = wSize || '12x';
			var size = wSize.substr(0, wSize.length -1);
			$element.removeClass(function (index, className) {
			    return (className.match (/(^|\s)col-sm-push-\S+/g) || []).join(' ');
			});
			if (size < 11) $element.addClass('col-sm-push-' + ((12 - size)/2));
		}

		return {
			restrict: 'E',
			replace: true,
			scope: {
				zone: '=',
				onChange: '='
			},
			templateUrl: 'rbuilder/drop-zone.html',
			link: function($scope, element) {
				$scope.widthSizes = getWidthSizes();

				$scope.onToolbarAlignClick = function(event, align) {					
					$scope.zone.align = align;
				};

				$scope.onWidthSizeClick = function(event, widthSize) {
					$scope.zone.width = widthSize;
				};

				$scope.$watch('zone.align', function(align) {
					var $element =$(element);

					if (!align || align === 'left') {
						if ($element.hasClass('pull-right')) $element.removeClass('pull-right');
						$element.removeClass(function (index, className) {
						    return (className.match (/(^|\s)col-sm-push-\S+/g) || []).join(' ');
						});
					} else if (align === 'center') {
						if ($element.hasClass('pull-right')) $element.removeClass('pull-right');
						setAlignCenter(element, $scope.zone.width);
					} else if (align === 'right') {						
						$element.removeClass(function (index, className) {
						    return (className.match (/(^|\s)col-sm-push-\S+/g) || []).join(' ');
						});
						$element.addClass('pull-right');
					}
				});

				$scope.$watch('zone.width', function(widthSize) {
					widthSize = widthSize || '12x';
					var className = widthSizes[widthSize];
					var $element =$(element);

					$element.removeClass(function (index, className) {
					    return (className.match (/(^|\s)col-sm-\S+/g) || []).join(' ');
					});
					$element.addClass(className);
				});
			}
		};
	};

	dropZone.$inject = ['$timeout'];
	module.exports = dropZone;
})();
