'use strict';
/**
* @ngdoc service
* @name raiweb.core.service:appService
* @description
*	appService provides functionality of
* 	$http service by exposing GET, POST, PUT, DELETE etc type of methods
*	All other serivices in the project should call these methods for all http requests.
*	The url should be a relative url to APIs that is passed to this service methods.
* @require $http
*/

(function() {
	var appService = function($http) {
		var baseApiUrl = 'https://localhost:44302/api';
		var cachedReqs = {};


		function getFullUrl(url) {
			return [baseApiUrl, url].join('/');
		}

		function executeRequest(config) {
			return $http(config);
		}

		function nonGetRequest(requestType, url, data, headers) {
			var reqHeaders = headers || {};
			if (!reqHeaders['Content-Type']) {
				headers['Content-Type'] = 'application/json';
			}

			var config = {
				method: requestType,
				url: getFullUrl(url),
				data: data,
				headers: reqHeaders
			};
			return executeRequest(config);
		}

		/**
		* @ngdoc method
		* @name get
		* @methodOf raiweb.core.service:appService
		* @description
		* Executes a GET request
		*
		* @param {string} url request relative url
		* @param {object=} params request's GET params object
		* @param {object=} headers request headers object
		*
		* @returns {object} returns a promise object.
		*/
		function get(url, params, headers) {
			var config = {
				method: 'GET',
				url: getFullUrl(url),
				cache: true,
				params: params,
				headers: headers
			};
			return executeRequest(config);
		}

		/**
		* @ngdoc method
		* @name post
		* @methodOf raiweb.core.service:appService
		* @description
		* Executes a POST request
		*
		* @param {string} url request relative url
		* @param {object=} data request data object
		* @param {object=} headers request headers object
		*
		* @returns {object} returns a promise object.
		*/
		function post(url, data, headers) {
			return nonGetRequest('POST', url, data, headers);
		}

		/**
		* @ngdoc method
		* @name put
		* @methodOf raiweb.core.service:appService
		* @description
		* Executes a PUT request
		*
		* @param {string} url request relative url
		* @param {object=} data request data object
		* @param {object=} headers request headers object
		*
		* @returns {object} returns a promise object.
		*/
		function put(url, data, headers) {
			return nonGetRequest('PUT', url, data, headers);
		}

		/**
		* @ngdoc method
		* @name del
		* @methodOf raiweb.core.service:appService
		* @description
		* Executes a DELETE request
		*
		* @param {string} url request relative url
		* @param {object=} data request data object
		* @param {object=} headers request headers object
		*
		* @returns {object} returns a promise object.
		*/
		function del(url, data, headers) {
			return nonGetRequest('DELETE', url, data, headers);
		}

		/**
		* @ngdoc method
		* @name getErrorMessage
		* @methodOf raiweb.core.service:appService
		* @description
		*	This processes the modelState object returned from the webAPI in response
		*	to list all error messages.
		* 	Optionally an html element name can be passed to generate HTML markup for list.
		*	Then the list can be displayed in HTML.
		* @param {object} modelState modelState object from response of web API
		* @param {string=} listHtmlElement html element for list. default is 'li'
		*
		* @returns {string} returns list of error messages in HTML format
		*/
		function getErrorMessage(modelState, listHtmlElement) {
			var errorMessage = [];
			var listHtmlElem = listHtmlElement;
			if (!listHtmlElement) {
				listHtmlElem = 'li';
			}

			if (modelState instanceof Object) {
				for (var key in modelState) {
					modelState[key].filter(function(msg) {
						errorMessage.push('<' + listHtmlElem + '>' + msg + '</' + listHtmlElem + '>');
					});
				}
			}
			return errorMessage.join('');
		}

		return {
			get: get,
			post: post,
			put: put,
			del: del,
			getErrorMessage: getErrorMessage
		};
	};

	appService.$inject = ['$http'];
	module.exports = appService;
})();
