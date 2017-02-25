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
		// This is the base URL prepended to all Image (resource) link in the content data, while saving
		// This must be processed/replaced with Real API Server Url from appService.getApiServerUrl, before rendering on Page.
		// or before rendering in CK Editor
		// Use method encodeContent() to convert Keyword to real Url
		// Use method decodeContent() to real Url to keyWord.
		var API_SERVER_DUMMY_URL = '/CMSSERVERAPIURL/';
		var API_SERVER_URL = 'https://api.cmsweb.red'; //62287
		var JSON_DATA_BASE_URL = '/data/';

		var baseApiUrl = API_SERVER_URL + '/api';

		function getFullUrl(url) {
			if (url.indexOf(JSON_DATA_BASE_URL) === 0) {
				return url;
			}

			return [baseApiUrl, url].join('/');
		}

		function executeRequest(config) {
			angular.extend(config.headers || {}, {'Accept': '*/*'});
			return $http(config);
		}

		function nonGetRequest(requestType, url, data, headers, options) {
			var reqHeaders = headers || {};
			var config = {
				method: requestType,
				url: getFullUrl(url),
				data: data,
				headers: reqHeaders
			};

			if (options instanceof Object) {
				angular.extend(config, options);
			}

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
		function get(url, params, headers, cache) {
			var config = {
				method: 'GET',
				url: getFullUrl(url),
				cache: cache || false,
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
		function post(url, data, headers, options) {
			return nonGetRequest('POST', url, data, headers, options);
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

		function getApiServerUrl() {
			return API_SERVER_URL;
		}

		function getApiServerDummyUrl() {
			return API_SERVER_DUMMY_URL;
		}

		return {
			get: get,
			post: post,
			put: put,
			del: del,
			getErrorMessage: getErrorMessage,
			getApiServerUrl: getApiServerUrl,
			getApiServerDummyUrl: getApiServerDummyUrl
		};
	};

	appService.$inject = ['$http'];
	module.exports = appService;
})();
