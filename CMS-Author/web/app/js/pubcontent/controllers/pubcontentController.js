'use strict';
/*
*	pubcontentController
*	Description
*	pubcontentController controls the content page Level Scope Data.
*/

(function() {
	var pubcontentController = function($rootScope, $scope, $state, appService, pubcontentService, modalService, Content, Tag, Category, EntityMapper, metaInformationService, pageTitleService, Utils) {
		$scope.currentContent = new Content();
		$scope.currentCategory = new Category();
		var CONTENT_LIST_TYPES = {
			'POPULAR': 'popular',	// Order By visitCount desc
			'LATEST': 'latest',		// Order By PublishDate desc
			'RELEVANT': 'relevant',	// On Random
			'RELATED': 'related'	// On Random
		};

		// ContentListings

		// $scope[popular or latest or relevant or related] = {
		// 	contents: new EntityMapper(Content).toEntities(),
		// 	category: new Category(),
		// 	uniqueTags: new EntityMapper(Category).toEntities()
		// };

		function setMetaInfo(content) {
			if (content instanceof Object) {
				metaInformationService.setMetaDescription(content.description);
				metaInformationService.setMetaKeywords(content.name);
				pageTitleService.setPageTitle(content.title);
			} else {
				metaInformationService.resetMetaDescription();
				metaInformationService.resetMetaKeywords();
				pageTitleService.setPageTitle();
			}
		}

		function getContentsByCategoryName_ByListType(name, listType) {
			var sortField;
			var sortDirAsc;

			switch (listType) {
				case CONTENT_LIST_TYPES.POPULAR:
					sortField = 'VisitCount';
					sortDirAsc = false;
					break;
				case CONTENT_LIST_TYPES.LATEST:
					sortField = 'PublishedDate';
					sortDirAsc = false;
					break;
				case CONTENT_LIST_TYPES.RELEVANT:
					sortField = 'Title';
					sortDirAsc = true;
					break;
				case CONTENT_LIST_TYPES.RELATED:
					sortField = 'CategoryId';
					sortDirAsc = true;
					break;
				default:
					sortField = 'Title';
					sortDirAsc = false;
					break;
			}

			if (name) {
				pubcontentService.getContentsByCategoryName(name, sortField, sortDirAsc).then(function(response) {
					if (response && response.data) {
						$scope[listType] = {};
						$scope[listType].contents = new EntityMapper(Content).toEntities(response.data.Contents);
						$scope[listType].category = new Category(response.data.Category);
						$scope[listType].uniqueTags = pubcontentService.getUniqueTagsOfContents($scope[listType].contents);
						$scope[listType].totalCount = response.data.TotalCount;
					} else {
						$scope[listType].contents = undefined;
						$scope[listType].category = undefined;
						$scope[listType].uniqueTags = undefined;
						$scope[listType].totalCount = 0;
					}
				}, function() {
					//
				});
			} else {
				//
			}
		}

		function getContentsByCategoryName_mostPopular(name) {
			getContentsByCategoryName_ByListType(name, CONTENT_LIST_TYPES.POPULAR);
		}

		function getContentsByCategoryName_latest(name) {
			getContentsByCategoryName_ByListType(name, CONTENT_LIST_TYPES.LATEST);
		}

		function getContentsByCategoryName_relevant(name) {
			getContentsByCategoryName_ByListType(name, CONTENT_LIST_TYPES.RELEVANT);
		}

		function getContentsByCategoryName_related(name) {
			getContentsByCategoryName_ByListType(name, CONTENT_LIST_TYPES.RELATED);
		}

		function getCategoryByName(name) {
			if (name) {
				pubcontentService.getCategoryByName(name).then(function(response) {
					if (response && response.data) {
						$scope.currentCategory = new Category(response.data);
					} else {
						$scope.currentCategory = new Category();
					}
				}, function(rejection) {
					onNoCategory();
				});
			} else {
				onNoCategory();
			}

			function onNoCategory() {
				modalService.alert('md',
				'No Category found',
				'Reason/s: ' + (appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') || 'Content Not Found.') ,
				'Go to Home').result.then(function() {
					$state.go('pub');
				}, function() {
					$state.go('pub');
				});
			}
		}

		function getContent(categoryName, contentId, contentName) {
			if (categoryName && contentId && contentName) {
				pubcontentService.getContent(categoryName, contentId, contentName).then(function(response) {
					var content = new Content(response && response.data);
					content.description = Utils.decodeContent(content.description);
					$scope.currentContent = content;
				}, function(rejection) {
					modalService.alert('md',
					'No Content found',
					'Reason/s: ' + (appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') || 'Content Not Found.') ,
					'Go to Back').result.then(function() {
						$state.go('pub.articles', {n: $scope.currentCategory && $scope.currentCategory.name});
					}, function() {
						$state.go('pub.articles');
					});
				});
			} else {
				//
			}
		}

		$scope.onContentSelect = function(event, content) {
			if (content) {
				$state.go('pub.articles.content', {
					n: content.category && content.category.name,
					ci: content.contentId,
					cn: content.name
				});
			}
		};

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams/*, fromState , fromParams*/) {
			if (toState && toState.name && toParams) {
				getContentsByCategoryName_mostPopular(toParams.n);
				getContentsByCategoryName_latest(toParams.n);
				getContentsByCategoryName_relevant(toParams.n);
				getContentsByCategoryName_related(toParams.n);

				if (toState.name === 'pub.articles' && toParams.n) {
					getCategoryByName(toParams.n);
				} else if(toState.name === 'pub.articles.content' && toParams.n && toParams.ci && toParams.cn) {
					getContent(toParams.n, toParams.ci, toParams.cn);
				} else {
					//
				}
			} else {
				//
			}
		});
	};

	pubcontentController.$inject = ['$rootScope', '$scope', '$state', 'appService', 'pubcontentService', 'modalService', 'Content', 'Tag', 'Category', 'EntityMapper', 'metaInformationService', 'pageTitleService', 'Utils'];
	module.exports = pubcontentController;
})();
