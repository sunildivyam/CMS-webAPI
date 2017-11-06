'use strict';
(function() {
	var pubUserProfile = function($location, pageTitleService, appService) {
		return {
			restrict: 'E',
			scope: {
				user: '=',
				isLoading: '='
			},
			templateUrl: 'pubcontent/pub-user-profile.html',
			link: function($scope) {
				$scope.$location = $location;
				$scope.pageTitleService = pageTitleService;
				setThumbnailUrl(false);

				$scope.$watch('user', function(newValue) {
					if (newValue && newValue.userName) {
						setThumbnailUrl();
					}
				});

				function setThumbnailUrl(url) {
		            if (url === false) {
		                $scope.userThumbnailUrl = '';
		            } else if($scope.user && $scope.user.userName){
		                $scope.userThumbnailUrl = [appService.getUserImagesUrl(), $scope.user.userName].join('/');
		            } else {
		            	$scope.userThumbnailUrl = '';
		            }
		        }
			}
		};
	};

	pubUserProfile.$inject = ['$location', 'pageTitleService', 'appService'];
	module.exports = pubUserProfile;
})();
