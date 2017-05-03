'use strict';
(function() {
	var skills = function($timeout) {
		return {
			restrict: 'AE',
			templateUrl: 'rbuilder/skills.html',
			link: function($scope, element) {
				console.log("in Skills");
			}
		};
	};

	skills.$inject = ['$timeout'];
	module.exports = skills;
})();
