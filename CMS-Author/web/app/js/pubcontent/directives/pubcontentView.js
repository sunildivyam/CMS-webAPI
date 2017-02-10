'use strict';
(function() {
	var pubcontentView = function($timeout, CkEditorService) {
		return {
			restrict: 'E',
			scope: {
				content: '=',
				isLoading: '='
			},
			templateUrl: 'pubcontent/pubcontent-view.html',
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

	pubcontentView.$inject = ['$timeout', 'CkEditorService'];
	module.exports = pubcontentView;
})();
