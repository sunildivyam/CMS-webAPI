'use strict';
(function() {
	/**
	*  	raiweb.resourcebrowser Module
	* 	Description
	*	This module is the content module for the application
	*	and has content level configurations if any
	*/

	angular.module('raiweb.resourcebrowser', []);
	/*
	*	Description
	*	All content module's
	*	Services
	*	Controllers
	*	Directives
	*	filters
	*	Providers etc.
	*	should be required here and defined in raiweb.resourcebrowser module
	*/

	angular.module('raiweb.resourcebrowser')
	.service('resourcebrowserService', require('./services/resourcebrowserService'))

	.controller('resourcebrowserController', require('./controllers/resourcebrowserController'))

	.directive('uploadResource', require('./directives/uploadResource'));

	module.exports = angular.module('raiweb.resourcebrowser');
})();