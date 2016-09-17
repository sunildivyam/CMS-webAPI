'use strict';
(function() {
	var content = function() {
		return {
			restrict: 'E',
			scope: {
				article: "=",
				relatedArticles: '=',
				relatedServices: '=',
				relatedTechnologies: '='
			},
			templateUrl: 'content/content.html',
			link: function() {

			}
		};
	};

	content.$inject = [];
	module.exports = content;
})();
