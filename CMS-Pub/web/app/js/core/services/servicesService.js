'use strict';
/*
*	servicesService
*	Description
*	servicesService fetches all Type of  Services Data
*/

(function() {
	var servicesService = function($q, appService) {
		var url = 'data/services.json';

		function getAllServices() {
			return appService.requestData(url);
		}

		function getServiceById(serviceId) {
			var defferedObj = $q.defer();
			appService.requestData(url).then(function(services) {
				var foundServices = services.filter(function(service) {
					if (service.id === serviceId) {
						return service;
					}
				});

				if (foundServices && foundServices.length > 0) {
					defferedObj.resolve(foundServices[0]);
				} else {
					defferedObj.resolve();
				}
			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		function getServiceByStateName(stateName) {
			var defferedObj = $q.defer();
			appService.requestData(url).then(function(services) {
				var foundServices = services.filter(function(service) {
					if (service.stateName === stateName) {
						return service;
					}
				});

				if (foundServices && foundServices.length > 0) {
					defferedObj.resolve(foundServices[0]);
				} else {
					defferedObj.resolve();
				}
			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		function getServicesByIds(serviceIdsArray) {
			var defferedObj = $q.defer();
			if (!(serviceIdsArray instanceof Array) || serviceIdsArray.length === 0) {
				defferedObj.resolve();
			}

			appService.requestData(url).then(function(services) {
				var foundServices = services.filter(function(service) {
					var isMatched = false;
					serviceIdsArray.filter(function(serviceId) {
						if (service.id === serviceId) {
							isMatched = true;
						}
					});
					if (isMatched === true) {
						return service;
					}
				});

				defferedObj.resolve(foundServices);

			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		return {
			getAllServices: getAllServices,
			getServiceById: getServiceById,
			getServiceByStateName: getServiceByStateName,
			getServicesByIds: getServicesByIds
		};
	};

	servicesService.$inject = ['$q', 'appService'];
	module.exports = servicesService;
})();
