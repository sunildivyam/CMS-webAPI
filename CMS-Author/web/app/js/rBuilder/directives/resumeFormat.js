'use strict';
(function() {
	var resumeFormat = function($timeout) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				format: '=',
				onChange: '='
			},
			templateUrl: 'rbuilder/resume-format.html',
			link: function($scope, element) {
				
			}
		};
	};

	resumeFormat.$inject = ['$timeout'];
	module.exports = resumeFormat;
})();
