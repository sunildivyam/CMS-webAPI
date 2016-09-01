'use strict';
(function() {
	/**
	*  	raiweb.technologies Module
	* 	Description
	*	This module is the technologies module for the application
	*	and has technologies level configurations if any
	*/

	angular.module('raiweb.technologies', []);
	/*
	*	Description
	*	All technologies module's
	*	Services
	*	Controllers
	*	Directives
	*	filters
	*	Providers etc.
	*	should be required here and defined in raiweb.technologies module
	*/

	angular.module('raiweb.technologies')
	.controller('technologiesController', require('./controllers/technologiesController'))
	.directive('technology', require('./directives/technology'));

	module.exports = angular.module('raiweb.technologies');
})();