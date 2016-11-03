'use strict';
/*
*	accountService
*	Description
*	accountService fetches the account Page Level Data.
*/

(function() {
	var accountService = function($rootScope, $q, $http, $cookies, User) {
		var baseApiUrl = 'https://localhost:44302/api/account/';
		var urls = {
			register: baseApiUrl + 'register',
			login: 'https://localhost:44302/token',
			logout: baseApiUrl + 'logout'
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

		return {
			register: register,
			login: login,
			logout: logout,
			getLoggedInUser: getLoggedInUser,
			isAnonymous: isAnonymous,
			getToken: getToken
		};
	};

	accountService.$inject = ['$rootScope', '$q', '$http', '$cookies', 'User'];
	module.exports = accountService;
})();
