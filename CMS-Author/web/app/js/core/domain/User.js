'use strict';
/*
*	User
*	Description
*	User fetches the account Page Level Data.
*/

(function() {
	var User = function() {
		function User(userInfo) {
			if (userInfo instanceof Object) {
				var raw = userInfo;
				this.userName = raw.Email || raw.userName;
				this.email = raw.Email;
				this.password = raw.password;
				this.confirmPassword = raw.ConfirmPassword;
				this.firstName = raw.FirstName;
				this.lastName = raw.LastName;
				this.phone = raw.Phone;
				this.token = raw.access_token;
				this.tokenType = raw.token_type;
				this.expiry = raw.expires_in;
				this.issuedDate = raw['.issued'];
				this.expiryDate = raw['.expires'];
				this.loginProvider = raw.loginProvider;
			}
		}

		User.prototype = {
			getFullName: function(isFirstNameFirst) {
				if (isFirstNameFirst === true) {
					return this.firstName & this.lastName ? ' ' + this.lastName: '';
				} else {
					return this.lastName & this.firstName ? ', ' + this.firstName: '';
				}
			}
		};
		return User;
	};

	User.$inject = [];
	module.exports = User;
})();
