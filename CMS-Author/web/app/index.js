'use strict';
window.CKEDITOR_BASEPATH = './ckeditor/';

var angular = require('angular');
require('angular-sanitize');
require('angular-animate');
require('angular-cookies');

window.$ = require('jquery');
window.jQuery = window.$;
require('bootstrap');
require('angular-ui-bootstrap');
require('angular-ui-router');
require('ui-select');

require('ckeditor');
require('ckeditor/adapters/jquery.js');

angular.module("templates", []);
require('./templates/templates');

angular.module('raiweb', [
	'ui.router',
	'templates',
	'ngSanitize',
	'ngAnimate',
	'ngCookies',
	'ui.bootstrap',
	'ui.select',
	require('./js/core/core').name,
	require('./js/dashboard/dashboard').name,
	require('./js/content/content').name,
	require('./js/account/account').name,
	require('./js/search/search').name
]);

