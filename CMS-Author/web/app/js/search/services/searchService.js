'use strict';
/*
*	searchService Service
*	Description
* 	searchService Service Search Functionality
*/
(function() {
	var searchService = function(appService) {
		var urls = {
			'search': {
				base: 'contents',
				getSearchResults: 'GetSearchResults'
			}
		};

		// Default Values
		var CACHE = false;
		var PAGE_SIZE = 1;
		var PAGE_NO = 0;
		var SORT_DIR_ASC = true;
		var SORT_FIELD = 'Title';

		function searchContents(categoryName, keywords, pageNo, pageSize) {
			return appService.get([urls.search.base,
				urls.search.getSearchResults,
				categoryName,
				keywords,
				pageNo || PAGE_NO, pageSize || PAGE_SIZE, SORT_FIELD, SORT_DIR_ASC].join('/'),
				undefined , undefined, CACHE);
		}

		return {
			searchContents: searchContents
		};
	};
	searchService.$inject = ['appService'];
	module.exports = searchService;
})();
