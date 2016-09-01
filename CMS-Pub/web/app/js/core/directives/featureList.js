'use strict';
(function() {
	var featureList = function() {
		return {
			restrict: 'E',
			scope: {
				features: "=",
				mode: '@'
			},
			templateUrl: 'core/feature-list.html',
			link: function() {

			}
		};
	};

	featureList.$inject = [];
	module.exports = featureList;
})();
