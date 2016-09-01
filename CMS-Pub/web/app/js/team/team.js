'use strict';
(function() {
	/**
	*  	raiweb.team Module
	* 	Description
	*	This module is the team module for the application
	*	and has team level configurations if any
	*/

	angular.module('raiweb.team', []);
	/*
	*	Description
	*	All team module's
	*	Services
	*	Controllers
	*	Directives
	*	filters
	*	Providers etc.
	*	should be required here and defined in raiweb.team module
	*/

	angular.module('raiweb.team')
	.factory('teamService', require('./services/teamService'))
	.controller('teamController', require('./controllers/teamController'));

	module.exports = angular.module('raiweb.team');
})();