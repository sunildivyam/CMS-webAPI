'use strict';
(function() {
	/**
	*  	raiweb.content Module
	* 	Description
	*	This module is the content module for the application
	*	and has content level configurations if any
	*/

	angular.module('raiweb.content', []);
	/*
	*	Description
	*	All content module's
	*	Services
	*	Controllers
	*	Directives
	*	filters
	*	Providers etc.
	*	should be required here and defined in raiweb.content module
	*/

	angular.module('raiweb.content')
	.service('contentService', require('./services/contentService'))

	.controller('contentController', require('./controllers/contentController'))
	.controller('tagController', require('./controllers/tagController'))
	.controller('categoryController', require('./controllers/categoryController'))

	.directive('categoryForm', require('./directives/categoryForm'))
	.directive('tagForm', require('./directives/tagForm'))
	.directive('contentForm', require('./directives/contentForm'))
	.directive('contentList', require('./directives/contentList'))
	.directive('tagList', require('./directives/tagList'))
	.directive('categoryList', require('./directives/categoryList'))
	.directive('inlineSearch', require('./directives/inlineSearch'))
	.directive('contentPreview', require('./directives/contentPreview'));

	module.exports = angular.module('raiweb.content');
})();