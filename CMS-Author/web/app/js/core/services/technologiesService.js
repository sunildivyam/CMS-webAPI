'use strict';
/*
*	technologiesService
*	Description
*	technologiesService fetches all Type of  Technologies Data
*/

(function() {
	var technologiesService = function($q, appService) {
		var url = 'data/technologies.json';

		function getAllTechnologies() {
			return appService.requestData(url);
		}

		function getTechnologyById(technologyId) {
			var defferedObj = $q.defer();
			appService.requestData(url).then(function(technologies) {
				var foundTechnologies = technologies.filter(function(technology) {
					if (technology.id === technologyId) {
						return technology;
					}
				});

				if (foundTechnologies && foundTechnologies.length > 0) {
					defferedObj.resolve(foundTechnologies[0]);
				} else {
					defferedObj.resolve();
				}
			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		function getTechnologyByStateName(stateName) {
			var defferedObj = $q.defer();
			appService.requestData(url).then(function(technologies) {
				var foundTechnologies = technologies.filter(function(technology) {
					if (technology.stateName === stateName) {
						return technology;
					}
				});

				if (foundTechnologies && foundTechnologies.length > 0) {
					defferedObj.resolve(foundTechnologies[0]);
				} else {
					defferedObj.resolve();
				}
			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		function getTechnologiesByIds(technologyIdsArray) {
			var defferedObj = $q.defer();
			if (!(technologyIdsArray instanceof Array) || technologyIdsArray.length === 0) {
				defferedObj.resolve();
			}

			appService.requestData(url).then(function(technologies) {
				var foundTechnologies = technologies.filter(function(technology) {
					var isMatched = false;
					technologyIdsArray.filter(function(technologyId) {
						if (technology.id === technologyId) {
							isMatched = true;
						}
					});
					if (isMatched === true) {
						return technology;
					}
				});

				defferedObj.resolve(foundTechnologies);

			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		return {
			getAllTechnologies: getAllTechnologies,
			getTechnologyById: getTechnologyById,
			getTechnologyByStateName: getTechnologyByStateName,
			getTechnologiesByIds: getTechnologiesByIds
		};
	};

	technologiesService.$inject = ['$q', 'appService'];
	module.exports = technologiesService;
})();
