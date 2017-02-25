'use strict';
/*
*	socialMediaShare
*	Description
*	socialMediaShare directive is responsible for
*	loading Social media Share buttons
*/
(function() {
	var socialMediaShare = function() {
		return {
			restrict: 'E',
			scope: {
				headerText:  '@',
				sharePageUrl: '@',
				sharePageTitle: '@'
			},
			templateUrl: 'core/social-media-share.html',
			link: function() {
			}
		};
	};

	socialMediaShare.$inject = [];
	module.exports = socialMediaShare;
})();
