'use strict';
(function() {
	var resumeFormat = function($timeout) {
		return {
			restrict: 'E',
			scope: {
				format: '=',
				onChange: '='
			},
			templateUrl: 'rbuilder/drop-zone.html',
			link: function($scope, element) {
				
			}
		};
	};

	resumeFormat.$inject = ['$timeout'];
	module.exports = resumeFormat;
})();
