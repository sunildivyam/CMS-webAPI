'use strict';
/*
*   pubTagController
*   Description
*   pubTagController handles the search Functionality.
*/

(function() {
    var pubTagController = function($rootScope, $scope, pubcontentService, metaInformationService, pageTitleService, EntityMapper, Content, Tag, Utils) {
        $scope.dlContentsListOfTag = {};
        $scope.currentTag = new Tag();

        function getSearchResultsTags(searchResults) {
            var tags = [];
            if (searchResults && searchResults.length) {
                searchResults.filter(function(article) {
                    tags = tags.concat(article.tags);
                });
            }
            return tags;
        }

        function  initTagContentListWithResults(searchResults) {
            if(searchResults instanceof Object) {
                $scope.currentTag = new Tag(searchResults.Tag);
                $scope.dlContentsListOfTag.items = new EntityMapper(Content).toEntities(searchResults.Contents);
                $scope.dlContentsListOfTag.pagingTotalItems = searchResults.TotalCount;
                $scope.dlContentsListOfTag.headerRightLabel = searchResults.TotalCount + " results";
                // Sets Meta information for Page
                Utils.setMetaInfo(
                    [$scope.baseTitle, $scope.currentTag.title].join(' '),
                    $scope.currentTag.description,
                    pubcontentService.getUniqueTagsOfTags(getSearchResultsTags($scope.dlContentsListOfTag.items)));
            } else {
                $scope.currentTag = new Tag();
                $scope.dlContentsListOfTag.items = undefined;
                $scope.dlContentsListOfTag.pagingTotalItems = 0;
                $scope.dlContentsListOfTag.headerRightLabel = "0 results";
            }
        }

        function getSearchResults(tagId, tagName, pageNo) {
            $scope.isTagLoading = true;
            $scope.dlContentsListOfTag.isLoading = true;
            $scope.dlContentsListOfTag = angular.extend(Utils.getListConfigOf('pubtag'), $scope.dlContentsListOfTag);

            pubcontentService.getContentsByTag(tagId, tagName, pageNo, $scope.dlContentsListOfTag.pagingPageSize).then(function(response) {
                if (response && response.data) {
                    initTagContentListWithResults(response.data);
                } else {
                    initTagContentListWithResults();
                }
                $scope.dlContentsListOfTag.isLoading = false;
                $scope.isTagLoading = false;
            }, function() {
                initTagContentListWithResults();
                $scope.dlContentsListOfTag.isLoading = false;
                $scope.isTagLoading = false;
            });
        }

        $scope.dlContentsListOfTag.onPagingPageChange = function(event, pageNo) {
            if (pageNo && pageNo > 0 && $rootScope && $rootScope.$stateParams && $rootScope.$stateParams.ti && $rootScope.$stateParams.tn) {
                var ti =  $rootScope.$stateParams.ti;
                var tn = $rootScope.$stateParams.tn;
                getSearchResults(ti, tn, pageNo);
            }
        };

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
            if (toState) {
                // Sets Meta information for Page
                Utils.setMetaInfo(toState.title);
                $scope.baseTitle = toState.title;
            }

            if (toState && toState.name && toParams && toParams.ti && toParams.tn) {
                Utils.getListConfigs().then(function() {
                    getSearchResults(toParams.ti, toParams.tn, 1);
                }, function(rejection) {
                    console.log(rejection);
                });
            }
        });
    };

    pubTagController.$inject = ['$rootScope', '$scope', 'pubcontentService', 'metaInformationService', 'pageTitleService', 'EntityMapper', 'Content', 'Tag', 'Utils'];
    module.exports = pubTagController;
})();
