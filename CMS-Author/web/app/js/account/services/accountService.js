'use strict';
/*
*	accountService
*	Description
*	accountService fetches the account Page Level Data.
*/

(function() {
	var accountService = function($rootScope, $q, $http, $cookies, User, appService) {

		var baseApiUrl = appService.getApiServerUrl() + '/api/account';
		var urls = {
			register: baseApiUrl + '/register',
			login: appService.getApiServerUrl() + '/token',
			logout: baseApiUrl + '/logout',
			changePassword: baseApiUrl + '/changePassword',
			getUserInfo: baseApiUrl + '/UserInfo',
			verifyEmail: baseApiUrl + '/VerifyEmail',
			resendVerifyEmail: baseApiUrl + '/ResendVerifyEmail',
			sendResetPasswordEmail: baseApiUrl + '/SendResetPasswordEmail',
			resetPassword: baseApiUrl + '/ResetPassword'
		};


		init();

		function init() {
			$rootScope.currentUser = $cookies.getObject('loggedInUser');
		}


		function resetUser() {
			$cookies.remove('loggedInUser');
		}

		function setUser(loggedInUser) {
			$cookies.putObject('loggedInUser', loggedInUser, {
				expires: loggedInUser && loggedInUser.expiryDate
			});
		}

		function register(newUserInfo) {
			var defferedObj = $q.defer();

			$http({
				method: 'post',
				url: urls.register,
				data: newUserInfo,
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(function(response) {
				resetUser();
				defferedObj.resolve(response);
			}, function(rejection) {
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		function login(userInfo) {
			var defferedObj = $q.defer();
			userInfo.grant_type = 'password';
			$http({
				method: 'post',
				url: urls.login,
				data: $.param(userInfo), // data needs to be in url encoded format
				headers: {
					'content-type': 'application/x-www-form-urlencoded',
					'charset': 'UTF-8'
				},
				withCredentials: true
			}).then(function(response) {
				var loggedInUser = new User(response.data);
				// save userInfo to Cookies
				setUser(loggedInUser);
				defferedObj.resolve(response && response.data);
			}, function(rejection) {
				resetUser();
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		function logout() {
			var defferedObj = $q.defer();

			$http({
				method: 'post',
				url: urls.logout,
				data: $cookies.getObject('loggedInUser'),
				headers: {
					'content-type': 'application/json'
				}
			}).then(function(response) {
				resetUser();
				defferedObj.resolve(response.data);
			}, function(rejection) {
				resetUser();
				defferedObj.reject(rejection);
			});

			return defferedObj.promise;
		}

		function getLoggedInUser() {
			return $cookies.getObject('loggedInUser');
		}

		function isAnonymous() {
			var loggedInUser = $cookies.getObject('loggedInUser');
			return loggedInUser && loggedInUser.token ? false : true;
		}

		function getToken() {
			var loggedInUser = $cookies.getObject('loggedInUser');
			return loggedInUser && loggedInUser.token;
		}

		function changePassword(changePasswordModel) {
			return $http({
				method: 'post',
				url: urls.changePassword,
				data: changePasswordModel,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		function getUserInfo() {
			return $http({
				method: 'get',
				url: urls.getUserInfo,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		function verifyEmail(userName, code) {
			var url = urls.verifyEmail + '?id=' + userName + '&code=' + code;
			return $http({
				method: 'get',
				url: url,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		function resendVerifyEmail(userName) {
			var url = urls.resendVerifyEmail + '?id=' + userName;
			return $http({
				method: 'get',
				url: url,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		function sendResetPasswordEmail(userName) {
			var url = urls.sendResetPasswordEmail + '?id=' + userName;
			return $http({
				method: 'get',
				url: url,
				data: changePasswordModel,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		function resetPassword(resetPasswordModel) {
			return $http({
				method: 'post',
				url: urls.resetPassword,
				data: resetPasswordModel,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		return {
			register: register,
			login: login,
			logout: logout,
			getLoggedInUser: getLoggedInUser,
			isAnonymous: isAnonymous,
			getToken: getToken,
			changePassword: changePassword,
			getUserInfo: getUserInfo,
			verifyEmail: verifyEmail,
			resendVerifyEmail: resendVerifyEmail,
			sendResetPasswordEmail: sendResetPasswordEmail,
			resetPassword: resetPassword
		};
	};

	accountService.$inject = ['$rootScope', '$q', '$http', '$cookies', 'User', 'appService'];
	module.exports = accountService;
})();
