'use strict';
/*
*	appService
*	Description
*	appService fetches the data for all $http requests and keeps a cache for each.
*	And supplies data from cache for subsequent requests unless forced call is requested
*/

(function() {
	var appService = function($q, $http) {
		var cachedReqs = {};

		function getDataFromCache(url) {
			if (url && typeof url === 'string') {
				return cachedReqs[url];
			}
			return;
		}
		function executeDataRequest(url, forced) {
			var cachedReq = getDataFromCache(url);
			var defferedObj = $q.defer();
			if (forced === true || !cachedReq) {
				$http.get(url).then(function(response) {
					if (response && response.data && response.status === 200) {
						cachedReqs[url] = response.data;
						defferedObj.resolve(cachedReqs[url]);
					} else {
						defferedObj.reject(response);
					}
				}, function(rejection) {
					defferedObj.reject(rejection);
				});
			} else {
				defferedObj.resolve(cachedReq);
			}

			return defferedObj.promise;
		}

		return {
			requestData: executeDataRequest
		};
	};

	appService.$inject = ['$q', '$http'];
	module.exports = appService;
})();
