'use strict';
/*
*   myspaceController
*   Description
*   myspaceController handles the User's Articles and Stuff Page.
*/

(function() {
    var myspaceController = function($rootScope, $scope, pubcontentService, EntityMapper, Content, User, Utils, Quiz, pageMetaTagsService) {
        $scope.dlContentsListOfAuthor = {};
        $scope.dlQuizsListOfAuthor = {};
        $scope.currentAuthor = new User();

        function getSearchResultsTags(searchResults) {
            var tags = [];
            if (searchResults && searchResults.length) {
                searchResults.filter(function(article) {
                    tags = tags.concat(article.tags);
                });
            }
            return tags;
        }

        function  initAuthorContentListWithResults(searchResults) {
            if(searchResults instanceof Object) {
                $scope.currentAuthor = new User(searchResults.Author);
                var pageTitle = $scope.baseTitle + ' by ' + $scope.currentAuthor.userName;
                $scope.dlContentsListOfAuthor.items = new EntityMapper(Content).toEntities(searchResults.Contents);
                $scope.dlContentsListOfAuthor.pagingTotalItems = searchResults.TotalCount;
                $scope.dlContentsListOfAuthor.headerRightLabel = searchResults.TotalCount + " results";
                $scope.dlContentsListOfAuthor.headerTitle = pageTitle;
                $scope.dlContentsListOfAuthor.headerSummary = 'Explore articles authored by ' + $scope.currentAuthor.userName;
                $scope.dlQuizsListOfAuthor.headerTitle = 'Quizzes by ' + ($scope.currentAuthor && $scope.currentAuthor.userName);
                $scope.dlContentsListOfAuthor.tags = pubcontentService.getUniqueTagsOfContents($scope.dlContentsListOfAuthor.items);
               
                // Sets Meta information for Page
                pageMetaTagsService.setPageMetaInfo(pageTitle,
                    $scope.currentAuthor.description,
                    pubcontentService.getUniqueTagsOfTags(getSearchResultsTags($scope.dlContentsListOfAuthor.items)));
                
            } else {
                $scope.currentAuthor = new User();
                $scope.dlContentsListOfAuthor.items = undefined;
                $scope.dlContentsListOfAuthor.pagingTotalItems = 0;
                $scope.dlContentsListOfAuthor.headerRightLabel = "0 results";
            }
        }

        function getSearchResults(userName, pageNo) {
            $scope.isAuthorLoading = true;
            $scope.dlContentsListOfAuthor.isLoading = true;
            $scope.dlContentsListOfAuthor = angular.extend(Utils.getListConfigOf('pubtag'), $scope.dlContentsListOfAuthor);

            pubcontentService.getContentsByUserName(userName, pageNo, $scope.dlContentsListOfAuthor.pagingPageSize).then(function(response) {
                if (response && response.data) {
                    initAuthorContentListWithResults(response.data);
                } else {
                    initAuthorContentListWithResults();
                }
                $scope.dlContentsListOfAuthor.isLoading = false;
                $scope.isAuthorLoading = false;
            }, function() {
                initAuthorContentListWithResults();
                $scope.dlContentsListOfAuthor.isLoading = false;
                $scope.isAuthorLoading = false;
            });
        }

        $scope.dlContentsListOfAuthor.onPagingPageChange = function(event, pageNo) {
            if (pageNo && pageNo > 0 && $rootScope && $rootScope.$stateParams && $rootScope.$stateParams.n) {                v
                var userName = $rootScope.$stateParams.n;
                getSearchResults(userName, pageNo);
            }
        };


        function getLatestQuizs(userName, pageNo) {
            var quizListTypes = Utils.getPubQuizListTypes();
            var key = "pubQuizPopular";
            (function() {
                var dlQuizList = {};
                    dlQuizList.isLoading = true;
                    dlQuizList.enableFooterLink = false;
                    dlQuizList.headerTitle = quizListTypes[key].title;
                    dlQuizList.viewMode = quizListTypes[key].viewMode;
                    dlQuizList.tileViewClass = 'col-sm-12';
                    dlQuizList = angular.extend(Utils.getListConfigOf('pubQuiz'), dlQuizList);

                $scope.dlQuizsListOfAuthor = dlQuizList;
                getQuizs(dlQuizList, userName, quizListTypes[key].sortField, quizListTypes[key].sortDirAsc, dlQuizList.pagingPageSize, pageNo);                    
            })();
        }

        function getQuizs(dlQuizList, userName, sortField, sortDirAsc, pagingPageSize, pagingSelectedPage) {
            pubcontentService.getQuizsByAuthorName(userName, sortField, sortDirAsc, pagingPageSize, pagingSelectedPage).then(function(response) {
                if (response && response.data) {
                    var quizs = new EntityMapper(Quiz).toEntities(response.data.Quizs);
                    quizs = Utils.decodeQuizs(quizs);
                    
                    $scope.currentAuthor = new User(response.data.Author);
                    dlQuizList.items = quizs;
                    dlQuizList.tags = pubcontentService.getUniqueTagsOfContents(quizs);
                    dlQuizList.pagingTotalItems = response.data.TotalCount;
                    dlQuizList.headerRightLabel = response.data.TotalCount + '+ quizzes';
                    dlQuizList.headerTitle = 'Quizzes by ' + ($scope.currentAuthor && $scope.currentAuthor.userName);
                    dlQuizList.footerLinkUrl = ['/search', 'quizzes'].join('/');
                    dlQuizList.enablePaging = true;
                    dlQuizList.tags = pubcontentService.getUniqueTagsOfContents(quizs);
                    $scope.dlQuizsListOfAuthor.headerTitle = 'Quizzes by ' + ($scope.currentAuthor && $scope.currentAuthor.userName);
                    dlQuizList.onPagingPageChange = function(event, pageNo) {
                        getQuizs(dlQuizList, sortField, sortDirAsc, pagingPageSize, pageNo);
                    };
                } else {
                    dlQuizList.items = new EntityMapper(Quiz).toEntities([]);
                    dlQuizList.tags = [];
                    dlQuizList.pagingTotalItems = 0;
                    dlQuizList.headerRightLabel = '0 quizzes';
                }

                dlQuizList.isLoading = false;
            }, function() {
                dlQuizList.items = new EntityMapper(Content).toEntities([]);
                dlQuizList.tags = [];
                dlQuizList.pagingTotalItems = 0;
                dlQuizList.headerRightLabel = '0 quizzes';
                dlQuizList.isLoading = false;
            });
        }

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
            if (toState) {                                
                $scope.baseTitle = "Articles, Quizzes and Questions";
                pageMetaTagsService.setPageMetaInfo($scope.baseTitle + 'by ' + (toParams.n || 'Author'), "Author's Articles, Quizzes and Questions, Latest Articles, Recent Articles andexplore Quizzes and questions.");
            }

            if (toState && toState.name && toParams && toParams.n) {
                Utils.getListConfigs().then(function() {
                    getSearchResults(toParams.n, 1);
                    getLatestQuizs(toParams.n, 1);
                }, function(rejection) {
                    //
                });
            }
        });
    };

    myspaceController.$inject = ['$rootScope', '$scope', 'pubcontentService', 'EntityMapper', 'Content', 'User', 'Utils', 'Quiz', 'pageMetaTagsService'];
    module.exports = myspaceController;
})();
