'use strict';
(function() {
	/**
	*  	raiweb.dashboard Module
	* 	Description
	*	This module is the dashboard module for the application
	*	and has dashboard level configurations if any
	*/

	angular.module('raiweb.dashboard', []);
	/*
	*	Description
	*	All dashboard module's
	*	Services
	*	Controllers
	*	Directives
	*	filters
	*	Providers etc.
	*	should be required here and defined in raiweb.dashboard module
	*/

	angular.module('raiweb.dashboard')
	.controller('dashboardController', require('./controllers/dashboardController'));

	module.exports = angular.module('raiweb.dashboard');
})();