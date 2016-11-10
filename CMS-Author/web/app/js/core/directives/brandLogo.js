'use strict';
/*
*	brandLogo
*	Description
*	brandLogo directive is responsible for loading Brand Logo in Application Header Section
*	OR Brand Logo can be anywhere included using this directive
*	based on various breakpoints (lg, md, sm and xs) Logos of different size can be painted
*/
(function() {
	var brandLogo = function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				logo: '=',
				size: '@'
			},
			templateUrl: 'core/brand-logo.html',
			link: function($scope) {
				$scope.primaryTitleHtml = '';

				/*
				*	watches logo.primaryTitle to creates three spans from primary title, middle represents High Char span
				*/
				$scope.$watch('logo.primaryTitle', function(newValue) {
					if (typeof newValue === 'string' && newValue !== '') {
						$scope.primaryTitleHtml = generateTitleWithHighChar(newValue,$scope.logo.highCharIndex);
					}
				});

				/*
				*	generateTitleWithHighChar private method
				*	creates three spans from primary title, middle represents High Char span
				*/
				function generateTitleWithHighChar(title, highCharIndex) {
					var titleWithHighChar = title;
					if(typeof title === 'string' && title !== '' && title.length >=3 && (highCharIndex > 0 && highCharIndex <= title.length)) {
						titleWithHighChar = [
							'<span>' + title.slice(0, highCharIndex - 1) + '</span>',
							'<span class="high-char">' + title.slice(highCharIndex - 1, highCharIndex) + '</span>',
							'<span>' + title.slice(highCharIndex) + '</span>'
						].join('');
					}
					return titleWithHighChar;
				}
			}
		};
	};

	brandLogo.$inject = [];
	module.exports = brandLogo;
})();
