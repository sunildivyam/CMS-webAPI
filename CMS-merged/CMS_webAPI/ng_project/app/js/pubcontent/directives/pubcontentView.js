'use strict';
(function() {
	var pubcontentView = function($timeout, CkEditorService, $location, pageTitleService, appService) {
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
				setThumbnailUrl(false);
				$scope.$watch('content', function(content) {
					if (content && content.description) {
						$timeout(function() {
							CkEditorService.updateMathJax();
							CkEditorService.updateCodeHighlight($(element));
						});
					}

					if (content) {
						setThumbnailUrl();
					}
				});

				function setThumbnailUrl(url) {
					if (url === false) {
						$scope.thumbnailUrl = '';
					} else {
						$scope.thumbnailUrl = [appService.getArticleImagesUrl(), ($scope.content.authorContentId || $scope.content.contentId) + '.jpg'].join('/');
					}
				}
			}
		};
	};

	pubcontentView.$inject = ['$timeout', 'CkEditorService', '$location', 'pageTitleService', 'appService'];
	module.exports = pubcontentView;
})();
