'use strict';
(function() {
	var contentForm = function($timeout, CkEditorService) {
		return {
			restrict: 'E',
			scope: {
				content: '='
			},
			templateUrl: 'content/content-preview.html',
			link: function($scope, element) {
				$scope.$watch('content', function(content) {
					if (content && content.description) {
						$timeout(function() {
							CkEditorService.updateMathJax();
							CkEditorService.updateCodeHighlight($(element));
						});
					}
				});
			}
		};
	};

	contentForm.$inject = ['$timeout', 'CkEditorService'];
	module.exports = contentForm;
})();
