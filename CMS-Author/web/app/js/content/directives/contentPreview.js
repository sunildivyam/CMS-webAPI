'use strict';
(function() {
	var contentForm = function() {
		return {
			restrict: 'E',
			scope: {
				content: '='
			},
			templateUrl: 'content/content-preview.html',
			link: function() {

			}
		};
	};

	contentForm.$inject = [];
	module.exports = contentForm;
})();
