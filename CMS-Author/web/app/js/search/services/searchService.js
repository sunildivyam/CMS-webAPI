'use strict';
/*
*	searchService Service
*	Description
* 	searchService Service Search Functionality
*/
(function() {
	var searchService = function(appService, Category) {
		var urls = {
			'search': {
				base: 'contents',
				getSearchResults: 'GetSearchResults'
			}
		};

		// Default Values
		var CACHE = false;
		var PAGE_SIZE = 10;
		var PAGE_NO = 1;
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

		function getPageSize() {
			return PAGE_SIZE;
		}

		function getDefaultCategory() {
			return new Category({
				Name: 'all',
				Title: 'All'
			});
		}

		return {
			searchContents: searchContents,
			getPageSize: getPageSize,
			getDefaultCategory: getDefaultCategory
		};
	};
	searchService.$inject = ['appService', 'Category'];
	module.exports = searchService;
})();
