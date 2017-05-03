'use strict';
(function() {
	var resumeSection = function($timeout, $compile) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				section: '=',
				onChange: '='
			},
			templateUrl: 'rbuilder/resume-section.html',
			link: function($scope, element) {
				$scope.$watch('section', function(section) {
					if (section && section.sectionId) {
						var $contentContainer = $(element).find('>.panel-body');
						var content = '<'+ section.sectionId + '></' + section.sectionId + '>';
						$contentContainer.append($compile(content)($scope));
					}
				});
			}
		};
	};

	resumeSection.$inject = ['$timeout', '$compile'];
	module.exports = resumeSection;
})();
