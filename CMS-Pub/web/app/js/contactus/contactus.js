'use strict';
(function() {
	/**
	*  	raiweb.contactus Module
	* 	Description
	*	This module is the contactus module for the application
	*	and has contactus level configurations if any
	*/

	angular.module('raiweb.contactus', []);
	/*
	*	Description
	*	All contactus module's
	*	Services
	*	Controllers
	*	Directives
	*	filters
	*	Providers etc.
	*	should be required here and defined in raiweb.contactus module
	*/

	angular.module('raiweb.contactus')
	.factory('contactusService', require('./services/contactusService'))
	.controller('contactusController', require('./controllers/contactusController'));

	module.exports = angular.module('raiweb.contactus');
})();