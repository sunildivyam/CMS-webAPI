'use strict';

(function() {
	var loginStatusBar = function() {
		return {
			'restrict': 'E',
			'templateUrl': 'account/login-status-bar.html',
			'scope': {
				user: '='
			},
			'link': function() {
			}
		};
	};
	loginStatusBar.$inject = [];
	module.exports = loginStatusBar;
})();