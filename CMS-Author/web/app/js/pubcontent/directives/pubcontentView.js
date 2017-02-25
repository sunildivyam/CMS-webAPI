'use strict';
(function() {
	var pubcontentView = function($timeout, CkEditorService, $location, pageTitleService) {
		return {
			restrict: 'E',
			scope: {
				content: '=',
				isLoading: '='
			},
			templateUrl: 'pubcontent/pubcontent-view.html',
			link: function($scope, element) {
				$scope.$location = $location;
				$scope.pageTitleService = pageTitleService;

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

	pubcontentView.$inject = ['$timeout', 'CkEditorService', '$location', 'pageTitleService'];
	module.exports = pubcontentView;
})();
