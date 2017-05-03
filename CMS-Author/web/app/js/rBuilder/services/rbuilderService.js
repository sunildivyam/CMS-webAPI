'use strict';
/*
* @ngdoc service
* @name rbuilder.service:rbuilderService
* @description
*	rbuilderService makes calls to APIs for Resume Sections data.
*/

(function() {
	var rbuilderService = function($http) {	

		function getResumeFormat() {
			return $http.get('data/my-elegant-template.json');
		}

		return {
			getResumeFormat: getResumeFormat
		};
	};
	rbuilderService.$inject = ['$http'];
	module.exports = rbuilderService;
})();
