'use strict';
(function() {
	/**
	*  	raiweb.aboutus Module
	* 	Description
	*	This module is the aboutus module for the application
	*	and has aboutus level configurations if any
	*/

	angular.module('raiweb.aboutus', []);
	/*
	*	Description
	*	All aboutus module's
	*	Services
	*	Controllers
	*	Directives
	*	filters
	*	Providers etc.
	*	should be required here and defined in raiweb.aboutus module
	*/

	angular.module('raiweb.aboutus')
	.factory('aboutusService', require('./services/aboutusService'))
	.controller('aboutusController', require('./controllers/aboutusController'));

	module.exports = angular.module('raiweb.aboutus');
})();