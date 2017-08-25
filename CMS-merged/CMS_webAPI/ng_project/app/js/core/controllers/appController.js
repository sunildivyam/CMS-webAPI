'use strict';
/*
*   appController
*   Description
*   appController controls the Application Level Scope Data.
*/

(function() {
    var appController = function($rootScope, $scope, $window, responsiveDetectionService, accountService, Utils, modalService, EntityMapper, Category, pubcontentService) {
        $rootScope.bodyClass = '';
        $rootScope.appLogo = {
            primaryTitle: 'LearnWiseWay',
            highCharIndex: 6,
            secondaryTitle: 'Wise Learnings'
        };
        // sets the currentBreakpoint on page Load.
        setCurrentBreakpoint();

        //Gets all categories
        getCategories();
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

        // gets all categories
        function getCategories() {
            var categories = Utils.getCategories();
            if (categories) {
                $rootScope.categories = new EntityMapper(Category).toEntities(categories);
                return;
            }

            $scope.isCategoriesLoading = true;
            pubcontentService.getCategories().then(function(response) {
                $rootScope.categories = new EntityMapper(Category).toEntities(response.data);
                $scope.isCategoriesLoading = false;
            }, function() {
                $rootScope.categories = new EntityMapper(Category).toEntities();
                $scope.isCategoriesLoading = false;
            });
        }

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if (toState && toState.name) {
                Utils.getListConfigs().then(function(response) {
                    $rootScope.application = response && response.application;
                    $rootScope.appLogo = $rootScope.application && $rootScope.application.appLogo;
                    if (toState && toState.title) {
                        // Sets Meta information for Page
                        Utils.setMetaInfo(toState.title);
                    }
                });
                // Scrolls to Top on State Change
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                //Adds Body Class as per currentState
                $rootScope.bodyClass = toState.name.split('.')[0];

                if (['login', 'register'].includes(toState.name) && fromState.returnable === true) {
                    accountService.setReturnState(fromState.name, fromParams);
                }
            }
        });

        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if (toState && toState.name) {
                //Adds Body Class as per currentState
                $rootScope.bodyClass = toState.name.split('.')[0];
                if (toState.isAnonymous !== true && (accountService.isAnonymous() === true ||
                (toState.inRoles instanceof Array && accountService.isUserInRoles(toState.inRoles) === false))) {
                    event.preventDefault();
                    modalService.alert('md',
                    'Not Authorized',
                    'You are not authorized to view this Page.',
                    'Login',
                    'Cancel').result.then(function() {
                        $rootScope.$state.go('login');
                    }, function() {
                        //event.preventDefault();
                    });
                }

                if (toState.name === 'logout') {
                    $scope.logout();
                }
            }
        });
    };

    appController.$inject = ['$rootScope', '$scope', '$window', 'responsiveDetectionService', 'accountService', 'Utils', 'modalService', 'EntityMapper', 'Category', 'pubcontentService'];
    module.exports = appController;
})();
