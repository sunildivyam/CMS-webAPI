'use strict';
/*
*   searchController
*   Description
*   searchController handles the search Functionality.
*/

(function() {
    var searchController = function($rootScope, $scope, searchService, metaInformationService, pageTitleService, EntityMapper, Content, Utils) {
        $scope.itemsPerPage = searchService.getPageSize();
        $scope.maxPageSize = 10; // page numbers to be displayed on page Bar
        $scope.dlSearch = {};

        function  initSearchListWithResults(searchResults) {
            if(searchResults instanceof Object) {
                $scope.dlSearch.items = new EntityMapper(Content).toEntities(searchResults.Contents);
                $scope.dlSearch.pagingTotalItems = searchResults.TotalCount;
                $scope.dlSearch.headerRightLabel = searchResults.TotalCount + " results";
            } else {
                $scope.dlSearch.items = undefined;
                $scope.dlSearch.pagingTotalItems = 0;
                $scope.dlSearch.headerRightLabel = "0 results";
            }
        }

        function getSearchResults(categoryName, keywords, pageNo) {
            $scope.dlSearch.isLoading = true;
            $scope.dlSearch = angular.extend(Utils.getListConfigOf('search'), $scope.dlSearch);

            searchService.searchContents(categoryName, keywords, pageNo, $scope.dlSearch.pagingPageSize).then(function(response) {
                if (response && response.data) {
                    initSearchListWithResults(response.data);
                } else {
                    initSearchListWithResults();
                }
                $scope.dlSearch.isLoading = false;
            }, function() {
                initSearchListWithResults();
                $scope.dlSearch.isLoading = false;
            });
        }

        $scope.dlSearch.onPagingPageChange = function(event, pageNo) {
            if (pageNo && pageNo > 0 && $rootScope && $rootScope.$stateParams) {
                var n =  $rootScope.$stateParams.n;
                var kw = $rootScope.$stateParams.kw;
                getSearchResults(n, kw, pageNo);
            }
        };

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
            if (toState) {
                // Sets Meta information for Page
                Utils.setMetaInfo(toState.title);
            }

            if (toState && toState.name && toParams) {
                Utils.getListConfigs().then(function() {
                    getSearchResults(toParams.n, toParams.kw, 1);
                }, function(rejection) {
                    console.log(rejection);
                });
            }
        });
    };

    searchController.$inject = ['$rootScope', '$scope', 'searchService', 'metaInformationService', 'pageTitleService', 'EntityMapper', 'Content', 'Utils'];
    module.exports = searchController;
})();
