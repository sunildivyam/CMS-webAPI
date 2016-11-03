'use strict';
/*
*	accountController
*	Description
*	accountController controls the account page Level Scope Data.
*/

(function() {
	var accountController = function($rootScope, $scope, $state, accountService, User, modalService) {
		$scope.newUser = new User();
		$scope.loginInfo = {};

		$scope.retry = function() {
			$scope.sucess = false;
		};

		$scope.registerSubmit = function() {
			accountService.register($scope.newUser).then(function(response) {
				if (response && response.status === 409) {
					$scope.resultMessage = "User Already Exist";
					$scope.isExist = true;
					$scope.sucess = true;
				} else {
					$scope.resultMessage = "you are successfully registered. Please login";
					$scope.isExist = false;
					$scope.sucess = true;
					$scope.newUser = new User();
				}
			}, function(rejection){
				$scope.isRegisterationSuccessfull = false;
				$scope.registerationMessage = rejection && rejection.message;
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
				modalService.alert('sm', 'Login Failed', 'Reason: ' + rejection.message || 'Unknown' , 'Try again');
			});
		};
	};

	accountController.$inject = ['$rootScope', '$scope', '$state', 'accountService', 'User', 'modalService'];
	module.exports = accountController;
})();
