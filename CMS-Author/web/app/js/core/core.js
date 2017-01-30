'use strict';
(function() {
    /**
    *   raiweb.core Module
    *   Description
    *   This module is the base module for the application and has States configurations
    *   and other core level configurations if any
    */

    angular.module('raiweb.core', [])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider','$qProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $qProvider) {
        // Error Page State Definition. All other states are created in Run section of this module
        $qProvider.errorOnUnhandledRejections(false);
        $urlRouterProvider.otherwise('/');
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
            name: 'resourcebrowser',
            url: '/resourcebrowser?CKEditor&CKEditorFuncNum&langCode',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('resourcebrowser/landing.html');
            }],
            controller: 'resourcebrowserController',
            isAnonymous: false
        })
        .state({
            name: 'author',
            // url: '/author',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('core/author-home.html');
            }],
            controller: 'authorController',
            isAnonymous: false,
            resolve: {}
        })
        .state({
            name: 'author.profile',
            url: '/account/profile',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('account/profile-landing.html');
            }],
            controller: 'profileController',
            isAnonymous: false
        })
        .state({
            name: 'author.profile.myprofile',
            url: '/myprofile',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('account/profile.html');
            }],
            isAnonymous: false
        })
        .state({
            name: 'author.profile.changepassword',
            url: '/changepassword',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('account/change-password.html');
            }],
            isAnonymous: false
        })
        .state({
            name: 'author.profile.resetpassword',
            url: '/resetpassword',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('account/reset-password.html');
            }],
            isAnonymous: false
        })
        .state({
            name: 'author.content',
            url: '/content?id',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('content/landing.html');
            }],
            controller: 'contentController',
            isAnonymous: false
        })
        .state({
            name: 'author.tag',
            url: '/tag?id',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('content/landing.html');
            }],
            controller: 'tagController',
            isAnonymous: false
        })
        .state({
            name: 'author.category',
            url: '/category?id',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('content/landing.html');
            }],
            controller: 'categoryController',
            isAnonymous: false
        })
        .state({
            name: 'author.dashboard',
            url: '/dashboard',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('dashboard/landing.html');
            }],
            controller: 'dashboardController',
            isAnonymous: false
        })

        // Published Contents
        .state({
            name: 'pub',
            url: '/',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('core/pub-landing.html');
            }],
            controller: 'pubhomeController',
            isAnonymous: true
        })
        .state({
            name: 'pub.articles',
            url: 'articles/:n',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('pubcontent/category-landing.html');
            }],
            controller: 'pubcontentController',
            isAnonymous: true
        })
        .state({
            name: 'pub.articles.content',
            url: '/:ci/:cn',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('pubcontent/content-landing.html');
            }],
            controller: 'pubcontentController',
            isAnonymous: true
        })
        .state({
            name: 'pub.search',
            url: 'search/:n/:kw',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('search/landing.html');
            }],
            controller: 'searchController',
            isAnonymous: true
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
    .factory('Utils', require('./services/Utils'))
    .factory('CkEditorService', require('./services/CkEditorService'))

    .factory('EntityMapper', require('./domain/EntityMapper'))
    .factory('User', require('./domain/User'))
    .factory('Category', require('./domain/Category'))
    .factory('Tag', require('./domain/Tag'))
    .factory('Content', require('./domain/Content'))
    .factory('ContentResource', require('./domain/ContentResource'))

    .controller('appController', require('./controllers/appController'))
    .controller('genericListController', require('./controllers/genericListController'))

    .directive('brandLogo', require('./directives/brandLogo'))
    .directive('loader', require('./directives/loader'))
    .directive('tags', require('./directives/tags'))
    .directive('ck', require('./directives/ck'))
    .directive('customNavbar', require('./directives/customNavbar'))
    .directive('isotopeLayout', require('./directives/isotopeLayout'))
    .directive('onNgRepeatItem', require('./directives/onNgRepeatItem'))
    .directive('fileInput', require('./directives/fileInput'))
    .directive('btnToolbar', require('./directives/btnToolbar'))
    .directive('genericList', require('./directives/genericList'))
    .directive('tinyScrollbar', require('./directives/tinyScrollbar'));

    module.exports = angular.module('raiweb.core');
})();
