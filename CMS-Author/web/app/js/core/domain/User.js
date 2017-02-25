'use strict';
/*
*   User
*   Description
*   User fetches the account Page Level Data.
*/

(function() {
    var User = function() {
        function User(userInfo) {
            if (userInfo instanceof Object) {
                var raw = userInfo;
                this.userName = raw.Email || raw.UserName || raw.userName;
                this.email = raw.Email;
                this.password = raw.password;
                this.confirmPassword = raw.ConfirmPassword;
                this.firstName = raw.FirstName || raw.firstName;
                this.lastName = raw.LastName || raw.lastName;
                this.phone = raw.Phone;
                this.token = raw.access_token;
                this.tokenType = raw.token_type;
                this.expiry = raw.expires_in;
                this.issuedDate = raw['.issued'];
                this.expiryDate = raw['.expires'];
                this.loginProvider = raw.LoginProvider;
                var roles  = raw.Roles || raw.roles;
                if (typeof roles === 'string') {
                    this.roles = roles.split(',');
                } else {
                    this.roles = roles;
                }

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
