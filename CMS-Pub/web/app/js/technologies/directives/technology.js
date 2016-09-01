'use strict';
(function() {
	var technology = function() {
		return {
			restrict: 'E',
			scope: {
				technology: "=",
				relatedTechnologies: '=',
				relatedArticles: '=',
				relatedServices: '='
			},
			templateUrl: 'technologies/technology.html',
			link: function() {

			}
		};
	};

	technology.$inject = [];
	module.exports = technology;
})();
