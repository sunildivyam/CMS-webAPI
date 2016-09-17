'use strict';
(function() {
	var dashboard = function() {
		return {
			restrict: 'E',
			scope: {
				article: "=",
				relatedArticles: '=',
				relatedServices: '=',
				relatedTechnologies: '='
			},
			templateUrl: 'dashboard/dashboard.html',
			link: function() {

			}
		};
	};

	dashboard.$inject = [];
	module.exports = dashboard;
})();
