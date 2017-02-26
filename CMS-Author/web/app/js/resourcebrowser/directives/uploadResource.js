'use strict';
(function() {
	var uploadResource = function() {
		return {
			restrict: 'E',
			scope: {
				onUpload: '='
			},
			templateUrl: 'resourcebrowser/upload.html',
			link: function($scope) {
				$scope.onUploadClick = function(event) {
					$scope.isUploading = true;
					$scope.uploadStatus = undefined;

					if (typeof $scope.onUpload === 'function') {
						$scope.onUpload(event, $scope.resourceData, completeCallback);
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

	uploadResource.$inject = [];
	module.exports = uploadResource;
})();
