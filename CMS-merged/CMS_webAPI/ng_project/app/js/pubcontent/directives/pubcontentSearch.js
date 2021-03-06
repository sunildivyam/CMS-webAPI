'use strict';
(function() {
    var pubcontentSearch = function() {
        return {
            restrict: 'E',
            scope: {
                search: '=',    // is object of searchString and category
                categories: '=',
                onSearch: '='
            },
            templateUrl: 'pubcontent/pubcontent-search.html',
            link: function($scope, element) {
                $scope.$watch('search', function(search) {
                    if (!(search instanceof Object)) {
                        search = {};
                    }
                });

                $scope.onSearchClick = function(event) {
                    if (typeof $scope.onSearch === 'function' && $scope.search.searchString.trim()) {
                        $scope.onSearch(event, $scope.search.category, $scope.search.searchString);
                    }
                };

                $(element).find('.dropdown-menu').click(function(e) {
                    e.stopPropagation();
                });
            }
        };
    };

    pubcontentSearch.$inject = [];
    module.exports = pubcontentSearch;
})();
