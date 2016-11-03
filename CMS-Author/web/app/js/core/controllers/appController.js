'use strict';
/*
*   appController
*   Description
*   appController controls the Application Level Scope Data.
*/

(function() {
    var appController = function($rootScope, $scope, $window, responsiveDetectionService, accountService) {
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

        $scope.logout = function() {
            accountService.logout().then(function() {
                $rootScope.currentUser = accountService.getLoggedInUser();
            }, function(){
                $rootScope.currentUser = accountService.getLoggedInUser();
            });
        };

        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            if (toState && toState.name) {
                //Adds Body Class as per currentState
                $rootScope.bodyClass = toState.name.split('.')[0];
            }
        });

        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if (toState && toState.name) {
                //Adds Body Class as per currentState
                $rootScope.bodyClass = toState.name.split('.')[0];
                if (toState.isAnonymous !== true && accountService.isAnonymous() === true) {
                    event.preventDefault();
                    $rootScope.$state.go('login');
                }

                if (toState.name === 'logout') {
                    $scope.logout();
                }
            }
        });
    };

    appController.$inject = ['$rootScope', '$scope', '$window', 'responsiveDetectionService', 'accountService'];
    module.exports = appController;
})();
