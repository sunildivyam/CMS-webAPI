'use strict';
/*
*   genericListController
*   Description
*   genericListController controls the Generic List Level Scope Data.
*/

(function() {
    var genericListController = function($scope, $timeout, Utils, CkEditorService) {
        var DEFAULT_ITEMS_TYPE = 'pubContent';
        var INLINE_SEARCH_UPDATE_SCROLLBAR_DELAY = 500;

        $scope.searchKeywords = '';
        $scope.isMaximized = false;

        $scope.itemFilter = function(item) {
            return Utils.filterByKeywords(item, $scope.searchKeywords);
        };

        $scope.itemClick = function(event, item) {
            $scope.selectedItem = item;            
            if (typeof $scope.onItemSelect === 'function') {                
                var $targetEl = $(event.target);
                if ($targetEl.context && $targetEl.context.type==='checkbox') {
                    $scope.onItemSelect(event, item, $targetEl.context.checked);
                } else {
                    event.preventDefault();
                    $scope.onItemSelect(event, item);
                }
            }
        };

        $scope.viewModeChange = function(event, btn) {
            $scope.viewMode = btn.id;
            $timeout(function() {
                if (typeof $scope.onRefresh === 'function') {
                    $scope.onRefresh(event);
                }
            }, 50);
            var listElem = $scope.$el.find('.' + btn.id + '-view');
            $scope.updateMathJax(listElem);
            $scope.updateEllipsis();
            $scope.updateScrollbar();            
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
                    $scope.updateEllipsis();
                    $scope.updateScrollbar();
                    if (typeof $scope.onRefresh === 'function' && !$scope.enableScrollbar) {
                        $scope.onRefresh(event);
                    }
                }, 50);
            } else {
                $scope.updateEllipsis();
                $scope.updateScrollbar();
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

        $scope.$watch('searchKeywords', function(newValue, oldValue) {
            if (newValue !== oldValue) {
                invokeScrollbarUpdate();
            }
        });

        function invokeScrollbarUpdate() {
            if (!$scope.enableScrollbar) {
                return false;
            }

            if ($scope.isScrollbarUpdateInvoked) {
                $timeout.cancel($scope.isScrollbarUpdateInvoked);
            }
            $scope.isScrollbarUpdateInvoked = $timeout(function(){
                $scope.updateScrollbar();
            }, INLINE_SEARCH_UPDATE_SCROLLBAR_DELAY);
        }

        $scope.updateMathJax = function(elem) {
            CkEditorService.updateMathJax(elem);
        };
    };

    genericListController.$inject = ['$scope', '$timeout', 'Utils', 'CkEditorService'];
    module.exports = genericListController;
})();
