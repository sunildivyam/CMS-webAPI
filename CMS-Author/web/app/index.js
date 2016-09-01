'use strict';
var angular = require('angular');
require('angular-sanitize');
require('angular-animate');

window.$ = require('jquery');
window.jQuery = window.$;
require('bootstrap');
require('angular-ui-router');

angular.module("templates", []);
require('./templates/templates');

angular.module('raiweb', [
	'ui.router',
	'templates',
	'ngSanitize',
	'ngAnimate',
	require('./js/core/core').name,
	require('./js/home/home').name,
	require('./js/services/services').name,
	require('./js/portfolio/portfolio').name,
	require('./js/aboutus/aboutus').name,
	require('./js/contactus/contactus').name,
	require('./js/team/team').name,
	require('./js/articles/articles').name,
	require('./js/search/search').name,
	require('./js/technologies/technologies').name
]);

