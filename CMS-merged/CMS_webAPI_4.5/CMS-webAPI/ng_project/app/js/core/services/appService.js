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
	var appService = function($http, appConfig) {
		// This is the base URL prepended to all Image (resource) link in the content data, while saving
		// This must be processed/replaced with Real API Server Url from appService.getApiServerUrl, before rendering on Page.
		// or before rendering in CK Editor
		// Use method encodeContent() to convert Keyword to real Url
		// Use method decodeContent() to real Url to keyWord.

		var API_SERVER_DUMMY_URL = appConfig.appUrls.API_SERVER_DUMMY_URL;
		var API_SERVER_URL = appConfig.appUrls.API_SERVER_URL;
		var JSON_DATA_BASE_URL = appConfig.appUrls.JSON_DATA_BASE_URL;
		var ARTICLE_IMAGES_URL = appConfig.appUrls.ARTICLE_IMAGES_URL;
		var QUIZ_IMAGES_URL = appConfig.appUrls.QUIZ_IMAGES_URL;
		var CATEGORY_IMAGES_URL = appConfig.appUrls.CATEGORY_IMAGES_URL;
		var AUTHOR_ARTICLE_IMAGES_URL = appConfig.appUrls.AUTHOR_ARTICLE_IMAGES_URL;
		var USER_IMAGES_URL = appConfig.appUrls.USER_IMAGES_URL;
		var baseApiUrl = appConfig.appUrls.baseApiUrl;

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
		
		function getErrorMessage(errorOrRejection) {
			var errorMsg = '';
			if (typeof errorOrRejection === 'string') {
				errorMsg = errorOrRejection;
			} else if (errorOrRejection && errorOrRejection.data && errorOrRejection.data.ModelState instanceof Object) {
				var modelState = errorOrRejection.data.ModelState;
				var errorMessage = [];
				var listHtmlElem = 'li';

				for (var key in modelState) {
					modelState[key].filter(function(msg) {
						errorMessage.push('<' + listHtmlElem + '>' + msg + '</' + listHtmlElem + '>');
					});
				}
				errorMsg = errorMessage.join('');
			} else if(errorOrRejection && errorOrRejection.status && errorOrRejection.statusText) {
				errorMsg = [
					'<h3>',
					errorOrRejection.status,
					'</h3><p>',
					errorOrRejection.statusText,
					'</p>'
				].join('');
			} else {
				errorMsg = 'UNKNOWN';
			}

			return errorMsg;
		}

		function getApiServerUrl() {
			return API_SERVER_URL;
		}

		function getApiServerDummyUrl() {
			return API_SERVER_DUMMY_URL;
		}

		function getArticleImagesUrl() {
			return ARTICLE_IMAGES_URL;
		}

		function getQuizImagesUrl() {
			return QUIZ_IMAGES_URL;
		}

		function getAuthorArticleImagesUrl() {
			return AUTHOR_ARTICLE_IMAGES_URL;
		}

		function getUserImagesUrl() {
			return USER_IMAGES_URL;
		}

		function getCategoryImagesUrl() {
			return CATEGORY_IMAGES_URL;
		}

		return {
			get: get,
			post: post,
			put: put,
			del: del,
			getErrorMessage: getErrorMessage,
			getApiServerUrl: getApiServerUrl,
			getApiServerDummyUrl: getApiServerDummyUrl,
			getArticleImagesUrl: getArticleImagesUrl,
			getQuizImagesUrl: getQuizImagesUrl,
			getAuthorArticleImagesUrl: getAuthorArticleImagesUrl,
			getUserImagesUrl: getUserImagesUrl,
			getCategoryImagesUrl: getCategoryImagesUrl
		};
	};

	appService.$inject = ['$http', 'appConfig'];
	module.exports = appService;
})();
