'use strict';
/*
*	articlesService
*	Description
*	articlesService fetches all Type of  Articles Data
*/

(function() {
	var articlesService = function($q, appService) {
		var url = 'data/articles.json';

		function getAllArticles() {
			return appService.requestData(url);
		}

		function getArticleById(articleId) {
			var defferedObj = $q.defer();
			appService.requestData(url).then(function(articles) {
				var foundArticles = articles.filter(function(article) {
					if (article.id === articleId) {
						return article;
					}
				});

				if (foundArticles && foundArticles.length > 0) {
					defferedObj.resolve(foundArticles[0]);
				} else {
					defferedObj.resolve();
				}
			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		function getArticleByStateName(stateName) {
			var defferedObj = $q.defer();
			appService.requestData(url).then(function(articles) {
				var foundArticles = articles.filter(function(article) {
					if (article.stateName === stateName) {
						return article;
					}
				});

				if (foundArticles && foundArticles.length > 0) {
					defferedObj.resolve(foundArticles[0]);
				} else {
					defferedObj.resolve();
				}
			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		function getArticlesByIds(articleIdsArray) {
			var defferedObj = $q.defer();
			if (!(articleIdsArray instanceof Array) || articleIdsArray.length === 0) {
				defferedObj.resolve();
			}

			appService.requestData(url).then(function(articles) {
				var foundArticles = articles.filter(function(article) {
					var isMatched = false;
					articleIdsArray.filter(function(articleId) {
						if (article.id === articleId) {
							isMatched = true;
						}
					});
					if (isMatched === true) {
						return article;
					}
				});

				defferedObj.resolve(foundArticles);

			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		return {
			getAllArticles: getAllArticles,
			getArticleById: getArticleById,
			getArticleByStateName: getArticleByStateName,
			getArticlesByIds: getArticlesByIds
		};
	};

	articlesService.$inject = ['$q', 'appService'];
	module.exports = articlesService;
})();
