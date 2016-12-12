'use strict';
/*
* @ngdoc service
* @name raiweb.content.service:contentService
* @description
*	contentService makes calls to APIs for all contents using appService Service methods.
* @require appService
*/

(function() {
	var contentService = function(appService) {
		var urls = {
			'tags': 'tags',
			'categories': "categories",
			'authorContents': 'authorcontents'
		};
		// Tags
		function getTags() {
			return appService.get([urls.tags].join('/'));
		}

		function getTagById(id) {
			return appService.get([urls.tags, id].join('/'));
		}

		function addNewTag(tag) {
			return appService.post([urls.tags].join('/'), tag);
		}

		function updateTag(tag) {
			return appService.put([urls.tags, tag && tag.tagId].join('/'), tag);
		}

		function deleteTag(id) {
			return appService.del([urls.tags, id].join('/'));
		}


		// Category
		function getCategories() {
			return appService.get([urls.categories].join('/'));
		}

		function getCategoryById(id) {
			return appService.get([urls.categories, id].join('/'));
		}

		function addNewCategory(category) {
			return appService.post([urls.categories].join('/'), category);
		}

		function updateCategory(category) {
			return appService.put([urls.categories, category && category.categoryId].join('/'), category);
		}

		function deleteCategory(id) {
			return appService.del([urls.categories, id].join('/'));
		}


		//Content
		function getDraftedContents() {
			return appService.get([urls.authorContents].join('/'));
		}

		function getContentById(id) {
			return appService.get([urls.authorContents, id].join('/'));
		}

		function addNewContent(content) {
			return appService.post([urls.authorContents].join('/'), content);
		}

		function updateContent(content) {
			return appService.put([urls.authorContents, content && content.authorContentId].join('/'), content);
		}

		function deleteContent(id) {
			return appService.del([urls.authorContents, id].join('/'));
		}

		return {
			getTags: getTags,
			getTagById: getTagById,
			addNewTag: addNewTag,
			updateTag: updateTag,
			deleteTag: deleteTag,
			getCategories: getCategories,
			getCategoryById: getCategoryById,
			addNewCategory: addNewCategory,
			updateCategory: updateCategory,
			deleteCategory: deleteCategory,
			getDraftedContents: getDraftedContents,
			getContentById: getContentById,
			addNewContent: addNewContent,
			updateContent: updateContent,
			deleteContent: deleteContent
		};
	};
	contentService.$inject = ['appService'];
	module.exports = contentService;
})();
