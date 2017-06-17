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
	.controller('authorController', require('./controllers/authorController'))

	.directive('categoryForm', require('./directives/categoryForm'))
	.directive('tagForm', require('./directives/tagForm'))
	.directive('contentForm', require('./directives/contentForm'))
	.directive('inlineSearch', require('./directives/inlineSearch'))
	.directive('contentPreview', require('./directives/contentPreview'))
	.directive('addTagsForm', require('./directives/addTagsForm'));

	module.exports = angular.module('raiweb.content');
})();