'use strict';
/*
*   pubhomeController
*   Description
*   pubhomeController controls the content page Level Scope Data.
*/

(function() {
    var pubhomeController = function($scope, $state, $timeout, $q, pubcontentService, EntityMapper, Category, Tag, Content, Utils, searchService) {
        $scope.globalSearch = {
            searchString: '',
            category: searchService.getDefaultCategory()
        };

        function findCategory(categories, categoryName) {
            var foundCategories = [];

            if (categories instanceof Array && categories.length) {
                foundCategories = categories.filter(function(category) {
                    if (category.name === categoryName) {
                        return category;
                    }
                });
                if (foundCategories && foundCategories.length) {
                    return foundCategories[0];
                } else {
                    return searchService.getDefaultCategory();
                }
            } else {
                return searchService.getDefaultCategory();
            }
        }

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams /*, fromState , fromParams*/) {
            if (toState && toState.name) {
                $scope.iso = undefined;
                getCategories().then(function() {
                    if (toState.name === 'pub') {
                        getListOfContentsOfAllcategories($scope.categories);
                    }

                    if (toState.name === 'pub.search' && toParams && toParams.n && toParams.kw) {
                        var prevKw = $scope.globalSearch.searchString && $scope.globalSearch.searchString.toLowerCase();
                        var prevN = $scope.globalSearch.category;
                        var newKw = toParams.kw.replace(/-/g, ' ');
                        var newN = findCategory($scope.categories, toParams.n);

                        if (prevKw !== newKw) {
                            $scope.globalSearch.searchString = newKw;
                        }

                        if (typeof prevN === 'undefined' || (prevN && prevN.name !== newN.name)) {
                            $scope.globalSearch.category = newN;
                        }
                    }
                }, function() {
                    //
                });
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
        function getCategories() {
            var defferedObj = $q.defer();
            pubcontentService.getCategories().then(function(response) {
                $scope.categories = new EntityMapper(Category).toEntities(response.data);
                $scope.searchDropdownCategories = angular.copy($scope.categories);
                $scope.searchDropdownCategories.unshift(searchService.getDefaultCategory());
                defferedObj.resolve($scope.categories);
            }, function() {
                $scope.categories = new EntityMapper(Category).toEntities();
                $scope.searchDropdownCategories = angular.copy($scope.categories);
                $scope.searchDropdownCategories.unshift(searchService.getDefaultCategory());
                defferedObj.reject($scope.categories);
            });

            return defferedObj.promise;
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
                reload: false
            });
        };

        $scope.onListsRefresh = function(event) {
            $scope.refreshIsotopeLayout();
        };

        $scope.refreshIsotopeLayout =  function(elm) {
            if (!$scope.iso) {
                if (elm) {
                    $scope.iso = new Isotope(elm, {
                        "itemSelector": ".grid-item"
                    });
                }
            } else {
                $timeout(function() {
                    $scope.iso.layout();
                });
            }
        };

        $scope.$on('onLoadCategoryContentList', function() {
            var elm;
            if ($scope.iso && $scope.iso.element) {
                elm = $scope.iso.element;
                $scope.iso = undefined;
                $scope.refreshIsotopeLayout(elm);
            }

        });
    };

    pubhomeController.$inject = ['$scope', '$state', '$timeout', '$q', 'pubcontentService', 'EntityMapper', 'Category', 'Tag', 'Content', 'Utils', 'searchService'];
    module.exports = pubhomeController;
})();
