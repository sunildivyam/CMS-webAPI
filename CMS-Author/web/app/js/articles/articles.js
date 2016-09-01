'use strict';
(function() {
	/**
	*  	raiweb.articles Module
	* 	Description
	*	This module is the articles module for the application
	*	and has articles level configurations if any
	*/

	angular.module('raiweb.articles', []);
	/*
	*	Description
	*	All articles module's
	*	Services
	*	Controllers
	*	Directives
	*	filters
	*	Providers etc.
	*	should be required here and defined in raiweb.articles module
	*/

	angular.module('raiweb.articles')
	.controller('articlesController', require('./controllers/articlesController'))
	.directive('articleDocument', require('./directives/articleDocument'));

	module.exports = angular.module('raiweb.articles');
})();