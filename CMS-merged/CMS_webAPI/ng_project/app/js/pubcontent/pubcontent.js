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
	.controller('myspaceController', require('./controllers/myspaceController'))
	.controller('commentController', require('./controllers/commentController'))

	.directive('pubcategoryView', require('./directives/pubcategoryView'))
	.directive('pubcontentView', require('./directives/pubcontentView'))
	.directive('pubcontentSearch', require('./directives/pubcontentSearch'))
	.directive('pubtagView', require('./directives/pubtagView'))
	.directive('pubUserProfile', require('./directives/pubUserProfile'))
	.directive('commentComponent', require('./directives/commentComponent'));

	module.exports = angular.module('raiweb.pubcontent');
})();