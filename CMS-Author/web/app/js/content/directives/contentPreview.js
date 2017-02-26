'use strict';
(function() {
	var contentForm = function($timeout, CkEditorService, appService) {
		return {
			restrict: 'E',
			scope: {
				content: '='
			},
			templateUrl: 'content/content-preview.html',
			link: function($scope, element) {
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
						$scope.thumbnailUrl = [appService.getArticleImagesUrl(), ($scope.content.authorContentId || $scope.content.contentId) + '.jpg?v=' + (new Date()).getTime()].join('/');
					}
				}
			}
		};
	};

	contentForm.$inject = ['$timeout', 'CkEditorService', 'appService'];
	module.exports = contentForm;
})();
