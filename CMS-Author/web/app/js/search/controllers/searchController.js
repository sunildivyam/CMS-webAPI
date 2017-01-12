'use strict';
/*
*   searchController
*   Description
*   searchController handles the search Functionality.
*/

(function() {
    var searchController = function($rootScope, $scope, searchService, metaInformationService, pageTitleService, EntityMapper, Content) {
        $scope.itemsPerPage = searchService.getPageSize();
        $scope.maxPageSize = 10; // page numbers to be displayed on page Bar

        function setMetaInfo(searchNav) {
            if (searchNav instanceof Object) {
                metaInformationService.setMetaDescription(searchNav.description);
                metaInformationService.setMetaKeywords(searchNav.keywords);
                pageTitleService.setPageTitle(searchNav.title);
            } else {
                metaInformationService.resetMetaDescription();
                metaInformationService.resetMetaKeywords();
                pageTitleService.setPageTitle();
            }
        }

        function getSearchResults(categoryName, keywords, pageNo, pageSize) {
            if (!pageSize) {
                pageSize = $scope.itemsPerPage;
            }
            searchService.searchContents(categoryName, keywords, pageNo, pageSize).then(function(response) {
                if (response && response.data) {
                    $scope.searchResults = {
                        contents: new EntityMapper(Content).toEntities(response.data.Contents),
                        totalCount: response.data.TotalCount
                    };
                } else {
                    $scope.searchResults = {};
                }

            }, function() {
                $scope.searchResults = {};
            });
        }

        $scope.onSearchPageChange = function(event, pageNo) {
            if (pageNo && pageNo > 0 && $rootScope && $rootScope.$stateParams) {
                var n =  $rootScope.$stateParams.n;
                var kw = $rootScope.$stateParams.kw;
                getSearchResults(n, kw, pageNo);
            }
        };

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
            if (toState && toState.name && toParams) {
                getSearchResults(toParams.n, toParams.kw, 1);
            }
        });
    };

    searchController.$inject = ['$rootScope', '$scope', 'searchService', 'metaInformationService', 'pageTitleService', 'EntityMapper', 'Content'];
    module.exports = searchController;
})();
