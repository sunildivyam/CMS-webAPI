using System;
using System.Collections.Generic;

namespace CMS_webAPI.Models
{
    // Models returned by AccountController actions.

    public class ExternalLoginViewModel
    {
        public string Name { get; set; }

        public string Url { get; set; }

        public string State { get; set; }
    }

    public class ManageInfoViewModel
    {
        public string LocalLoginProvider { get; set; }

        public string Email { get; set; }

        public IEnumerable<UserLoginInfoViewModel> Logins { get; set; }

        public IEnumerable<ExternalLoginViewModel> ExternalLoginProviders { get; set; }
    }

    public class UserInfoViewModel
    {
        public string UserName { get; set; }

        public string Email { get; set; }

        public bool HasRegistered { get; set; }

        public string LoginProvider { get; set; }
                
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Phone { get; set; }

        public IList<string> Roles { get; set; }
    }

    public class UserLoginInfoViewModel
    {
        public string LoginProvider { get; set; }

        public string ProviderKey { get; set; }
    }

    public class PasswordResetViewModel
    {
        public string UserId { get; set; }
        public string PasswordResetToken { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }

    public class UserRolesViewModel
    {
        public string UserName { get; set; }
        public IList<string> Roles { get; set; }
    }
}
