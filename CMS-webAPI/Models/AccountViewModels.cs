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

        public string PhoneNumber { get; set; }

        public IList<string> Roles { get; set; }

        public string Twitter { get; set; }
        public string Facebook { get; set; }
        public string Google { get; set; }
        public string Github { get; set; }
        public string Webpage { get; set; }
        public string Youtube { get; set; }
        public string Linkedin { get; set; }
        public string Description { get; set; }
        public string Organisation { get; set; }
        public string Designation { get; set; }
        public DateTime CreatedOn { get; set; }

    }

    public class UsersViewModel
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }   
        public DateTime CreatedOn { get; set; }
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
