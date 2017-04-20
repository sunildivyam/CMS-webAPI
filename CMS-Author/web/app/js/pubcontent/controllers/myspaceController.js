'use strict';
/*
*   myspaceController
*   Description
*   myspaceController handles the User's Articles and Stuff Page.
*/

(function() {
    var myspaceController = function($rootScope, $scope, pubcontentService, EntityMapper, Content, User, Utils) {
        $scope.dlContentsListOfAuthor = {};
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
                $scope.dlContentsListOfAuthor.items = new EntityMapper(Content).toEntities(searchResults.Contents);
                $scope.dlContentsListOfAuthor.pagingTotalItems = searchResults.TotalCount;
                $scope.dlContentsListOfAuthor.headerRightLabel = searchResults.TotalCount + " results";
                // Sets Meta information for Page
                Utils.setMetaInfo(
                    [$scope.currentAuthor.userName, $scope.baseTitle].join('-'),
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

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
            if (toState) {
                // Sets Meta information for Page
                Utils.setMetaInfo(toState.title);
                $scope.baseTitle = toState.title;
            }

            if (toState && toState.name && toParams && toParams.n) {
                Utils.getListConfigs().then(function() {
                    getSearchResults(toParams.n, 1);
                }, function(rejection) {
                    console.log(rejection);
                });
            }
        });
    };

    myspaceController.$inject = ['$rootScope', '$scope', 'pubcontentService', 'EntityMapper', 'Content', 'Utils'];
    module.exports = myspaceController;
})();
