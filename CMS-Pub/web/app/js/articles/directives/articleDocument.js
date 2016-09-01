'use strict';
(function() {
	var articleDocument = function() {
		return {
			restrict: 'E',
			scope: {
				article: "=",
				relatedArticles: '=',
				relatedServices: '=',
				relatedTechnologies: '='
			},
			templateUrl: 'articles/article.html',
			link: function() {

			}
		};
	};

	articleDocument.$inject = [];
	module.exports = articleDocument;
})();
