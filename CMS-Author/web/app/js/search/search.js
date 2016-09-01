'use strict';
(function() {
    /**
    *   raiweb.search Module
    *   Description
    *   This module is the search module for the application
    *   and has search level configurations if any
    */

    angular.module('raiweb.search', []);
    /*
    *   Description
    *   All Home module's
    *   Services
    *   Controllers
    *   Directives
    *   filters
    *   Providers etc.
    *   should be required here and defined in raiweb.search module
    */

    angular.module('raiweb.search')
    .factory('searchService', require('./services/searchService'))
    .controller('searchController', require('./controllers/searchController'))
    .directive('globalSearch', require('./directives/globalSearch'));

    module.exports = angular.module('raiweb.search');
})();