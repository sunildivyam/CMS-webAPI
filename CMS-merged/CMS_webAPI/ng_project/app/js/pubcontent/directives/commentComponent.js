'use strict';
(function() {
	var commentComponent = function() {
		return {
			restrict: 'E',
			scope: {
				content: '='
			},
			templateUrl: 'pubcontent/comment-component.html',
			controller: "commentController",
			link: function($scope) {
				
			}
		};
	};

	commentComponent.$inject = [];
	module.exports = commentComponent;
})();
