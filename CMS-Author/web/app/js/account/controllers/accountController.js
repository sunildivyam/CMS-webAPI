'use strict';
/*
*	accountController
*	Description
*	accountController controls the account page Level Scope Data.
*/

(function() {
	var accountController = function($rootScope, $scope, $state, appService, accountService, User, modalService) {
		$scope.newUser = new User();
		$scope.loginInfo = {};

		$scope.retry = function() {
			$scope.success = false;
		};

		$scope.registerSubmit = function() {
			accountService.register($scope.newUser).then(function() {
				$scope.newUser = new User();
				var successModal = modalService.alert('md',
					'Thanks for joining us.',
					'You have been successfully registered with us. Please click "Sign in" to login with your credentials.',
					'Sign In');
				successModal.result.then(function() {
					$state.go('login');
				});
			}, function(rejection){
				modalService.alert('md',
					'Registeration Failed',
					'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
					'Try again');
			});
		};

		$scope.loginSubmit = function() {
			$scope.isSigningIn = true;
			accountService.login($scope.loginInfo).then(function() {
				$rootScope.currentUser = accountService.getLoggedInUser();
				$scope.isSigningIn = false;
				modalService.alert('sm', 'Login Successful', 'You are successfully logged in.', 'View Dashboard');
				$state.go('dashboard');
			}, function(rejection){
				$rootScope.currentUser = accountService.getLoggedInUser();
				$scope.isSigningIn = false;
				modalService.alert('sm',
					'Login Failed',
					rejection && rejection.data && rejection.data.error_description,
					'Try again');
			});
		};
	};

	accountController.$inject = ['$rootScope', '$scope', '$state', 'appService', 'accountService', 'User', 'modalService'];
	module.exports = accountController;
})();
