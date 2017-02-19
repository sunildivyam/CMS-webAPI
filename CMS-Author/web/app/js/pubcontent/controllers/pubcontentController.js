'use strict';
/*
*   pubcontentController
*   Description
*   pubcontentController controls the content page Level Scope Data.
*/

(function() {
    var pubcontentController = function($rootScope, $scope, $state, $timeout, appService, pubcontentService, modalService, Content, Tag, Category, EntityMapper, metaInformationService, pageTitleService, Utils) {
        $scope.currentContent = new Content();
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

        function getContent(categoryName, contentId, contentName) {
            $scope.isLoading = true;
            if (categoryName && contentId && contentName) {
                pubcontentService.getContent(categoryName, contentId, contentName).then(function(response) {
                    var content = new Content(response && response.data);
                    content.description = Utils.decodeContent(content.description);
                    $scope.currentContent = content;
                    $scope.isLoading = false;
                    // Sets Meta information for Page
                    Utils.setMetaInfo(content.title, content.shortDescription, content.tags);
                }, function(rejection) {
                    $scope.isLoading = false;
                    modalService.alert('md',
                    'No Content found',
                    'Reason/s: ' + (appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') || 'Content Not Found.') ,
                    'Go Back').result.then(function() {
                        $state.go('pub.articles', {n: $scope.currentCategory && $scope.currentCategory.name});
                    }, function() {
                        $state.go('pub.articles');
                    });
                });
            } else {
                //
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
            if (toState && toState.name && toParams) {
                Utils.getListConfigs().then(function() {
                    getAllContentLists(toParams.n);

                    if (toState.name === 'pub.articles' && toParams.n) {
                        Utils.setMetaInfo(toParams.n);
                        getCategoryByName(toParams.n);
                    } else if(toState.name === 'pub.articles.content' && toParams.n && toParams.ci && toParams.cn) {
                        Utils.setMetaInfo(toParams.n);
                        getContent(toParams.n, toParams.ci, toParams.cn);
                    } else {
                        //
                    }
                });
            } else {
                //
            }
        });
    };

    pubcontentController.$inject = ['$rootScope', '$scope', '$state', '$timeout','appService', 'pubcontentService', 'modalService', 'Content', 'Tag', 'Category', 'EntityMapper', 'metaInformationService', 'pageTitleService', 'Utils'];
    module.exports = pubcontentController;
})();
