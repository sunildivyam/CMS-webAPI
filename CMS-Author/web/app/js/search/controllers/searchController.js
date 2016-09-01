'use strict';
/*
*   searchController
*   Description
*   searchController handles the search Functionality.
*/

(function() {
    var searchController = function($rootScope, $scope, searchService, metaInformationService, pageTitleService) {
        var featureName = 'All';
        $scope.searchKeywords;
        $scope.foundFeatures;

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

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
            if (toState && toState.name && toParams) {

                // Ensures keywords Param decoding and disallow double encoding of space and % characters in Params
                $rootScope.$state.go('.', {
                    keywords: decodeURI(toParams.keywords)
                },
                {
                    reload: false,
                    notify: false
                });

                $scope.searchKeywords = decodeURI(toParams.keywords);
                searchService.searchFeatures($scope.searchKeywords, featureName).then(function(features) {
                    $scope.foundFeatures = features;
                });

                var searchNav = $scope.getFirstLevelNavItemByStateName(toState.name);
                setMetaInfo(searchNav);
            }
        });
    };

    searchController.$inject = ['$rootScope', '$scope', 'searchService', 'metaInformationService', 'pageTitleService'];
    module.exports = searchController;
})();
