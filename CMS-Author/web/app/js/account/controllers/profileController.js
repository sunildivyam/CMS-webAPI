'use strict';
/*
* @ngdoc controller
* @name raiweb.account.controller:profileController
* @description
*	The account controller provides the scope methods for following:
*	1) Registering User
*	2) Loging User
*	3) For other user account specific operations, methods will be added.
* @requires $rootScope
* @requires $scope
* @requires $state
* @requires appService
*/

(function() {
	var profileController = function($rootScope, $scope, $state, appService, accountService, User, modalService, Utils) {
		$scope.changePasswordModel = {};	// model to hold oldPW,newPW and confirmPw

		function setProfileData() {
			$scope.toolbarButtons = Utils.getListConfigOf('profileActions');
		}

		$scope.changePasswordClick = function(event) {
			event.preventDefault();
			$scope.isChangingPassword = true;
			accountService.changePassword($scope.changePasswordModel).then(function() {
				$scope.isChangingPassword = false;
				// On successful Password Change. user should logout and relogin.
				accountService.logout().then(function() {
					reLogin();
				}, function() {
					reLogin();
				});
			}, function(rejection){
				$scope.isChangingPassword = false;
				modalService.alert('md',
					'Password Change Failed',
					'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
					'Try again');
			});

			function reLogin() {
				var successModal = modalService.alert('md',
					'Password Change Success',
					'Your Password has been changed Successfully. Please Re-login',
					'Re-login');
				successModal.result.then(function() {
					$state.go('login');
				}, function() {
					$state.go('login');
				});
			}
		};

		$scope.onToolbarClick = function(event, button) {
			if (!button) {
				return;
			}

			switch(button.id) {
				case 'myProfile':
				case 'changePassword':
				case 'resetPassword':
					$state.go('author.profile.' + button.id.toLowerCase());
				break;
				case 'myDashboard':
					$state.go('author.dashboard');
				break;
			}
		};

		function getUserInfo() {
			$scope.isUserInfoLoading = true;
			accountService.getUserInfo().then(function(response) {
				$scope.myProfile = new User(response && response.data);
				$scope.isUserInfoLoading = false;
			}, function() {
				$scope.myProfile = new User();
				$scope.isUserInfoLoading = false;
			});
		}

		$scope.$on('$stateChangeSuccess', function(event, toState /*, fromState , fromParams*/) {
			if (toState && toState.name) {
				if (toState.name === 'author.profile') {
					event.preventDefault();
					$state.go('author.profile.myprofile');
				}

				Utils.getListConfigs().then(function() {
					setProfileData();
					if (toState.name === 'author.profile.myprofile') {
						getUserInfo();
					}
				});
			} else {
				//
			}
		});
	};

	profileController.$inject = ['$rootScope', '$scope', '$state', 'appService', 'accountService', 'User', 'modalService', 'Utils'];
	module.exports = profileController;
})();
