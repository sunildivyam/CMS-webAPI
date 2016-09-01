'use strict';
/*
*	aboutusService
*	Description
*	aboutusService fetches the aboutus Page Level Data.
*/

(function() {
	var aboutusService = function($q, $http) {
		var url = 'app/data/app-header.json';
		var headerInfo = null;

		function getAppHeaderInfo() {
			var promiseObj = $q.defer();

			if (!headerInfo) {
				$http.get(url).then(function(response) {
					if (response && response.data) {
						headerInfo = response.data;
					} else {
						headerInfo = null;
					}
					promiseObj.resolve(headerInfo);
				}, function(error) {
					headerInfo = null;
					promiseObj.reject(error);
				});
			} else {
				promiseObj.resolve(headerInfo);
			}

			return promiseObj.promise;
		}
		// Temporary Code WEB API
		function getValues() {
			return $http.get('https://localhost:44302/api/Values', {
				contentType: 'application/json',
				accessControlAllowOrigin: 'https://localhost:44302'
			});
		}
		return {
			getAppHeaderInfo: getAppHeaderInfo,
			getValues: getValues
		};
	};

	aboutusService.$inject = ['$q', '$http'];
	module.exports = aboutusService;
})();
