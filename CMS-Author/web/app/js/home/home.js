'use strict';
(function() {
	/**
	*  	raiweb.home Module
	* 	Description
	*	This module is the home module for the application
	*	and has home level configurations if any
	*/

	angular.module('raiweb.home', []);
	/*
	*	Description
	*	All Home module's
	*	Services
	*	Controllers
	*	Directives
	*	filters
	*	Providers etc.
	*	should be required here and defined in raiweb.home module
	*/

	angular.module('raiweb.home')
	.factory('homeService', require('./services/homeService'))
	.controller('homeController', require('./controllers/homeController'));

	module.exports = angular.module('raiweb.home');
})();