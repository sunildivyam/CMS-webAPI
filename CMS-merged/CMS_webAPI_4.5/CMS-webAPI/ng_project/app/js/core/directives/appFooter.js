'use strict';
/*
*	appFooter
*	Description
*	appFooter directive is responsible for
*	loading Application Footer
*/
(function() {
	var appFooter = function() {
		return {
			restrict: 'E',
			templateUrl: 'core/app-footer.html',
			link: function() {
			}
		};
	};

	appFooter.$inject = [];
	module.exports = appFooter;
})();
