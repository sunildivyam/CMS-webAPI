'use strict';
/*
*   pubcategoryController
*   Description
*   pubcategoryController controls the content page Level Scope Data.
*/

(function() {
    var pubcategoryController = function($rootScope, $scope, $state, $timeout, appService, pubcontentService, modalService, Content, Tag, Category, EntityMapper, metaInformationService, pageTitleService, Utils) {        
        $scope.currentCategory = new Category();

        $scope.dlPopular = {};
        $scope.dlLatest = {};
        $scope.dlRelevant = {};
        $scope.dlRelated = {};
        $scope.allCategoryContentTags = []; // For Meta information
        function getCategoryByName(name) {
            $scope.isCategoryLoading = true;
            if (name) {
                pubcontentService.getCategoryByName(name).then(function(response) {
                    if (response && response.data) {
                        $scope.currentCategory = new Category(response.data);
                    } else {
                        $scope.currentCategory = new Category();
                    }
                    $scope.isCategoryLoading = false;
                    // Sets Meta information for Page
                    Utils.setMetaInfo($scope.currentCategory.title, $scope.currentCategory.description, pubcontentService.getUniqueTagsOfTags($scope.allCategoryContentTags));
                }, function(rejection) {
                    onNoCategory(rejection);
                });
            } else {
                onNoCategory();
            }

            function onNoCategory(rejection) {
                $scope.isCategoryLoading = false;
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

        function getAllContentLists(categoryName) {
            var contentListTypes = Utils.getPubContentListTypes();
            $scope.dlContentLists = [];
            $scope.allCategoryContentTags = [];

            for (var key in contentListTypes) {
                (function() {
                    var dlContentList = {};
                        dlContentList.isLoading = true;
                        dlContentList.enableGooterLink = false;
                        dlContentList.headerTitle = contentListTypes[key].title;
                        dlContentList.viewMode = contentListTypes[key].viewMode;
                        dlContentList.tileViewClass = $state.$current.name==="pub.articles.content" ? 'col-md-6' : contentListTypes[key].tileViewClass;
                        dlContentList = angular.extend(Utils.getListConfigOf('pubContent'), dlContentList);

                    $scope.dlContentLists.push(dlContentList);

                    pubcontentService.getContentsByCategoryName(categoryName, contentListTypes[key].sortField, contentListTypes[key].sortDirAsc, dlContentList.pagingPageSize).then(function(response) {
                        if (response && response.data) {
                            var contents = new EntityMapper(Content).toEntities(response.data.Contents);
                            var category = new Category(response.data.Category);

                            dlContentList.items = contents;
                            dlContentList.tags = pubcontentService.getUniqueTagsOfContents(contents);
                            dlContentList.pagingTotalItems = response.data.TotalCount;
                            dlContentList.headerRightLabel = response.data.TotalCount + '+ articles';
                            dlContentList.headerTitle = dlContentList.headerTitle + ' | ' + category.title;
                            dlContentList.footerLinkUrl = ['/search', category.name, category.name].join('/');
                        } else {
                            dlContentList.items = new EntityMapper(Content).toEntities([]);
                            dlContentList.tags = [];
                            dlContentList.pagingTotalItems = 0;
                            dlContentList.headerRightLabel = '0 articles';
                        }
                        $scope.allCategoryContentTags = $scope.allCategoryContentTags.concat(dlContentList.tags);

                        // This should be set only for Category (articles) state, and not for content state
                        if ($state.$current.name === 'pub.articles') {
                            // Sets Meta information for Page
                            Utils.setMetaInfo($scope.currentCategory.title, $scope.currentCategory.description, pubcontentService.getUniqueTagsOfTags($scope.allCategoryContentTags));
                        }

                        dlContentList.isLoading = false;
                    }, function() {
                        dlContentList.items = new EntityMapper(Content).toEntities([]);
                        dlContentList.tags = [];
                        dlContentList.pagingTotalItems = 0;
                        dlContentList.headerRightLabel = '0 articles';
                        dlContentList.isLoading = false;
                    });
                }());
            }
        }

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams/*, fromState , fromParams*/) {
            if (toState && toState.name && toParams && toParams.n) {
                Utils.getListConfigs().then(function() {
                    getAllContentLists(toParams.n);
                    Utils.setMetaInfo(toParams.n);
                    if(toState.name === "pub.articles") {
                        $scope.setPageName('pubcategoryPage');
                        getCategoryByName(toParams.n);  
                    }                
                });
            } else {
                //
            }
        });
    };

    pubcategoryController.$inject = ['$rootScope', '$scope', '$state', '$timeout','appService', 'pubcontentService', 'modalService', 'Content', 'Tag', 'Category', 'EntityMapper', 'metaInformationService', 'pageTitleService', 'Utils'];
    module.exports = pubcategoryController;
})();
