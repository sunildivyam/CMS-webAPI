'use strict';
(function() {
	/**
	*  	rbuilder Module
	* 	Description
	*	This module is the rBuilder 
	*/

	angular.module('rbuilder', []);
	/*
	*	Description
	*	All rbuilder module's
	*	Services
	*	Controllers
	*	Directives
	*	filters
	*	Providers etc.
	*	should be required here and defined in rbuilder module
	*/

	angular.module('rbuilder')
	.service('rbuilderService', require('./services/rbuilderService'))

	.factory('ResumeSection', require('./domain/ResumeSection'))
	.factory('DropZone', require('./domain/DropZone'))
	.factory('ResumeFormat', require('./domain/ResumeFormat'))

	.controller('rbuilderController', require('./controllers/rbuilderController'))
	
	.directive('dropZone', require('./directives/dropZone'))
	.directive('resumeSection', require('./directives/resumeSection'))
	.directive('resumeFormat', require('./directives/resumeFormat'))
	.directive('skills', require('./directives/skills'))
	.directive('languages', require('./directives/languages'));

	module.exports = angular.module('rbuilder');
})();