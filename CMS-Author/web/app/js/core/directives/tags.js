'use strict';
(function() {
	var tags = function() {
		return {
			restrict: 'E',
			scope: {
				tagItems: "="
			},
			templateUrl: 'core/tags.html',
			link: function() {

			}
		};
	};

	tags.$inject = [];
	module.exports = tags;
})();
