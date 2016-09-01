'use strict';
(function() {
	var service = function() {
		return {
			restrict: 'E',
			scope: {
				service: "=",
				relatedServices: '=',
				relatedArticles: '=',
				relatedTechnologies: '='
			},
			templateUrl: 'services/service.html',
			link: function() {

			}
		};
	};

	service.$inject = [];
	module.exports = service;
})();
