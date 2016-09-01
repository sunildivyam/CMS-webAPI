'use strict';
/*
*	appHeaderService
*	Description
*	appHeaderService fetches the Application's Header Information.
*	This may include:
*	Logo, Menu items, Featured Links, Social media Links, Copyrights Information etc.
*/

(function() {
	var appHeaderService = function($q, appService, servicesService, articlesService, technologiesService) {
		var url = 'data/app-header.json';
		var servicesNavName = 'services';
		var articlesNavName = 'articles';
		var technologiesNavName = 'technologies';


		function prePopulateNavItemWithSubNavs(mainNavItemNames, mainNavItems) {
			var defferedObj = $q.defer();
			if (mainNavItems instanceof Array && mainNavItems.length > 0 && mainNavItemNames instanceof Array) {
				var navPromises = [];
				mainNavItems.filter(function(navItem) {
					if (navItem.items instanceof Array && navItem.items.length > 0 && typeof navItem.items[0] === 'string') {
						mainNavItemNames.filter(function(mainNavItemName) {
							if (navItem.id === mainNavItemName) {
								switch(mainNavItemName) {
									case servicesNavName:
									var servicesDefered = $q.defer();
									navPromises.push(servicesDefered.promise.then());
									servicesService.getServicesByIds(navItem.items).then(function(services) {
										navItem.items = services;
										servicesDefered.resolve(services);
									}, function() {
										navItem.items = undefined;
										servicesDefered.reject();
									});
									break;
									case articlesNavName:
									var articlesDefered = $q.defer();
									navPromises.push(articlesDefered.promise.then());
									articlesService.getArticlesByIds(navItem.items).then(function(articles) {
										navItem.items = articles;
										articlesDefered.resolve(articles);
									}, function() {
										navItem.items = undefined;
										articlesDefered.reject();
									});
									break;
									case technologiesNavName:
									var technologiesDefered = $q.defer();
									navPromises.push(technologiesDefered.promise.then());
									technologiesService.getTechnologiesByIds(navItem.items).then(function(technologies) {
										navItem.items = technologies;
										technologiesDefered.resolve(technologies);
									}, function() {
										navItem.items = undefined;
										technologiesDefered.reject();
									});
									break;
								}
							}
						});
					}
				});
				$q.all(navPromises).then(function() {
					defferedObj.resolve();
				}, function() {
					defferedObj.reject();
				});
			} else {
				defferedObj.reject();
			}
			return defferedObj.promise;
		}

		function getAppHeaderInfo() {
			var defferedObj = $q.defer();
			appService.requestData(url).then(function(appHeaderInfo) {
				prePopulateNavItemWithSubNavs([servicesNavName, articlesNavName, technologiesNavName], appHeaderInfo && appHeaderInfo.items).then(function() {
					defferedObj.resolve(appHeaderInfo);
				}, function() {
					defferedObj.reject();
				});
			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		function getMainCarousel() {
			var defferedObj = $q.defer();
			appService.requestData(url).then(function(appHeaderInfo) {
				defferedObj.resolve(appHeaderInfo && appHeaderInfo.mainCarousel);
			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		function getNavs() {
			var defferedObj = $q.defer();
			appService.requestData(url).then(function(appHeaderInfo) {
				prePopulateNavItemWithSubNavs([servicesNavName, articlesNavName, technologiesNavName], appHeaderInfo && appHeaderInfo.items).then(function() {
					defferedObj.resolve(appHeaderInfo && appHeaderInfo.items);
				}, function() {
					defferedObj.reject();
				});
			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		function getApplication() {
			var defferedObj = $q.defer();
			appService.requestData(url).then(function(appHeaderInfo) {
				defferedObj.resolve(appHeaderInfo && appHeaderInfo.application);
			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		function getLogo() {
			var defferedObj = $q.defer();
			appService.requestData(url).then(function(appHeaderInfo) {
				defferedObj.resolve(appHeaderInfo && appHeaderInfo.logo);
			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		return {
			getAppHeaderInfo: getAppHeaderInfo,
			getMainCarousel: getMainCarousel,
			getNavs: getNavs,
			getApplication: getApplication,
			getLogo: getLogo
		};
	};

	appHeaderService.$inject = ['$q', 'appService', 'servicesService', 'articlesService', 'technologiesService'];
	module.exports = appHeaderService;
})();
