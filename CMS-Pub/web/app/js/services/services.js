'use strict';
(function() {
	/**
	*  	raiweb.services Module
	* 	Description
	*	This module is the services module for the application
	*	and has services level configurations if any
	*/

	angular.module('raiweb.services', []);
	/*
	*	Description
	*	All Services module's
	*	Services
	*	Controllers
	*	Directives
	*	filters
	*	Providers etc.
	*	should be required here and defined in raiweb.services module
	*/

	angular.module('raiweb.services')
	.controller('servicesController', require('./controllers/servicesController'))
	.directive('service', require('./directives/service'));

	module.exports = angular.module('raiweb.services');
})();