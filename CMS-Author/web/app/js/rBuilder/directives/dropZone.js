'use strict';
(function() {
	var dropZone = function($timeout) {
		return {
			restrict: 'E',
			scope: {
				zone: '=',
				onChange: '='
			},
			templateUrl: 'rbuilder/drop-zone.html',
			link: function($scope, element) {
				
			}
		};
	};

	dropZone.$inject = ['$timeout'];
	module.exports = dropZone;
})();
