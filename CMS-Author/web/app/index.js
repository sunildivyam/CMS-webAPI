'use strict';
var angular = require('angular');
require('angular-sanitize');
require('angular-animate');
require('angular-cookies');

window.$ = require('jquery');
window.jQuery = window.$;
require('bootstrap');
require('angular-ui-bootstrap');
require('angular-ui-router');

angular.module("templates", []);
require('./templates/templates');

angular.module('raiweb', [
	'ui.router',
	'templates',
	'ngSanitize',
	'ngAnimate',
	'ngCookies',
	'ui.bootstrap',
	require('./js/core/core').name,
	require('./js/dashboard/dashboard').name,
	require('./js/content/content').name,
	require('./js/account/account').name,
	require('./js/search/search').name
]);

