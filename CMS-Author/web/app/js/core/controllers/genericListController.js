'use strict';
/*
*   genericListController
*   Description
*   genericListController controls the Generic List Level Scope Data.
*/

(function() {
    var genericListController = function($scope, $timeout, Utils) {
        var DEFAULT_ITEMS_TYPE = 'pubContent';

        $scope.searchKeywords = '';
        $scope.itemFilter = function(item) {
            return Utils.filterByKeywords(item, $scope.searchKeywords);
        };

        $scope.itemClick = function(event, item) {
            $scope.selectedItem = item;
            if (typeof $scope.onItemSelect === 'function') {
                event.preventDefault();
                $scope.onItemSelect(event, item);
            }
        };

        $scope.viewModeChange = function(event, btn) {
            $scope.viewMode = btn.id;
            $timeout(function() {
                if (typeof $scope.onRefresh === 'function') {
                    $scope.onRefresh(event);
                }
            }, 50);
        };

        $scope.footerLinkClick = function(event) {
            if (typeof $scope.onFooterLinkClick === 'function') {
                event.preventDefault();
                $scope.onFooterLinkClick(event);
            }
        };

        $scope.pagingPageChange = function() {
            if (typeof $scope.onPagingPageChange === 'function') {
                $scope.onPagingPageChange(event, $scope.pagingSelectedPage);
            }
        };

        $scope.onMaximizeClick = function(event) {
            event.preventDefault();
            $scope.isMaximized = !$scope.isMaximized;

            if (!$scope.isMaximized) {
                $timeout(function() {
                    if (typeof $scope.onRefresh === 'function') {
                        $scope.onRefresh(event);
                    }
                }, 50);
            }
        };

        $scope.$watch('itemsType', function(newValue) {
            if (newValue) {
                var type = Utils.getItemTypeOf(newValue);
                if (!type) {
                    type = Utils.getItemTypeOf[DEFAULT_ITEMS_TYPE];
                }
                $scope.currentListTemplate = type && type.templateUrl;
            }
        });

        $scope.$watch('enableViewModes', function(newValue) {
            if (newValue === true) {
                $scope.viewModes = Utils.getListModes();
            }
        });
    };

    genericListController.$inject = ['$scope', '$timeout', 'Utils'];
    module.exports = genericListController;
})();
