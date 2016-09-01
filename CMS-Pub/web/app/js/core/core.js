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
        $stateProvider.state({
            name: 'error',
            url: '/error',
            templateProvider: ['$templateCache', function($templateCache) {
                return $templateCache.get('core/error.html');
            }]
        });
        /*  This is window.$stateProviderRef variable and is used to create All States Dynamically
        *   from appHeaderService fetched nav data
        */
        window.$stateProviderRef = $stateProvider;
        // Enables html5Mode Urls
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

        $httpProvider.interceptors.push('requestInterceptor');
    }])
    /*
    *   Description
    *   Run method of core module, makes the $state and $stateParams Service, available
    *   to the $rootScope Service
    */
    .run(['$state', '$stateParams', '$rootScope', 'appHeaderService','pageTitleService',
        'metaInformationService', '$location', 'stateHelperService', '$q', 'servicesService', 'articlesService', 'technologiesService',
        function($state, $stateParams, $rootScope, appHeaderService, pageTitleService,
        metaInformationService, $location, stateHelperService, $q, servicesService, articlesService, technologiesService) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        /*
        *   assigns pageTitleService and metaInformationService to $rootScope
        *   so that both are available in the Head section of HTML page
        */

        $rootScope.pageTitleService = pageTitleService;
        $rootScope.metaInformationService = metaInformationService;

        function configureServices(services) {
            if (services instanceof Array) {
                var parentStateName = 'services';
                stateHelperService.createStates(services, parentStateName);
            }
        }

        function configureArticles(articles) {
            if (articles instanceof Array) {
                var parentStateName = 'articles';
                stateHelperService.createStates(articles, parentStateName);
            }
        }

        function configureTechnologies(technologies) {
            if (technologies instanceof Array) {
                var parentStateName = 'technologies';
                stateHelperService.createStates(technologies, parentStateName);
            }
        }

        /*
        *   configureAppHeader is a private method
        *   It takes an Object param, and sets the various Header Information
        *   If param of anyother type is passed, it resets all the Header Information to null.
        *   So This method can be used to reset Header Information by passing false valueto param
        */
        function configureAppHeader(headerInfo) {
            if (headerInfo instanceof Object) {
                $rootScope.appHeader = {
                    application: headerInfo.application || null,
                    logo: headerInfo.logo || null,
                    navs: headerInfo.items || null,
                    footerServices: headerInfo.footerServices || null,
                    footerArticles: headerInfo.footerArticles || null,
                    footerTechnologies: headerInfo.footerTechnologies || null,
                    socialMediaLinks: headerInfo.socialMediaLinks || null
                };
            } else {
                $rootScope.appHeader = {
                    application: null,
                    logo: null,
                    navs: null,
                    footerServices: null,
                    footerArticles: null,
                    footerTechnologies: null,
                    socialMediaLinks: null
                };
            }

            stateHelperService.createStates($rootScope.appHeader.navs);
            setMetaInformation(); //resets meta information
        }

        function configureAppFooter(headerInfo) {
            if (headerInfo instanceof Object) {
                servicesService.getServicesByIds(headerInfo.footerServices).then(function(services) {
                    headerInfo.footerServices = services;
                });
                articlesService.getArticlesByIds(headerInfo.footerArticles).then(function(articles) {
                    headerInfo.footerArticles = articles;
                });
                technologiesService.getTechnologiesByIds(headerInfo.footerTechnologies).then(function(technologies) {
                    headerInfo.footerTechnologies = technologies;
                });
            }
        }

        /*
        *   setMetaInformation is a private method
        *   It takes an Object param, and sets the following meta Information of Page:
        *   keywords, description and page Title
        */
        function setMetaInformation() {
            metaInformationService.reset();
            pageTitleService.setPageTitle();
        }

        appHeaderService.getAppHeaderInfo().then(function(headerInfo) {
            configureAppHeader(headerInfo);

            var servicesPromise = servicesService.getAllServices().then(function(services) {
                configureServices(services);
            }, function() {
                configureServices();
            });

            var articlesPromise = articlesService.getAllArticles().then(function(articles) {
                configureArticles(articles);
            }, function() {
                configureArticles();
            });

            var technologiesPromise = technologiesService.getAllTechnologies().then(function(technologies) {
                configureTechnologies(technologies);
            }, function() {
                configureTechnologies();
            });

            $q.all(servicesPromise, articlesPromise, technologiesPromise).then(function() {
                configureAppFooter($rootScope.appHeader);
                //goto currentState or default state
                stateHelperService.loadCurrentOrDefaultState();
            }, function() {
                //goto currentState or default state
                stateHelperService.loadCurrentOrDefaultState();
            });
        }, function() {
            configureAppHeader();
        });
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
    .factory('servicesService', require('./services/servicesService'))
    .factory('articlesService', require('./services/articlesService'))
    .factory('technologiesService', require('./services/technologiesService'))
    .factory('appHeaderService', require('./services/appHeaderService'))
    .controller('appController', require('./controllers/appController'))
    .directive('appHeader', require('./directives/appHeader'))
    .directive('brandLogo', require('./directives/brandLogo'))
    .directive('featureList', require('./directives/featureList'))
    .directive('bootstrapCarousel', require('./directives/bootstrapCarousel'))
    .directive('tags', require('./directives/tags'))
    .directive('appFooter', require('./directives/appFooter'));

    module.exports = angular.module('raiweb.core');
})();
