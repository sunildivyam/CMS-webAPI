'use strict';
/*
*	appHeader
*	Description
*	appHeader directive is responsible for Painting Application Header
*/
(function() {
	var appHeader = function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'core/app-header.html',
			link: function() {
			}
		};
	};

	appHeader.$inject = [];
	module.exports = appHeader;
})();
