'use strict';
/*
*   appController
*   Description
*   appController controls the Application Level Scope Data.
*/

(function() {
    var appController = function($rootScope, $scope, $window, pageTitleService, metaInformationService, appHeaderService, responsiveDetectionService) {
        $rootScope.bodyClass = '';
        // sets the currentBreakpoint on page Load.
        setCurrentBreakpoint();

        /*
        *   setCurrentBreakpoint is a private method
        *   sets the current bootstrap breakpoint, on load or resize of the window.
        *   The responsiveDetectionService gives the current breakpoint based on the current window size
        */
        function setCurrentBreakpoint() {
            $rootScope.currentBreakpoint = responsiveDetectionService.getCurrentBreakpoint();
            if (!$rootScope.$$phase) {
                $rootScope.$apply();
            }
        }
        /*
        *   Window Resize handler to identify current Bootstrao breakpoint
        *   to make it available throughout Application, assigns to $rootScope
        */
        angular.element($window).bind('resize', function() {
            setCurrentBreakpoint();
        });

        /*
        *   returns the Nav Item Info By stateName from the curently created first Level States
        */

        $scope.getFirstLevelNavItemByStateName = function(stateName) {
            var navItems = $rootScope && $rootScope.appHeader && $rootScope.appHeader.navs;
            if (navItems instanceof Array) {
                var foundItems = navItems.filter(function(item) {
                    if(item.stateName === stateName) {
                        return item;
                    }
                });

                if (foundItems && foundItems.length) {
                    return foundItems[0];
                }
                return false;
            }
        };

        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            if (toState && toState.name) {
                //Adds Body Class as per currentState
                $rootScope.bodyClass = toState.name.split('.')[0];
            }
        });
    };

    appController.$inject = ['$rootScope', '$scope', '$window' ,'pageTitleService', 'metaInformationService', 'appHeaderService', 'responsiveDetectionService'];
    module.exports = appController;
})();
