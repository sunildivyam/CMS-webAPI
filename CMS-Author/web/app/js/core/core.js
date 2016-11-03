'use strict';
(function() {
    /**
    *   raiweb.core Module
    *   Description
    *   This module is the base module for the application and has States configurations
    *   and other core level configurations if any
    */

    angular.module('raiweb.core', [])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        // Error Page State Definition. All other states are created in Run section of this module
        $urlRouterProvider.otherwise('/dashboard');
        $stateProvider.state({
            name: 'error',
            url: '/error',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('core/error.html');
            }],
            isAnonymous: true
        })
        .state({
            name: 'login',
            url: '/account/login',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('account/login.html');
            }],
            controller: 'accountController',
            isAnonymous: true
        })
        .state({
            name: 'register',
            url: '/account/register',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('account/register.html');
            }],
            controller: 'accountController',
            isAnonymous: true
        })
        .state({
            name: 'logout',
            url: '/account/logout',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('account/logout.html');
            }],
            controller: 'accountController',
            isAnonymous: false
        })
        .state({
            name: 'profile',
            url: '/account/profile',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('account/profile.html');
            }],
            isAnonymous: false
        })
        .state({
            name: 'dashboard',
            url: '/dashboard',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('dashboard/landing.html');
            }],
            isAnonymous: false
        });

        // Enables html5Mode Urls
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

        $httpProvider.interceptors.push('requestInterceptor');

        // Prevents preFlight requests
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};

    }])
    /*
    *   Description
    *   Run method of core module, makes the $state and $stateParams Service, available
    *   to the $rootScope Service
    */
    .run(['$state', '$stateParams', '$rootScope', 'pageTitleService', 'metaInformationService',
        function($state, $stateParams, $rootScope, pageTitleService, metaInformationService) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        /*
        *   assigns pageTitleService and metaInformationService to $rootScope
        *   so that both are available in the Head section of HTML page
        */

        $rootScope.pageTitleService = pageTitleService;
        $rootScope.metaInformationService = metaInformationService;

        /*
        *   setMetaInformation is a private method
        *   It takes an Object param, and sets the following meta Information of Page:
        *   keywords, description and page Title
        */
        function setMetaInformation() {
            metaInformationService.reset();
            pageTitleService.setPageTitle();
        }

        setMetaInformation();
    }]);

    /*
    *   Description
    *   All Core module's
    *   Services
    *   Controllers
    *   Directives
    *   filters
    *   Providers etc.
    *   should be required here and defined in raiweb.core module
    */

    angular.module('raiweb.core')
    .factory('requestInterceptor', require('./services/requestInterceptor'))
    .factory('responsiveDetectionService', require('./services/responsiveDetectionService'))
    .factory('stateHelperService', require('./services/stateHelperService'))
    .factory('appService', require('./services/appService'))
    .factory('pageTitleService', require('./services/pageTitleService'))
    .factory('metaInformationService', require('./services/metaInformationService'))
    .factory('modalService', require('./services/modalService'))

    .factory('User', require('./domain/User'))

    .controller('appController', require('./controllers/appController'))

    .directive('brandLogo', require('./directives/brandLogo'))
    .directive('loader', require('./directives/loader'))
    .directive('tags', require('./directives/tags'));

    module.exports = angular.module('raiweb.core');
})();
