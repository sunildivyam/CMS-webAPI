'use strict';
(function() {
	/**
	*  	raiweb.account Module
	* 	Description
	*	This module is the account module for the application
	*	and has account level configurations if any
	*/

	angular.module('raiweb.account', []);
	/*
	*	Description
	*	All account module's
	*	Services
	*	Controllers
	*	Directives
	*	filters
	*	Providers etc.
	*	should be required here and defined in raiweb.account module
	*/

	angular.module('raiweb.account')
	.factory('accountService', require('./services/accountService'))
	.controller('accountController', require('./controllers/accountController'))
	.directive('passwordCompare', require('./directives/passwordCompare'))
	.directive('loginStatusBar', require('./directives/loginStatusBar'));

	module.exports = angular.module('raiweb.account');
})();