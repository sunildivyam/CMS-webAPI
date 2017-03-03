'use strict';
(function() {
	/**
	*  	raiweb.pubcontent Module
	* 	Description
	*	This module is the content module for the application
	*	and has content level configurations if any
	*/

	angular.module('raiweb.pubcontent', []);
	/*
	*	Description
	*	All content module's
	*	Services
	*	Controllers
	*	Directives
	*	filters
	*	Providers etc.
	*	should be required here and defined in raiweb.pubcontent module
	*/

	angular.module('raiweb.pubcontent')
	.service('pubcontentService', require('./services/pubcontentService'))

	.controller('pubhomeController', require('./controllers/pubhomeController'))
	.controller('pubcontentController', require('./controllers/pubcontentController'))
	.controller('pubTagController', require('./controllers/pubTagController'))

	.directive('pubcategoryView', require('./directives/pubcategoryView'))
	.directive('pubcontentView', require('./directives/pubcontentView'))
	.directive('pubcontentSearch', require('./directives/pubcontentSearch'))
	.directive('pubTagView', require('./directives/pubTagView'));

	module.exports = angular.module('raiweb.pubcontent');
})();