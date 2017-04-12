'use strict';
/*
*	accountService
*	Description
*	accountService fetches the account Page Level Data.
*/

(function() {
	var accountService = function($rootScope, $q, $http, $cookies, User, appService) {

		var baseApiUrl = appService.getApiServerUrl() + '/api/account';
		var baseCacheApiUrl = appService.getApiServerUrl() + '/api/cache';
		var urls = {
			register: baseApiUrl + '/register',
			login: appService.getApiServerUrl() + '/token',
			logout: baseApiUrl + '/logout',
			changePassword: baseApiUrl + '/changePassword',
			getUserInfo: baseApiUrl + '/UserInfo',
			setUserInfo: baseApiUrl + '/SetUserInfo',
			verifyEmail: baseApiUrl + '/VerifyEmail',
			resendVerifyEmail: baseApiUrl + '/ResendVerifyEmail',
			sendResetPasswordEmail: baseApiUrl + '/SendResetPasswordEmail',
			resetPassword: baseApiUrl + '/ResetPassword',
			getUserRoles: baseApiUrl + '/GetUserRoles',
			setUserRoles: baseApiUrl + '/SetUserRoles',
			getRoles: baseApiUrl + '/GetRoles',
			getCachedRequests: baseCacheApiUrl + '/GetKeys',
			clearCache: baseCacheApiUrl + '/PostClearCache',
			clearCacheAll: baseCacheApiUrl + '/PostClearCacheAll'
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

		function isUserInRoles(roles) {
			if (!roles || (roles instanceof Array && roles.length <= 0)) {
				return true;
			}

			var loggedInUser = $cookies.getObject('loggedInUser');
			var userRoles = loggedInUser.roles;

			if (userRoles instanceof Array && userRoles.length > 0) {
				var isUserInRoles = true;
				roles.filter(function(role) {
					if (!userRoles.includes(role)) {
						isUserInRoles = false;
					}
				});
				return isUserInRoles;
			}

			return false;
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

		function setUserInfo(userInfo) {
			return $http({
				method: 'post',
				url: urls.setUserInfo,
				data: userInfo,
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

		function getUserRoles(userName) {
			var url = urls.getUserRoles + '?id=' + userName;
			return $http({
				method: 'get',
				url: url,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		function setUserRoles(userRolesViewModel) {
			return $http({
				method: 'post',
				url: urls.setUserRoles,
				data: userRolesViewModel,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		function getRoles() {
			return $http({
				method: 'get',
				url: urls.getRoles,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		function getCachedRequests() {
			return $http({
				method: 'get',
				url: urls.getCachedRequests,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		function clearCache(key) {
			return $http({
				method: 'post',
				url: urls.clearCache,
				data: key,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		function clearCacheAll() {
			return $http({
				method: 'post',
				url: urls.clearCacheAll,
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
			isUserInRoles: isUserInRoles,
			getToken: getToken,
			changePassword: changePassword,
			getUserInfo: getUserInfo,
			setUserInfo: setUserInfo,
			verifyEmail: verifyEmail,
			resendVerifyEmail: resendVerifyEmail,
			sendResetPasswordEmail: sendResetPasswordEmail,
			resetPassword: resetPassword,
			getUserRoles: getUserRoles,
			setUserRoles: setUserRoles,
			getRoles: getRoles,
			getCachedRequests: getCachedRequests,
			clearCache: clearCache,
			clearCacheAll: clearCacheAll
		};
	};

	accountService.$inject = ['$rootScope', '$q', '$http', '$cookies', 'User', 'appService'];
	module.exports = accountService;
})();
