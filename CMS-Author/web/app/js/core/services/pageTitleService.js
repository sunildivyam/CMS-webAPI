'use strict';
/*
*	pageTitleService Service
*	Description
* 	pageTitleService Service Privides Page Titles to the Application
*/
(function() {
	var pageTitleService = function($rootScope) {
		var pageTitle = '';

		function getPageTitle() {
			return pageTitle;
		}

		function setPageTitle(title) {
			var application = $rootScope && $rootScope.application || {};
			if (typeof title === 'string') {
				pageTitle = [application.shortTitle || '',  title || ''].join(' | ');
			} else {
				pageTitle = [application.shortTitle || '',  application.title || ''].join(' | ');
			}
		}

		return {
			getPageTitle: getPageTitle,
			setPageTitle: setPageTitle
		};
	};
	pageTitleService.$inject = ['$rootScope'];
	module.exports = pageTitleService;
})();
