'use strict';
/*
*   pubhomeController
*   Description
*   pubhomeController controls the content page Level Scope Data.
*/

(function() {
    var pubhomeController = function($rootScope, $scope, $state, $timeout, $q, pubcontentService, EntityMapper, Category, Tag, Content, Utils, searchService) {
        $scope.globalSearch = {
            searchString: '',
            category: searchService.getDefaultCategory()
        };

        function initMainCarousel(categories) {
            var mainCr = Utils.getListConfigOf('mainCarousel');
            var opts = mainCr && mainCr.options;
            $scope.mainCarousel = {
                slides: categories || [],
                options:  opts || {},
                name: 'mainCarousel',
                readMoreUrl: '/articles'
            };
        }

        initMainCarousel();

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

        // gets all Lists of contents for all categories
        function getListOfContentsOfAllcategories(categories) {
            $scope.dlListOfContentsOfAllcategories = [];
            var sortField = 'VisitCount';
            var sortDirAsc = false;

            if (categories instanceof Array) {
                categories.filter(function(category) {
                    var dlCategoryContent = {};
                    dlCategoryContent.isLoading = true;
                    dlCategoryContent = angular.extend(Utils.getListConfigOf('pubContent'), dlCategoryContent);
                    $scope.dlListOfContentsOfAllcategories.push(dlCategoryContent);

                    pubcontentService.getContentsByCategoryName(category.name, sortField, sortDirAsc, dlCategoryContent.pagingPageSize).then(function(response) {
                        if (response && response.data) {
                            var contents = new EntityMapper(Content).toEntities(response.data.Contents);
                            var category = new Category(response.data.Category);
                            var totalCount = response.data.TotalCount;

                            dlCategoryContent.items = contents;
                            dlCategoryContent.headerTitle = category && category.title || '';
                            dlCategoryContent.headerRightLabel = totalCount + '+ articles';
                            dlCategoryContent.pagingTotalItems = totalCount;
                            dlCategoryContent.footerLinkUrl = [dlCategoryContent.footerLinkUrl, category && category.name].join('/');
                            dlCategoryContent.tags = pubcontentService.getUniqueTagsOfContents(contents);
                        } else {
                            resetContentList(dlCategoryContent);
                        }
                        dlCategoryContent.isLoading = false;
                    }, function() {
                        resetContentList(dlCategoryContent);
                    });
                });
            }

            function resetContentList(dlCategoryContent) {
                dlCategoryContent.items = new EntityMapper(Content).toEntities([]);
                dlCategoryContent.headerRightLabel = '0 articles';
                dlCategoryContent.pagingTotalItems = 0;
                dlCategoryContent.tags = [];
                dlCategoryContent.isLoading = false;
            }
        }

        // gets all categories
        function getCategories() {
            var defferedObj = $q.defer();
            pubcontentService.getCategories().then(function(response) {
                $scope.categories = new EntityMapper(Category).toEntities(response.data);
                $scope.searchDropdownCategories = angular.copy($scope.categories);
                $scope.searchDropdownCategories.unshift(searchService.getDefaultCategory());
                $rootScope.categories = $scope.categories;
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
            var categoryName = 'All';
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
            event.preventDefault();
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

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams /*, fromState , fromParams*/) {
            if (toState && toState.name) {
                Utils.getListConfigs().then(function() {
                    // Sets Meta information for Page
                    Utils.setMetaInfo(); // this sets application level meta data
                    $scope.iso = undefined;
                    getCategories().then(function() {
                        if (toState.name === 'pub') {
                            // Sets Meta information for Page
                            Utils.setMetaInfo(); // this sets application level meta data
                            initMainCarousel($scope.categories);
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
                        initMainCarousel();
                    });
                });
            }
        });
    };

    pubhomeController.$inject = ['$rootScope', '$scope', '$state', '$timeout', '$q', 'pubcontentService', 'EntityMapper', 'Category', 'Tag', 'Content', 'Utils', 'searchService'];
    module.exports = pubhomeController;
})();
