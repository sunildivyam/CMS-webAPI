'use strict';
(function() {
	var pubcontentView = function() {
		return {
			restrict: 'E',
			scope: {
				content: '='
			},
			templateUrl: 'pubcontent/pubcontent-view.html',
			link: function() {

			}
		};
	};

	pubcontentView.$inject = [];
	module.exports = pubcontentView;
})();
