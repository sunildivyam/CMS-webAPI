'use strict';
(function() {
	var aboutusHeader = function() {
		return {
			restrict: 'A',
			replace: true,
			scope: {
				'logo': '=',
				'navs': '='
			},
			templateUrl: 'aboutus/aboutus-header.html',
			link: function() {

			}
		};
	};

	aboutusHeader.$inject = [];
	module.exports = aboutusHeader;
})();
