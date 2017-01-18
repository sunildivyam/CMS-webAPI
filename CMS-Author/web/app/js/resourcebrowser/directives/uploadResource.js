'use strict';
(function() {
	var uploadResource = function(ContentResource) {
		return {
			restrict: 'E',
			scope: {
				onUpload: '='
			},
			templateUrl: 'resourcebrowser/upload.html',
			link: function($scope) {
				$scope.contentResource = new ContentResource();

				$scope.onUploadClick = function(event) {
					$scope.isUploading = true;
					$scope.uploadStatus = undefined;

					if (typeof $scope.onUpload === 'function') {
						$scope.onUpload(event, $scope.contentResource, completeCallback);
					}

					function completeCallback(status, message) {
						$scope.uploadStatus = status;
						$scope.failureMessage = message || '';
						$scope.isUploading = false;
					}
				};
			}
		};
	};

	uploadResource.$inject = ['ContentResource'];
	module.exports = uploadResource;
})();
