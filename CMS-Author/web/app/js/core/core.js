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
            isAnonymous: true,
            title: 'Error'
        })
        .state({
            name: 'termsandconditions',
            url: '/termsandconditions',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('core/terms-and-conditions-landing.html');
            }],
            isAnonymous: true,
            title: 'Terms and Conditions'
        })
        .state({
            name: 'login',
            url: '/account/login',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('account/login.html');
            }],
            controller: 'accountController',
            isAnonymous: true,
            title: 'Login'
        })
        .state({
            name: 'register',
            url: '/account/register',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('account/register.html');
            }],
            controller: 'accountController',
            isAnonymous: true,
            title: 'Register'
        })
        .state({
            name: 'forgotpassword',
            url: '/account/forgotpassword',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('account/forgot-password.html');
            }],
            controller: 'accountController',
            isAnonymous: true,
            title: 'Forgot Password'
        })
        .state({
            name: 'resetpassword',
            url: '/account/resetpassword?id&code',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('account/reset-password.html');
            }],
            controller: 'accountController',
            isAnonymous: true,
            title: 'Reset Password'
        })
        .state({
            name: 'verifyemail',
            url: '/account/verifyemail?id&code',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('account/verify-email.html');
            }],
            controller: 'accountController',
            isAnonymous: true,
            title: 'Verify Email'
        })
        .state({
            name: 'resendverifyemail',
            url: '/account/resendverifyemail?id',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('account/resend-verify-email.html');
            }],
            controller: 'accountController',
            isAnonymous: true,
            title: 'Resend Confirmation Email'
        })
        .state({
            name: 'logout',
            url: '/account/logout',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('account/logout.html');
            }],
            controller: 'accountController',
            isAnonymous: false,
            title: 'Logout'
        })
        .state({
            name: 'resourcebrowser',
            url: '/resourcebrowser?CKEditor&CKEditorFuncNum&langCode',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('resourcebrowser/landing.html');
            }],
            controller: 'resourcebrowserController',
            isAnonymous: false,
            title: 'File Browser'
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
            isAnonymous: false,
            title: 'My Profile'
        })
        .state({
            name: 'author.profile.changepassword',
            url: '/changepassword',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('account/change-password.html');
            }],
            isAnonymous: false,
            title: 'Change Password'
        })
        .state({
            name: 'author.profile.adminpanel',
            url: '/adminpanel',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('account/admin-panel.html');
            }],
            isAnonymous: false,
            inRoles: ['Administrators'],
            title: 'My Workspace'
        })
        .state({
            name: 'author.content',
            url: '/content?id',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('content/landing.html');
            }],
            controller: 'contentController',
            isAnonymous: false,
            title: 'Write Article'
        })
        .state({
            name: 'author.tag',
            url: '/tag?id',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('content/landing.html');
            }],
            controller: 'tagController',
            isAnonymous: false,
            title: 'Manage Tags'
        })
        .state({
            name: 'author.category',
            url: '/category?id',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('content/landing.html');
            }],
            controller: 'categoryController',
            isAnonymous: false,
            title: 'Manage Categories'
        })
        .state({
            name: 'author.dashboard',
            url: '/dashboard',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('dashboard/landing.html');
            }],
            controller: 'dashboardController',
            isAnonymous: false,
            title: 'Author Dashboard'
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
            name: 'pub.tags',
            url: 'tags/articles/:ti/:tn',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('pubcontent/tag-landing.html');
            }],
            controller: 'pubTagController',
            isAnonymous: true
        })
        .state({
            name: 'pub.search',
            url: 'search/:n/:kw',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('search/landing.html');
            }],
            controller: 'searchController',
            isAnonymous: true,
            title: 'Search Articles'
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
    .run(['$state', '$stateParams', '$rootScope', '$location', 'pageTitleService', 'metaInformationService',
        function($state, $stateParams, $rootScope, $location, pageTitleService, metaInformationService) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$location = $location;
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
    .directive('tinyScrollbar', require('./directives/tinyScrollbar'))
    .directive('bootstrapCarousel', require('./directives/bootstrapCarousel'))
    .directive('appFooter', require('./directives/appFooter'))
    .directive('socialMediaShare', require('./directives/socialMediaShare'));

    module.exports = angular.module('raiweb.core');
})();
