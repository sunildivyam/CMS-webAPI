'use strict';
(function() {
    var appConfig = function($location) {
        var config = angular.copy(window._appConfig) || {};

        var uiAppConfig = {
            "application": {
                "url": "http://ui.learnwiseway.com",
                "name": "LearnWiseWay.com",
                "title": "Wise Learnings |  JavaScript Frameworks",
                "shortTitle": "Learn Wise Way",
                "description": "The popularity of JavaScript has led to a very vibrant ecosystem of technologies, frameworks, and libraries. Learn most popular javascript frameworks on learnwiseway.com and get yourself loaded with Angular JS, React JS, Node JS, ECMA 6, TypeScript etc.",
                "keywords": "javascript, frameworks, ui, libraries, programming, web development, front end, angular js, react js, javascript oop, node js, node.js, ECMA Script, ECMA 5, ECMA 6",
                "copyYear": 2017,
                "appLogo": {
                    "primaryTitle": "Learn Wise Way",
                    "highCharIndex": 7,
                    "secondaryTitle": "Wise Learnings"
                }
            }
        };

        function getConfig() {
            initAppUrls();
            // var host = $location.$$host;
            // if (host.toLowerCase() === 'ui.learnwiseway.com') {
            //     config.application = uiAppConfig.application;
            //     config.categories = uiAppConfig.categories;
            // }

            return config;
        }

        function initAppUrls() {
            config.appUrls = {};
            config.appUrls.API_SERVER_DUMMY_URL = '/CMSSERVERAPIURL/';
            config.appUrls.JSON_DATA_BASE_URL = '/data/';
            config.appUrls.API_SERVER_URL = config && config.application && config.application.apiUrl;

            // var host = $location.$$host;
            // if (host.toLowerCase() === 'ui.learnwiseway.com') {
            //     config.appUrls.API_SERVER_URL = 'http://uilwwapi.learnwiseway.com';
            // } else if (host.toLowerCase() === 'learnwiseway.com') {
            //     config.appUrls.API_SERVER_URL = 'http://lwwapi.learnwiseway.com';
            // } else {
            //     config.appUrls.API_SERVER_URL = 'http://uilwwapi.learnwiseway.com';
            // }

            config.appUrls.baseApiUrl = config.appUrls.API_SERVER_URL + '/api';
            config.appUrls.ARTICLE_IMAGES_URL = config.appUrls.baseApiUrl + config.application.articleImages;
            config.appUrls.QUIZ_IMAGES_URL = config.appUrls.baseApiUrl + config.application.quizImages;
            config.appUrls.AUTHOR_ARTICLE_IMAGES_URL = config.appUrls.baseApiUrl + config.application.authorArticleImages;;
            config.appUrls.USER_IMAGES_URL = config.appUrls.baseApiUrl + config.application.userImages;;            
        }

        return getConfig();
    };

    appConfig.$inject = ['$location'];
    module.exports = appConfig;
})();