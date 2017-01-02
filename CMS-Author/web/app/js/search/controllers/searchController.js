'use strict';
/*
*   searchController
*   Description
*   searchController handles the search Functionality.
*/

(function() {
    var searchController = function($rootScope, $scope, searchService, metaInformationService, pageTitleService, EntityMapper, Content) {
        $scope.itemsPerPage = 20;
        $scope.maxPageSize = 5;

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

        function getSearchResults(categoryName, keywords) {
            searchService.searchContents(categoryName, keywords).then(function(response) {
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

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
            if (toState && toState.name && toParams) {
                getSearchResults(toParams.n, toParams.kw);
            }
        });
    };

    searchController.$inject = ['$rootScope', '$scope', 'searchService', 'metaInformationService', 'pageTitleService', 'EntityMapper', 'Content'];
    module.exports = searchController;
})();
