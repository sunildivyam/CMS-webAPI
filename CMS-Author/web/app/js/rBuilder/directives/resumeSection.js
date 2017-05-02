'use strict';
(function() {
	var resumeSection = function($timeout) {
		return {
			restrict: 'E',
			scope: {
				section: '=',
				onChange: '='
			},
			templateUrl: 'rbuilder/resume-section.html',
			link: function($scope, element) {
				
			}
		};
	};

	resumeSection.$inject = ['$timeout'];
	module.exports = resumeSection;
})();
