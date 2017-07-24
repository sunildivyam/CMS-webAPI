'use strict';
/*
*   genericList
*   Description
*   genericList directive is responsible for Painting List of Type
*/
(function() {
    var genericList = function($timeout, appService) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'core/generic-list.html',
            scope: {
                items: '=',
                itemsType: '=',
                onItemSelect: '=',

                enableHeader: '=',
                enableMaximize: '=',
                enableSearch: '=',
                enableViewModes: '=',
                enableScrollbar: '=',
                enableTags: '=',
                enableFooterLink: '=',
                enablePaging: '=',

                headerTitle: '=',
                headerSummary: '=',
                headerRightLabel: '=',

                viewMode: '=',
                tileViewClass: '=',

                scrollHeight: '=',

                tags: '=',

                footerLinkText: '=',
                footerLinkUrl: '=',
                onFooterLinkClick: '=',

                pagingTotalItems: '=',
                pagingSelectedPage: '=',
                pagingPageSize: '=',    // Number of Items per Page
                pagingPagerSize: '=',   // Number of Page links to display on Pager
                onPagingPageChange: '=',

                onRefresh: '=',     // calls when all list items are rendered or View Mode is changed
                isLoading: '=',     // To display a loader while list items getting loaded
                isAuthorMode: '='   // If List is used on Author Pages, should be true
            },
            controller: 'genericListController',
            link: function($scope, element) {
                $scope.updateEllipsis = function() {
                    $timeout(function() {
                        var $element = $(element);
                        var lineHeight = 27.5;
                        if ($scope.viewMode === 'list') {
                            $element.find('.list-view .description, .short-description').dotdotdot({
                                wrap: 'letters',
                                //watch: 'window',
                                height: (lineHeight * 6)
                            });
                        } else if ($scope.viewMode === 'grid') {
                            $element.find('.grid-view .media-heading').dotdotdot({
                                wrap: 'letters',
                                height: 80
                            });
                        } else if ($scope.viewMode === 'tile') {
                            $element.find('.tile-view .media-heading').dotdotdot({
                                wrap: 'letters',
                                height: 80
                            });

                            $element.find('.tile-view .description, .tile-view .short-description').dotdotdot({
                                wrap: 'letters',
                                height: (lineHeight * 10)
                            });
                        }
                    },100);
                };

                $scope.$on("onRepeatItemsLoaded", function(event) {
                    $scope.updateEllipsis();
                    $scope.updateScrollbar();

                    if (typeof $scope.onRefresh === 'function' && !$scope.enableScrollbar) {
                        $scope.onRefresh(event);
                    }
                });

                $scope.updateScrollbar = function() {
                    $timeout(function() {
                        var $element = $(element);
                        var $scrollbarElm = $element.find('.tiny-scrollbar');

                        if ($scope.enableScrollbar === true) {
                            if ($scrollbarElm && $scrollbarElm.length > 0) {
                                var scrollbar = $scrollbarElm.data("plugin_tinyscrollbar");
                                if ($scope.isMaximized) {
                                    // disable scrollbar functionality
                                    $scrollbarElm.removeData("plugin_tinyscrollbar");
                                    $scrollbarElm.removeClass('tiny-scrollbar');
                                    $scrollbarElm.addClass('tiny-scrollbar-disable');
                                } else {
                                    updateOrCreate(scrollbar, $scrollbarElm);
                                }
                            } else {
                                var $disabledScrollbarElm = $element.find('.tiny-scrollbar-disable');
                                if ($disabledScrollbarElm && $disabledScrollbarElm.length > 0 && !$scope.isMaximized) {
                                    updateOrCreate(undefined, $disabledScrollbarElm);
                                }
                            }
                        }
                    }, 100);
                };

                function updateOrCreate(scrollbar, scrollbarElement) {
                    var $viewPort = scrollbarElement.find('.viewport');
                    var $overview = scrollbarElement.find('.viewport .overview');
                    var disbaleStatus = false;

                    if (!scrollbar) {
                        if (scrollbarElement.hasClass('tiny-scrollbar-disable')) {
                            scrollbarElement.removeClass('tiny-scrollbar-disable');
                            disbaleStatus = true;
                        }
                        scrollbarElement.addClass('tiny-scrollbar');
                    }

                    $overview.css('position', 'absolute');

                    if ($overview.outerHeight() >= $scope.scrollHeight) {
                        $viewPort.css('height', $scope.scrollHeight + 'px');
                    } else {
                        $viewPort.css('height', 'auto');
                        $overview.css('position', 'static');
                    }

                    if (scrollbar) {
                        scrollbar.update();
                    } else {
                        // create Scrollbar
                        scrollbarElement.tinyscrollbar({thumbSize: 10});
                        if (disbaleStatus === true) {
                            $timeout(function() {
                                var tnScr = scrollbarElement.data("plugin_tinyscrollbar");
                                tnScr && tnScr.update();
                            });
                        }
                    }

                    if (typeof $scope.onRefresh === 'function') {
                        $scope.onRefresh(event);
                    }
                }

                $scope.getThumbnailUrl = function(item) {
                    if (!item) {
                        return '';
                    }
                    var params = [];                     
                    // For Published Content
                    if (item.contentId && item.publishedDate) {  
                        if ($scope.isAuthorMode) {
                            params.push(appService.getAuthorArticleImagesUrl());
                            params.push(item.authorContentId);
                        } else {                    
                            params.push(appService.getArticleImagesUrl());
                            params.push(item.contentId);
                            params.push(item.name);
                        }
                    } else {
                        params.push(appService.getAuthorArticleImagesUrl());
                        params.push(item.authorContentId);
                    }

                    return params.join('/');
                };
            }
        };
    };

    genericList.$inject = ['$timeout', 'appService'];
    module.exports = genericList;
})();
