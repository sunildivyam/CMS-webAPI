'use strict';
/*
* @ngdoc service
* @name raiweb.content.service:resourcebrowserService
* @description
*	resourcebrowserService makes calls to APIs for all contents using appService Service methods.
* @require appService
*/

(function() {
	var resourcebrowserService = function(appService) {
		var urls = {
			'resourcebrowser': {
				base: 'resourcebrowser',
				postContentResource: 'PostContentResource',
				getContentResourcesByCategory: 'getContentResourcesByCategory'
			}
		};

		var requestHeaders = {
			'Content-Type': undefined
		};

		var requestOptions = {
			transformRequest: angular.identity
		};

		function uploadContentResource(contentResource) {
			var fd = new FormData();
			fd.append('file', contentResource && contentResource.resourceData);
			var categoryName =  contentResource && contentResource.category && contentResource.category.name;

			return appService.post([urls.resourcebrowser.base, urls.resourcebrowser.postContentResource, categoryName].join('/'),
			fd,
			requestHeaders,
			requestOptions);
		}

		function getContentResourcesByCategory(categoryId) {
			return appService.get([urls.resourcebrowser.base, urls.resourcebrowser.getContentResourcesByCategory, categoryId].join('/'));
		}

		function getToolbarButtons() {
			return [
				{
					id: 'select',
					iconClass: 'glyphicon-ok'
				},
				{
					id: 'preview',
					iconClass: 'glyphicon-picture'
				},
				{
					id: 'upload',
					iconClass: 'glyphicon-upload'
				},
				{
					id: 'delete',
					iconClass: 'glyphicon-remove'
				},
				{
					id: 'download',
					iconClass: 'glyphicon-download'
				}
			];
		}

		function getResourcePubUrl(resource) {
			if (typeof resource === 'undefined') {
				return '';
			}

			var url = appService.getApiServerUrl() + '/api/resourcebrowser/GetContentResource/' +
				(resource.contentResourceId || 0) + '?name=' +
				resource.name + '&thumbnail=false';
			return url;
		}

		return {
			uploadContentResource: uploadContentResource,
			getToolbarButtons: getToolbarButtons,
			getContentResourcesByCategory: getContentResourcesByCategory,
			getResourcePubUrl: getResourcePubUrl
		};
	};
	resourcebrowserService.$inject = ['appService'];
	module.exports = resourcebrowserService;
})();
