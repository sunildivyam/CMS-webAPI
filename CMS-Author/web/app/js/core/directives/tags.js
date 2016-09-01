'use strict';
(function() {
	var tags = function() {
		return {
			restrict: 'E',
			scope: {
				keywords: "="
			},
			templateUrl: 'core/tags.html',
			link: function() {

			}
		};
	};

	tags.$inject = [];
	module.exports = tags;
})();
