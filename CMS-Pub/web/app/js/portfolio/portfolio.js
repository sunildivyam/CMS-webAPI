'use strict';
(function() {
	/**
	*  	raiweb.portfolio Module
	* 	Description
	*	This module is the portfolio module for the application
	*	and has portfolio level configurations if any
	*/

	angular.module('raiweb.portfolio', []);
	/*
	*	Description
	*	All Portfolio module's
	*	Services
	*	Controllers
	*	Directives
	*	filters
	*	Providers etc.
	*	should be required here and defined in raiweb.portfolio module
	*/

	angular.module('raiweb.portfolio')
	.factory('portfolioService', require('./services/portfolioService'))
	.controller('portfolioController', require('./controllers/portfolioController'));

	module.exports = angular.module('raiweb.portfolio');
})();