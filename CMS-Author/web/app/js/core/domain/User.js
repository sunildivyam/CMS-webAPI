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
                this.userName = raw.UserName || raw.userName || raw.Email;
                this.email = raw.Email || raw.email;
                this.password = raw.password;
                this.confirmPassword = raw.ConfirmPassword;
                this.firstName = raw.FirstName || raw.firstName;
                this.lastName = raw.LastName || raw.lastName;
                this.phoneNumber = raw.PhoneNumber || raw.phoneNumber;
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

                this.twitter = raw.Twitter || raw.twitter;
                this.facebook = raw.Facebook || raw.facebook;
                this.google = raw.Google || raw.google;
                this.github = raw.Github || raw.github;
                this.webpage = raw.Webpage || raw.webpage;
                this.youtube = raw.Youtube || raw.youtube;
                this.linkedin = raw.Linkedin || raw.linkedin;
                this.description = raw.Description || raw.description;
                this.organisation = raw.Organisation || raw.organisation;
                this.designation = raw.Designation || raw.designation;
                this.createdOn = raw.CreatedOn || raw.createdOn;
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
