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
				getContent: 'GetContent',	// category-name/contentId/categoryName
				getContentsByTag: 'GetContentsByTag',	// tag-id/tag-name/...
				getContentsByUserName: 'GetContentsByUserName'	// userName
			},
			'categories': {
				base: 'categories',
				getCategories: 'getCategories',
				getCategoryByName: 'GetCategoryByName'
			},
			'comments': {
				base: 'comments',
				getCommentsByContentId: 'GetCommentsByContentId',
				postComment: 'PostComment'
			}
		};

		// Default Values
		var CACHE = true;
		var PAGE_SIZE = 10;
		var PAGE_NO = 1;
		var SORT_DIR_ASC = true;
		var SORT_FIELD = 'Title';

		var requestHeaders = {
			'Content-Type': 'application/json'
		};

		// Tags
		function getTags() {
			return appService.get([urls.tags].join('/'), undefined, requestHeaders);
		}

		function getTagById(id) {
			return appService.get([urls.tags, id].join('/'), undefined, requestHeaders);
		}

		// Category
		function getCategories() {
			return appService.get([urls.categories.base, urls.categories.getCategories].join('/'), undefined , requestHeaders, CACHE);
		}

		function getCategoryById(id) {
			return appService.get([urls.categories, id].join('/'), undefined, requestHeaders);
		}

		function getCategoryByName(name) {
			return appService.get([urls.categories.base, urls.categories.getCategoryByName, name].join('/'), undefined, requestHeaders);
		}

		//Content
		function getContentsByCategoryName(name, sortField, sortDireAsc, pageSize) {
			if (typeof sortDireAsc === 'undefined') {
				sortDireAsc = SORT_DIR_ASC;
			}
			return appService.get([urls.contents.base,
				urls.contents.getContentsByCategoryName,
				name,
				PAGE_NO, pageSize || PAGE_SIZE, sortField || SORT_FIELD, sortDireAsc].join('/'), undefined, requestHeaders, CACHE);
		}

		function getContentsByTag(tagId, tagName, pageNo, pageSize) {
			var sortDireAsc = false;
			var sortField = 'PublishedDate';

			return appService.get([urls.contents.base,
				urls.contents.getContentsByTag,
				tagId,
				tagName,
				pageNo || PAGE_NO, pageSize || PAGE_SIZE, sortField || SORT_FIELD, sortDireAsc].join('/'), undefined, requestHeaders, CACHE);
		}

		function getContentsByUserName(userName, pageNo, pageSize) {
			var sortDireAsc = false;
			var sortField = 'PublishedDate';

			return appService.get([urls.contents.base,
				urls.contents.getContentsByUserName,
				userName,
				pageNo || PAGE_NO, pageSize || PAGE_SIZE, sortField || SORT_FIELD, sortDireAsc].join('/'), undefined, requestHeaders, CACHE);
		}

		function getContent(categoryName, contentId, contentName) {
			return appService.get([urls.contents.base,
				urls.contents.getContent,
				categoryName,
				contentId,
				contentName].join('/'), undefined, requestHeaders, CACHE);
		}

		//Comments
		function getCommentsByContentId(contentId) {
			return appService.get([urls.comments.base, urls.comments.getCommentsByContentId, contentId].join('/'));
		}

		function addComment(comment) {
			return appService.post([urls.comments.base, urls.comments.postComment].join('/'), comment, requestHeaders);
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

		function getUniqueTagsOfTags(tags) {
			var distinctTags = new EntityMapper(Tag).toEntities();
			var unique = {};

			tags.filter(function(tag) {
				if (!unique[tag.tagId]) {
					distinctTags.push(tag);
					unique[tag.tagId] = true;
				}
			});

			return distinctTags;
		}

		return {
			getTags: getTags,
			getTagById: getTagById,
			getCategories: getCategories,
			getCategoryById: getCategoryById,
			getCategoryByName: getCategoryByName,
			getContentsByCategoryName: getContentsByCategoryName,
			getContentsByTag: getContentsByTag,
			getContent: getContent,
			getUniqueTagsOfContents: getUniqueTagsOfContents,
			getUniqueTagsOfTags: getUniqueTagsOfTags,
			getContentsByUserName: getContentsByUserName,
			getCommentsByContentId: getCommentsByContentId,
			addComment: addComment
		};
	};
	pubcontentService.$inject = ['appService', 'EntityMapper', 'Tag'];
	module.exports = pubcontentService;
})();
