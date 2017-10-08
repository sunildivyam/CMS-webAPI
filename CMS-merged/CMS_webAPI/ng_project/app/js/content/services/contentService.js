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
				addTags: 'PostTags',
				updateTag: 'PutTag',
				deleteTag: 'DeleteTag'
			},
			'authorContents': {
				base: 'authorContents',
				getAuthorContents: 'GetAuthorContents',
				getPublishedContents: 'GetPublishedAuthorContents',
				getContentAuthoringHistory: 'getContentAuthoringHistory',
				getAuthorContent: 'GetAuthorContent',
				addAuthorContent: 'PostAuthorContent',
				updateAuthorContent: 'PutAuthorContent',
				deleteAuthorContent: 'DeleteAuthorContent',
				publishContent: 'PostPublishContent',
				uploadContentThumbnail: 'PostContentThumbnail'
			},
			'categories': {
				base: 'categories',
				getCategories: 'GetCategories',
				getCategory: 'GetCategory',
				addCategory: 'PostCategory',
				updateCategory: 'PutCategory',
				deleteCategory: 'DeleteCategory'
			},
			'quizs': {
				base: 'quizs',
				getQuizById: 'GetQuiz',
				postQuizBasicInfo: "PostQuizBasicInfo",
				postQuizTags: "PostQuizTags",
				postQuizQuestions: "PostQuizQuestions",
				postQuestion: "PostQuestion",
				postPublishQuiz: "PostPublishQuiz",
				getDraftedQuizs: 'GetDraftedQuizs',
				getPublishedQuizs: 'GetPublishedQuizs',
				getPublishedQuestions: 'GetPublishedQuestions'
			}
		};

		var requestHeaders = {
			'Content-Type': 'application/json'
		};

		// Tags
		function getTags() {
			return appService.get([urls.tags.base, urls.tags.getTags].join('/'));
		}

		function getTagById(id) {
			return appService.get([urls.tags.base, urls.tags.getTag, id].join('/'));
		}

		function addNewTag(tag) {
			return appService.post([urls.tags.base, urls.tags.addTag].join('/'), tag, requestHeaders);
		}
		function addNewTags(tags) {
			return appService.post([urls.tags.base, urls.tags.addTags].join('/'), tags, requestHeaders);
		}
		function updateTag(tag) {
			// return appService.put([urls.tags.base, urls.tags.updateTag, tag.tagId].join('/'), tag, requestHeaders);
			return appService.post([urls.tags.base, urls.tags.updateTag, tag.tagId].join('/'), tag, requestHeaders);
		}

		function deleteTag(id) {
			return appService.del([urls.tags.base, urls.tags.deleteTag, id].join('/'), requestHeaders);
		}


		// Category
		function getCategories() {
			return appService.get([urls.categories.base, urls.categories.getCategories].join('/'));
		}

		function getCategoryById(id) {
			return appService.get([urls.categories.base, urls.categories.getCategory, id].join('/'));
		}

		function addNewCategory(category) {
			return appService.post([urls.categories.base, urls.categories.addCategory].join('/'), category, requestHeaders);
		}

		function updateCategory(category) {
			// return appService.put([urls.categories.base, urls.categories.updateCategory, category && category.categoryId].join('/'), category, requestHeaders);
			return appService.post([urls.categories.base, urls.categories.updateCategory, category && category.categoryId].join('/'), category, requestHeaders);
		}

		function deleteCategory(id) {
			return appService.del([urls.categories.base, urls.categories.deleteCategory, id].join('/'), requestHeaders);
		}


		//Content
		function getDraftedContents() {
			return appService.get([urls.authorContents.base, urls.authorContents.getAuthorContents].join('/'));
		}

		function getPublishedContents() {
			return appService.get([urls.authorContents.base, urls.authorContents.getPublishedContents].join('/'));
		}

		function getContentAuthoringHistory(contentId) {
			return appService.get([urls.authorContents.base, urls.authorContents.getContentAuthoringHistory, contentId].join('/'));
		}

		function getContentById(id) {
			return appService.get([urls.authorContents.base, urls.authorContents.getAuthorContent, id].join('/'));
		}

		function addNewContent(content, existingAuthorContentId) {
			return appService.post([urls.authorContents.base, urls.authorContents.addAuthorContent, existingAuthorContentId || 0].join('/'), content, requestHeaders);
		}

		function updateContent(content) {
			// return appService.put([urls.authorContents.base, urls.authorContents.updateAuthorContent, content && content.authorContentId].join('/'), content, requestHeaders);
			return appService.post([urls.authorContents.base, urls.authorContents.updateAuthorContent, content && content.authorContentId].join('/'), content, requestHeaders);
		}

		function deleteContent(id) {
			return appService.del([urls.authorContents.base, urls.authorContents.deleteAuthorContent, id].join('/'), requestHeaders);
		}

		function publishContent(content) {
			return appService.post([urls.authorContents.base, urls.authorContents.publishContent, content && content.authorContentId].join('/'), content, requestHeaders);
		}

		function uploadContentThumbnail(contentId, thumbnailData) {
			var requestHeaders = {
				'Content-Type': undefined
			};

			var requestOptions = {
				transformRequest: angular.identity
			};

			var fd = new FormData();
			fd.append('file', thumbnailData);
			return appService.post([urls.authorContents.base, urls.authorContents.uploadContentThumbnail, contentId].join('/'),
			fd,
			requestHeaders,
			requestOptions);
		}

		///// QUIZZES
		function getQuizById(id) {
			return appService.get([urls.quizs.base, urls.quizs.getQuizById, id].join('/'));
		}

		function addQuizBasicInfo(quiz) {
			return appService.post([urls.quizs.base, urls.quizs.postQuizBasicInfo].join('/'), quiz, requestHeaders);
		}

		function updateQuizTags(quiz) {
			return appService.post([urls.quizs.base, urls.quizs.postQuizTags].join('/'), quiz, requestHeaders);
		}

		function updateQuizQuestions(quiz) {
			return appService.post([urls.quizs.base, urls.quizs.postQuizQuestions].join('/'), quiz, requestHeaders);
		}
		
		function updateQuestion(quiz) {
			return appService.post([urls.quizs.base, urls.quizs.postQuestion].join('/'), quiz, requestHeaders);
		}

		function publishQuiz(quiz) {
			return appService.post([urls.quizs.base, urls.quizs.postPublishQuiz].join('/'), quiz, requestHeaders);
		}

		function getDraftedQuizs() {
			return appService.get([urls.quizs.base, urls.quizs.getDraftedQuizs].join('/'));
		}

		function getPublishedQuizs() {
			return appService.get([urls.quizs.base, urls.quizs.getPublishedQuizs].join('/'));
		}
		
		function getPublishedQuestions() {
			return appService.get([urls.quizs.base, urls.quizs.getPublishedQuestions].join('/'));
		}

		return {
			getTags: getTags,
			getTagById: getTagById,
			addNewTag: addNewTag,
			addNewTags: addNewTags,
			updateTag: updateTag,
			deleteTag: deleteTag,
			getCategories: getCategories,
			getCategoryById: getCategoryById,
			addNewCategory: addNewCategory,
			updateCategory: updateCategory,
			deleteCategory: deleteCategory,
			getDraftedContents: getDraftedContents,
			getPublishedContents: getPublishedContents,
			getContentAuthoringHistory: getContentAuthoringHistory,
			getContentById: getContentById,
			addNewContent: addNewContent,
			updateContent: updateContent,
			deleteContent: deleteContent,
			publishContent: publishContent,
			uploadContentThumbnail: uploadContentThumbnail,
			getQuizById: getQuizById,
			addQuizBasicInfo: addQuizBasicInfo,
			updateQuizTags: updateQuizTags,
			updateQuizQuestions: updateQuizQuestions,
			updateQuestion: updateQuestion,
			publishQuiz: publishQuiz,
			getDraftedQuizs: getDraftedQuizs,
			getPublishedQuizs: getPublishedQuizs,
			getPublishedQuestions: getPublishedQuestions
		};
	};
	contentService.$inject = ['appService'];
	module.exports = contentService;
})();
