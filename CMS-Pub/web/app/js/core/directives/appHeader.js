'use strict';
/**
 * @ngdoc directive
 * @name pfoexp.core:appHeader
 * @element Any
 * @function
 *
 * @description
 * appHeader directive is responsible for loading and painting Application Header
 * from its Html template
 * This may include:
 * Logo, Menu items, Featured Links, Social media Links, Copyrights Information etc.
 */

(function() {
    var appHeader = function($rootScope, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                logo: '=',
                navs: '='
            },
            templateUrl: 'core/app-header.html',
            link: function($scope) {
                var menuHoverDelay = 300;   // menu hover delay in miliseconds
                $scope.logoSize = $rootScope.currentBreakpoint;

                $scope.$watch('navs', function(newValue) {
                    if (newValue instanceof Array && newValue.length > 0) {
                        $timeout(function() {
                            /*
                            *   binds hover event to the dropdown menu item.
                            *   on hover in shows the dropdown-menu and adds open class to the menuitem
                            *   on hover out hides the dropdown-menu and removes the open class from the meneitem
                            *   And This restricts above behavior in XS mode of navigation
                            */
                            $('ul.nav li.dropdown').hover(function() {
                                if ($rootScope.currentBreakpoint !== 'xs') {
                                    showDropdown($(this));
                                }
                            }, function() {
                                if ($rootScope.currentBreakpoint !== 'xs') {
                                    var $menuItem = $(this);
                                    hideDropdown($menuItem);
                                }
                            });

                            /*
                            *   binds click event to the dropdown menu item.
                            *   on click it toggles the dropdown-menu
                            *   This applies in both modes XS and all other modes of navigation
                            */
                            $('ul.nav li.dropdown').click(function(event) {
                                event.stopPropagation();
                                var $menuItem = $(this);

                                if($menuItem.hasClass('open')) {
                                    hideDropdown($menuItem);
                                } else {
                                    showDropdown($menuItem);
                                }
                            });

                        });
                    }
                });

                /*
                *   $rootScope.currentBreakpoint has the current Mode xs, sm, md, lg etc.
                *   and its Value is set in window.resize event and implemented in responsiveDetectionService
                */
                $rootScope.$watch('currentBreakpoint', function(newValue, oldValue) {
                    if (newValue && newValue !== oldValue) {
                        $scope.logoSize = newValue;
                    }
                });

                /*
                *   private method to show dropdown-menu and adds open class to menuitem
                */
                function showDropdown(menuItem) {
                    menuItem.addClass('open');
                    menuItem.find('.dropdown-menu').stop(true, true).fadeIn(menuHoverDelay);
                }

                /*
                *   private method to hide dropdown-menu and remove open class from menuitem
                */
                function hideDropdown(menuItem) {
                    menuItem.find('.dropdown-menu').stop(true, true).fadeOut(menuHoverDelay, function() {
                        menuItem.removeClass('open');
                    });
                }
            }
        };
    };

    appHeader.$inject = ['$rootScope', '$timeout'];
    module.exports = appHeader;
})();
