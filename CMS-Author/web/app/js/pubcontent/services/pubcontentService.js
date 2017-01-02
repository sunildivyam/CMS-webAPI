'use strict';
/*
* @ngdoc service
* @name raiweb.content.service:pubcontentService
* @description
*	pubcontentService makes calls to APIs for all contents using appService Service methods.
* @require appService
*/

(function() {
	var pubcontentService = function(appService, EntityMapper, Tag) {
		var urls = {
			'tags': {
				base: 'tags'
			},
			'contents': {
				base: 'contents',
				getContentsByCategoryName: 'GetContentsByCategoryName', // ceetgory-name
				getContent: 'GetContent'	// category-name/contentId/categoryName
			},
			'categories': {
				base: 'categories',
				getCategories: 'getCategories',
				getCategoryByName: 'GetCategoryByName'
			}
		};

		// Default Values
		var CACHE = true;
		var PAGE_SIZE = 10;
		var PAGE_NO = 1;
		var SORT_DIR_ASC = true;
		var SORT_FIELD = 'Title';

		// Tags
		function getTags() {
			return appService.get([urls.tags].join('/'));
		}

		function getTagById(id) {
			return appService.get([urls.tags, id].join('/'));
		}

		// Category
		function getCategories() {
			return appService.get([urls.categories.base, urls.categories.getCategories].join('/'), undefined , undefined, CACHE);
		}

		function getCategoryById(id) {
			return appService.get([urls.categories, id].join('/'));
		}

		function getCategoryByName(name) {
			return appService.get([urls.categories.base, urls.categories.getCategoryByName, name].join('/'));
		}

		//Content
		function getContentsByCategoryName(name, sortField, sortDireAsc) {
			if (typeof sortDireAsc === 'undefined') {
				sortDireAsc = SORT_DIR_ASC;
			}
			return appService.get([urls.contents.base,
				urls.contents.getContentsByCategoryName,
				name,
				PAGE_NO, PAGE_SIZE, sortField || SORT_FIELD, sortDireAsc].join('/'),
				undefined , undefined, CACHE);
		}

		function getContent(categoryName, contentId, contentName) {
			return appService.get([urls.contents.base,
				urls.contents.getContent,
				categoryName,
				contentId,
				contentName].join('/'),
				undefined , undefined, CACHE);
		}


		function getUniqueTagsOfContents(contents) {
			var distinctTags = new EntityMapper(Tag).toEntities();
			if (contents instanceof Array) {
				var unique = {};
				contents.filter(function(content) {
					if (content.tags instanceof Array) {
						content.tags.filter(function(tag) {
							if (!unique[tag.tagId]) {
								distinctTags.push(tag);
								unique[tag.tagId] = true;
							}
						});
					}
				});
			}
			return distinctTags;
		}

		return {
			getTags: getTags,
			getTagById: getTagById,
			getCategories: getCategories,
			getCategoryById: getCategoryById,
			getCategoryByName: getCategoryByName,
			getContentsByCategoryName: getContentsByCategoryName,
			getContent: getContent,
			getUniqueTagsOfContents: getUniqueTagsOfContents
		};
	};
	pubcontentService.$inject = ['appService', 'EntityMapper', 'Tag'];
	module.exports = pubcontentService;
})();
