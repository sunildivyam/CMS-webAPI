'use strict';
/*
* @ngdoc service
* @name raiweb.content.service:pubcontentService
* @description
*	pubcontentService makes calls to APIs for all contents using appService Service methods.
* @require appService
*/

(function() {
	var pubcontentService = function(appService, EntityMapper, Tag, $q, $timeout) {
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
				getCommentsByQuizId: 'GetCommentsByQuizId',
				getCommentsByQuestionId: 'GetCommentsByQuestionId',
				postComment: 'PostComment',
				postQuizComment: 'PostQuizComment',
				postQuestionComment: 'PostQuestionComment'
			},
			'quizs': {
				base: 'quizs',
				getQuizs: 'GetLiveQuizsWithTags',
				getQuizsByAuthorName: 'GetLiveQuizsWithTagsByAuthorName',
				getQuiz: 'GetLiveQuizWithTagsAndQuestions',
				getQuizsByTag: 'GetLiveQuizsWithTagsByTag',
				getQuestionsByTag: 'GetLiveQuestionsWithTagsByTag',
				getQuestion: 'getLiveQuestionWithTags'
			},
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
			var copy = {data: window._currentCategory};
			if (window._currentCategory && window._currentCategory.Name == name) {
				var deferredObj = $q.defer();
				$timeout(function() {
					deferredObj.resolve(angular.copy(copy));
				});		
				window._currentCategory = undefined;		
				return deferredObj.promise;
			}
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
			var copy ={data: window._currentArticle};
			if (window._currentArticle && window._currentArticle.Name == contentName && window._currentArticle.ContentId == contentId) {
				var deferredObj = $q.defer();
				$timeout(function() {
					deferredObj.resolve(angular.copy(copy));					
				});
				window._currentArticle = undefined;				
				return deferredObj.promise;
			}

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

		function getCommentsByQuizId(quizId) {
			return appService.get([urls.comments.base, urls.comments.getCommentsByQuizId, quizId].join('/'));
		}

		function getCommentsByQuestionId(questionId) {
			return appService.get([urls.comments.base, urls.comments.getCommentsByQuestionId, questionId].join('/'));
		}

		function addComment(comment) {
			return appService.post([urls.comments.base, urls.comments.postComment].join('/'), comment, requestHeaders);
		}

		function addQuizComment(comment) {
			return appService.post([urls.comments.base, urls.comments.postQuizComment].join('/'), comment, requestHeaders);
		}

		function addQuestionComment(comment) {
			return appService.post([urls.comments.base, urls.comments.postQuestionComment].join('/'), comment, requestHeaders);
		}


		// Quizs

		function getQuizs(sortField, sortDireAsc, pageSize, pageNo) {
			if (typeof sortDireAsc === 'undefined') {
				sortDireAsc = SORT_DIR_ASC;
			}
			return appService.get([urls.quizs.base,
				urls.quizs.getQuizs,
				pageNo || PAGE_NO, pageSize || PAGE_SIZE, sortField || SORT_FIELD, sortDireAsc].join('/'), undefined, requestHeaders, CACHE);
		}

		function getQuiz(quizId, quizName) {
			var copy = angular.copy({data: window._currentQuiz});
			if (window._currentQuiz && window._currentQuiz.Name == quizName && window._currentQuiz.QuizId == quizId) {
				var deferredObj = $q.defer();
				$timeout(function() {
					deferredObj.resolve(copy);					
				});	
				window._currentQuiz = undefined;			
				return deferredObj.promise;
			}
			return appService.get([urls.quizs.base,
				urls.quizs.getQuiz,
				quizId,
				quizName].join('/'), undefined, requestHeaders, CACHE);
		}

		function getQuestion(questionId) {
			return appService.get([urls.quizs.base,
				urls.quizs.getQuestion,
				questionId].join('/'), undefined, requestHeaders, CACHE);
		}

		function getQuizsByTag(tagId, tagName, pageNo, pageSize) {
			var sortDireAsc = false;
			var sortField = 'UpdatedDate';

			return appService.get([urls.quizs.base,
				urls.quizs.getQuizsByTag,
				tagId,
				tagName,
				pageNo || PAGE_NO, pageSize || PAGE_SIZE, sortField || SORT_FIELD, sortDireAsc].join('/'), undefined, requestHeaders, CACHE);
		}
		
		function getQuizsByAuthorName(userName, sortField, sortDireAsc, pageSize, pageNo) {			
			return appService.get([urls.quizs.base,
				urls.quizs.getQuizsByAuthorName,
				userName,
				pageNo || PAGE_NO, pageSize || PAGE_SIZE, sortField || SORT_FIELD, sortDireAsc].join('/'), undefined, requestHeaders, CACHE);
		}
		
		function getQuestionsByTag(tagId, tagName, pageNo, pageSize) {
			var sortDireAsc = false;
			var sortField = 'UpdatedDate';

			return appService.get([urls.quizs.base,
				urls.quizs.getQuestionsByTag,
				tagId,
				tagName,
				pageNo || PAGE_NO, pageSize || PAGE_SIZE, sortField || SORT_FIELD, sortDireAsc].join('/'), undefined, requestHeaders, CACHE);
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
			getQuizsByTag: getQuizsByTag,
			getQuestionsByTag: getQuestionsByTag,
			getContent: getContent,
			getUniqueTagsOfContents: getUniqueTagsOfContents,
			getUniqueTagsOfTags: getUniqueTagsOfTags,
			getContentsByUserName: getContentsByUserName,
			getCommentsByContentId: getCommentsByContentId,
			getCommentsByQuizId: getCommentsByQuizId,
			getCommentsByQuestionId: getCommentsByQuestionId,
			addComment: addComment,
			addQuizComment: addQuizComment,
			addQuestionComment: addQuestionComment,
			getQuizs: getQuizs,
			getQuizsByAuthorName: getQuizsByAuthorName,
			getQuiz: getQuiz,
			getQuestion: getQuestion
		};
	};
	pubcontentService.$inject = ['appService', 'EntityMapper', 'Tag',  '$q', '$timeout'];
	module.exports = pubcontentService;
})();
