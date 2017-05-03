'use strict';
(function() {
	var languages = function($timeout) {
		return {
			restrict: 'AE',
			replace: true,
			templateUrl: 'rbuilder/languages.html',
			link: function($scope, element) {
				console.log('In lang');
			}
		};
	};

	languages.$inject = ['$timeout'];
	module.exports = languages;
})();
