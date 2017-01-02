'use strict';
/*
*	customNavbar
*	Description
*	customNavbar directive is responsible for Painting Nav bar as per Items given
*/
(function() {
	var customNavbar = function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				name: '@',			// used for navid, statename
				items: '=',			// used for nv items ie. categories, tags etc. entities
				title: '@',			// displays brand section title
				stateName: '@',		// StateName like pub.category etc. to used in the item links
				className: '@',		// navbar class name eg. navbar-default, bavbar-inverse etc.
				itemIconClassNamePre: '@',	// icon class for prefixing item, eg. fa fa-list or glyphicon gyphicon-list etc.
				itemIconClassNamePost: '@',	// icon class for postfixing item, eg. fa fa-list or glyphicon gyphicon-list etc.
				headerIconClassName: '@'	// icon class for postfixing brand title, eg. fa fa-arrow-right or glyphicon gyphicon-arrow-right etc.
			},
			templateUrl: 'core/custom-navbar.html',
			link: function() {
			}
		};
	};

	customNavbar.$inject = [];
	module.exports = customNavbar;
})();
