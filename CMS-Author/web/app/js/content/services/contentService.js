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
			'tags': {
				base: 'tags',
				getTags: 'GetTags',
				getTag: 'GetTag',
				addTag: 'PostTag',
				updateTag: 'PutTag',
				deleteTag: 'DeleteTag'
			},
			'authorContents': {
				base: 'authorContents',
				getAuthorContents: 'GetAuthorContents',
				getPublishedContents: 'GetPublishedAuthorContents',
				getAuthorContent: 'GetAuthorContent',
				addAuthorContent: 'PostAuthorContent',
				updateAuthorContent: 'PutAuthorContent',
				deleteAuthorContent: 'DeleteAuthorContent',
				publishContent: 'PostPublishContent'
			},
			'categories': {
				base: 'categories',
				getCategories: 'GetCategories',
				getCategory: 'GetCategory',
				addCategory: 'PostCategory',
				updateCategory: 'PutCategory',
				deleteCategory: 'DeleteCategory'
			}
		};
		// Tags
		function getTags() {
			return appService.get([urls.tags.base, urls.tags.getTags].join('/'));
		}

		function getTagById(id) {
			return appService.get([urls.tags.base, urls.tags.getTag, id].join('/'));
		}

		function addNewTag(tag) {
			return appService.post([urls.tags.base, urls.tags.addTag].join('/'), tag);
		}

		function updateTag(tag) {
			return appService.put([urls.tags.base, urls.tags.updateTag, tag.tagId].join('/'), tag);
		}

		function deleteTag(id) {
			return appService.del([urls.tags.base, urls.tags.deleteTag, id].join('/'));
		}


		// Category
		function getCategories() {
			return appService.get([urls.categories.base, urls.categories.getCategories].join('/'));
		}

		function getCategoryById(id) {
			return appService.get([urls.categories.base, urls.categories.getCategory, id].join('/'));
		}

		function addNewCategory(category) {
			return appService.post([urls.categories.base, urls.categories.addCategory].join('/'), category);
		}

		function updateCategory(category) {
			return appService.put([urls.categories.base, urls.categories.updateCategory, category && category.categoryId].join('/'), category);
		}

		function deleteCategory(id) {
			return appService.del([urls.categories.base, urls.categories.deleteCategory, id].join('/'));
		}


		//Content
		function getDraftedContents() {
			return appService.get([urls.authorContents.base, urls.authorContents.getAuthorContents].join('/'));
		}

		function getPublishedContents() {
			return appService.get([urls.authorContents.base, urls.authorContents.getPublishedContents].join('/'));
		}

		function getContentById(id) {
			return appService.get([urls.authorContents.base, urls.authorContents.getAuthorContent, id].join('/'));
		}

		function addNewContent(content) {
			return appService.post([urls.authorContents.base, urls.authorContents.addAuthorContent].join('/'), content);
		}

		function updateContent(content) {
			return appService.put([urls.authorContents.base, urls.authorContents.updateAuthorContent, content && content.authorContentId].join('/'), content);
		}

		function deleteContent(id) {
			return appService.del([urls.authorContents.base, urls.authorContents.deleteAuthorContent, id].join('/'));
		}

		function publishContent(content) {
			return appService.post([urls.authorContents.base, urls.authorContents.publishContent, content && content.authorContentId].join('/'), content);
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
			getPublishedContents: getPublishedContents,
			getContentById: getContentById,
			addNewContent: addNewContent,
			updateContent: updateContent,
			deleteContent: deleteContent,
			publishContent: publishContent
		};
	};
	contentService.$inject = ['appService'];
	module.exports = contentService;
})();
