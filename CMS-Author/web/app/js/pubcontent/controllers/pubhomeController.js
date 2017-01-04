'use strict';
/*
*	pubhomeController
*	Description
*	pubhomeController controls the content page Level Scope Data.
*/

(function() {
	var pubhomeController = function($scope, $state, pubcontentService, EntityMapper, Category, Tag, Content, Utils) {
		$scope.globalSearch = {
			searchString: '',
			initSelectedItem: undefined
		};

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams /*, fromState , fromParams*/) {
			if (toState && toState.name) {
				getCategories(toState.name);

				if (toState.name === 'pub.search' && toParams && toParams.n && toParams.kw) {
					$scope.globalSearch.searchString = toParams.kw.replace(/-/g, ' ');
					$scope.globalSearch.initSelectedItem = new Category({Name: toParams.n});
				}
			}
		});

		// gets all Lists of contents for all categories
		function getListOfContentsOfAllcategories(categories) {
			var listOfContentsOfAllcategories = [];
			var sortField = 'VisitCount';
			var sortDirAsc = false;

			if (categories instanceof Array) {
				categories.filter(function(category) {
					pubcontentService.getContentsByCategoryName(category.name, sortField, sortDirAsc).then(function(response) {
						if (response && response.data) {
							var contentList = {
								contents:  new EntityMapper(Content).toEntities(response.data.Contents),
								category:  new Category(response.data.Category),
								totalCount:  response.data.TotalCount
							};
							contentList.uniqueTags = pubcontentService.getUniqueTagsOfContents(contentList.contents);
							listOfContentsOfAllcategories.push(contentList);
						} else {
							resetContentList();
						}
					}, function() {
						resetContentList();
					});
				});

				function resetContentList() {
					var contentList = {
						contents: undefined,
						category: undefined,
						totalCount: 0,
						uniqueTags: undefined
					};
					listOfContentsOfAllcategories.push(contentList);
				}
			}

			$scope.listOfContentsOfAllcategories = listOfContentsOfAllcategories;
		}

		// gets all categories
        function getCategories(stateName) {
            pubcontentService.getCategories().then(function(response) {
                $scope.categories = new EntityMapper(Category).toEntities(response.data);
                if (stateName === 'pub') {
                	getListOfContentsOfAllcategories($scope.categories);
                }
            }, function() {
                $scope.categories = new EntityMapper(Category).toEntities();
            });
        }

        $scope.onGlobalSearch = function(event, category, keywords) {
        	var categoryName = 'All'
        	if (category && category.name) {
        		categoryName = category.name;
        	}

        	keywords = Utils.parseStringExt(keywords, '-', false);

        	$state.go('pub.search', {
        		n: categoryName,
        		kw: keywords
        	}, {
        		notify: true,
        		reload: true
        	});
        };
	};

	pubhomeController.$inject = ['$scope', '$state', 'pubcontentService', 'EntityMapper', 'Category', 'Tag', 'Content', 'Utils'];
	module.exports = pubhomeController;
})();
