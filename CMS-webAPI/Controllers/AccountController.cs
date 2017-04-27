using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using CMS_webAPI.Models;
using CMS_webAPI.Providers;
using CMS_webAPI.Results;
using System.Linq;
using System.Net;
using System.IO;

namespace CMS_webAPI.Controllers
{
    [Authorize]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private const string LocalLoginProvider = "Local";
        private ApplicationUserManager _userManager;
        private RoleManager<IdentityRole> _roleManager;
        private int MAX_FILE_SIZE = 1024 * 512; //Size = 512 kb  

        public AccountController()
        {
            ApplicationDbContext context = new ApplicationDbContext();
            RoleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
        }

        public AccountController(ApplicationUserManager userManager,
            ISecureDataFormat<AuthenticationTicket> accessTokenFormat)
        {
            UserManager = userManager;
            AccessTokenFormat = accessTokenFormat;

            ApplicationDbContext context = new ApplicationDbContext();
            RoleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        public RoleManager<IdentityRole> RoleManager
        {
            get
            {
                return _roleManager;
            }
            private set
            {
                _roleManager = value;
            }
        }

        public ISecureDataFormat<AuthenticationTicket> AccessTokenFormat { get; private set; }

        // GET api/Account/UserInfo
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("UserInfo")]
        public UserInfoViewModel GetUserInfo()
        {
            ExternalLoginData externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);
            ApplicationUser appuser = UserManager.FindById(User.Identity.GetUserId());
            UserInfoViewModel userInfoView = new UserInfoViewModel();
            userInfoView = UserService.AppUserToUserInfoViewModel(appuser);
            if (userInfoView != null) {
                userInfoView.Roles = UserManager.GetRoles(appuser.Id);
                userInfoView.HasRegistered = externalLogin == null;
                userInfoView.LoginProvider = externalLogin != null ? externalLogin.LoginProvider : null;
            }
            return userInfoView;
        }

        // POST api/Account/Logout
        [Route("Logout")]
        public IHttpActionResult Logout()
        {
            Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
            return Ok();
        }

        // GET api/Account/ManageInfo?returnUrl=%2F&generateState=true
        [Route("ManageInfo")]
        public async Task<ManageInfoViewModel> GetManageInfo(string returnUrl, bool generateState = false)
        {
            IdentityUser user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            
            if (user == null)
            {
                return null;
            }

            List<UserLoginInfoViewModel> logins = new List<UserLoginInfoViewModel>();
            
            foreach (IdentityUserLogin linkedAccount in user.Logins)
            {
                logins.Add(new UserLoginInfoViewModel
                {
                    LoginProvider = linkedAccount.LoginProvider,
                    ProviderKey = linkedAccount.ProviderKey
                });
            }

            if (user.PasswordHash != null)
            {
                logins.Add(new UserLoginInfoViewModel
                {
                    LoginProvider = LocalLoginProvider,
                    ProviderKey = user.UserName,
                });
            }

            return new ManageInfoViewModel
            {
                LocalLoginProvider = LocalLoginProvider,
                Email = user.UserName,
                Logins = logins,
                ExternalLoginProviders = GetExternalLogins(returnUrl, generateState)
            };
        }

        // POST api/Account/ChangePassword
        [Route("ChangePassword")]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        {            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            IdentityResult result = await UserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword,
                model.NewPassword);
            
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        // POST api/Account/SetPassword
        [Route("SetPassword")]
        public async Task<IHttpActionResult> SetPassword(SetPasswordBindingModel model)
        {            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await UserManager.AddPasswordAsync(User.Identity.GetUserId(), model.NewPassword);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        // POST api/Account/AddExternalLogin
        [Route("AddExternalLogin")]
        public async Task<IHttpActionResult> AddExternalLogin(AddExternalLoginBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);

            AuthenticationTicket ticket = AccessTokenFormat.Unprotect(model.ExternalAccessToken);

            if (ticket == null || ticket.Identity == null || (ticket.Properties != null
                && ticket.Properties.ExpiresUtc.HasValue
                && ticket.Properties.ExpiresUtc.Value < DateTimeOffset.UtcNow))
            {
                return BadRequest("External login failure.");
            }

            ExternalLoginData externalData = ExternalLoginData.FromIdentity(ticket.Identity);

            if (externalData == null)
            {
                return BadRequest("The external login is already associated with an account.");
            }

            IdentityResult result = await UserManager.AddLoginAsync(User.Identity.GetUserId(),
                new UserLoginInfo(externalData.LoginProvider, externalData.ProviderKey));

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        // POST api/Account/RemoveLogin
        [Route("RemoveLogin")]
        public async Task<IHttpActionResult> RemoveLogin(RemoveLoginBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result;

            if (model.LoginProvider == LocalLoginProvider)
            {
                result = await UserManager.RemovePasswordAsync(User.Identity.GetUserId());
            }
            else
            {
                result = await UserManager.RemoveLoginAsync(User.Identity.GetUserId(),
                    new UserLoginInfo(model.LoginProvider, model.ProviderKey));
            }

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        // GET api/Account/ExternalLogin
        [OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalCookie)]
        [AllowAnonymous]
        [Route("ExternalLogin", Name = "ExternalLogin")]
        public async Task<IHttpActionResult> GetExternalLogin(string provider, string error = null)
        {
            if (error != null)
            {
                return Redirect(Url.Content("~/") + "#error=" + Uri.EscapeDataString(error));
            }

            if (!User.Identity.IsAuthenticated)
            {
                return new ChallengeResult(provider, this);
            }

            ExternalLoginData externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

            if (externalLogin == null)
            {
                return InternalServerError();
            }

            if (externalLogin.LoginProvider != provider)
            {
                Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                return new ChallengeResult(provider, this);
            }

            ApplicationUser user = await UserManager.FindAsync(new UserLoginInfo(externalLogin.LoginProvider,
                externalLogin.ProviderKey));

            bool hasRegistered = user != null;

            if (hasRegistered)
            {
                Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);
                
                 ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(UserManager,
                    OAuthDefaults.AuthenticationType);
                ClaimsIdentity cookieIdentity = await user.GenerateUserIdentityAsync(UserManager,
                    CookieAuthenticationDefaults.AuthenticationType);               
                
                AuthenticationProperties properties = ApplicationOAuthProvider.CreateProperties(user, oAuthIdentity);
                Authentication.SignIn(properties, oAuthIdentity, cookieIdentity);
            }
            else
            {
                IEnumerable<Claim> claims = externalLogin.GetClaims();
                ClaimsIdentity identity = new ClaimsIdentity(claims, OAuthDefaults.AuthenticationType);
                Authentication.SignIn(identity);
            }

            return Ok();
        }

        // GET api/Account/ExternalLogins?returnUrl=%2F&generateState=true
        [AllowAnonymous]
        [Route("ExternalLogins")]
        public IEnumerable<ExternalLoginViewModel> GetExternalLogins(string returnUrl, bool generateState = false)
        {
            IEnumerable<AuthenticationDescription> descriptions = Authentication.GetExternalAuthenticationTypes();
            List<ExternalLoginViewModel> logins = new List<ExternalLoginViewModel>();

            string state;

            if (generateState)
            {
                const int strengthInBits = 256;
                state = RandomOAuthStateGenerator.Generate(strengthInBits);
            }
            else
            {
                state = null;
            }

            foreach (AuthenticationDescription description in descriptions)
            {
                ExternalLoginViewModel login = new ExternalLoginViewModel
                {
                    Name = description.Caption,
                    Url = Url.Route("ExternalLogin", new
                    {
                        provider = description.AuthenticationType,
                        response_type = "token",
                        client_id = Startup.PublicClientId,
                        redirect_uri = new Uri(Request.RequestUri, returnUrl).AbsoluteUri,
                        state = state
                    }),
                    State = state
                };
                logins.Add(login);
            }

            return logins;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("VerifyEmail")]
        public async Task<IHttpActionResult> VerifyEmail(string id, string code)
        {
            string userId = id;
            string emailCode = code.Replace(' ', '+');

            var result = await UserManager.ConfirmEmailAsync(userId, emailCode);

            if (!result.Succeeded)
            {
                return NotFound();
            }

            return Ok();
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("ResendVerifyEmail")]
        public async Task<IHttpActionResult> ResendVerifyEmail(string id)
        {
            ApplicationUser user = await UserManager.FindByEmailAsync(id);
            if (user == null)
            {
                user = await UserManager.FindByNameAsync(id);
            }            

            if (user == null) {
                return NotFound();
            }

            if (user.EmailConfirmed == true)
            {
                return InternalServerError(new Exception("Email is already confirmed"));
            }

            try
            {
                string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                await UserManager.SendEmailAsync(user.Id, EmailService.getEmailVerifySubject(), EmailService.getEmailVerifyBody(user.Id, code));
            }
            catch(Exception ex)
            {
                return InternalServerError(ex);
            }
                
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("SendResetPasswordEmail")]
        public async Task<IHttpActionResult> SendResetPasswordEmail(string id)
        {            
            ApplicationUser user = await UserManager.FindByEmailAsync(id);
            if (user == null)
            {
                user = await UserManager.FindByNameAsync(id);
            }

            if (user == null)
            {
                return NotFound();
            }            

            try
            {
                string code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
                await UserManager.SendEmailAsync(user.Id, EmailService.getPasswordResetEmailSubject(), EmailService.getPasswordResetEmailBody(user.Id, code));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IHttpActionResult> ResetPassword(PasswordResetViewModel passwordResetViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string emailCode = passwordResetViewModel.PasswordResetToken.Replace(' ', '+');

            var result = await UserManager.ResetPasswordAsync(passwordResetViewModel.UserId, emailCode, passwordResetViewModel.NewPassword);

            if (!result.Succeeded)
            {
                return NotFound();
            }

            return Ok();
        }

        [Authorize(Roles = "Administrators")]
        [HttpGet]
        [Route("GetRoles")]
        public async Task<IHttpActionResult> GetRoles()
        {
            IList<string> roles = new List<string>();           
            
            try
            {
                roles = RoleManager.Roles.Select<IdentityRole, string>(r => r.Name).ToList();                
                await Task.Delay(0);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok(roles);
        }


        [Authorize(Roles = "Administrators")]
        [HttpGet]
        [Route("GetUserRoles")]
        public async Task<IHttpActionResult> GetUserRoles(string id)
        {
            var userName = id;

            ApplicationUser user = await UserManager.FindByEmailAsync(userName);
            if (user == null)
            {
                user = await UserManager.FindByNameAsync(userName);
            }

            if (user == null)
            {
                return NotFound();
            }

            IList<string> currentUserRoles = new List<string>();

            try
            {
                currentUserRoles = await UserManager.GetRolesAsync(user.Id);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok(currentUserRoles);
        }

        [Authorize(Roles="Administrators")]
        [HttpPost]
        [Route("SetUserRoles")]
        public async Task<IHttpActionResult> SetUserRoles(UserRolesViewModel userRolesViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ApplicationUser user = await UserManager.FindByEmailAsync(userRolesViewModel.UserName);
            if (user == null)
            {
                user = await UserManager.FindByNameAsync(userRolesViewModel.UserName);
            }
            
            if (user == null)
            {
                return NotFound();
            }            
            
           // Need to Find whic Roles to be removed and which to be added
            IList <string> currentUserRoles = await UserManager.GetRolesAsync(user.Id);
            IList<string> newRoles = userRolesViewModel.Roles;

            IList<string> rolesToBeRemoved = new List<string>();
            IList<string> rolesToBeAdded = new List<string>();

            // if currentUserRoles which are not present in newRoles, should be removed.
            foreach(var currentRole in currentUserRoles) {
                bool match = false;
                foreach(var newRole in newRoles) {
                    if (currentRole == newRole) {
                        match = true;
                        break;
                    }
                }

                if (match == false)
                {
                    rolesToBeRemoved.Add(currentRole);
                }
            }

            // if newRoles which are not present in CurrentRoles, should be added
            foreach (var newRole in newRoles)
            {
                bool match = false;
                foreach (var currentRole in currentUserRoles)
                {                    
                    if (newRole == currentRole)
                    {
                        match = true;
                        break;
                    }
                }

                if (match == false)
                {
                    rolesToBeAdded.Add(newRole);
                }
            }

            try
            {
                if (rolesToBeRemoved.Count > 0)
                {
                    await UserManager.RemoveFromRolesAsync(user.Id, rolesToBeRemoved.ToArray<string>());
                }
                if (rolesToBeAdded.Count > 0)
                {
                    await UserManager.AddToRolesAsync(user.Id, rolesToBeAdded.ToArray<string>());
                }                
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok();
        }


        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(RegisterBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DateTime createdOn = DateTime.Now;
            var user = new ApplicationUser() { UserName = model.UserName, Email = model.Email, FirstName = model.FirstName, LastName = model.LastName, CreatedOn = createdOn };
            
            IdentityResult result = await UserManager.CreateAsync(user, model.Password);
                        
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }
            // Adds to Default user Role.
            UserManager.AddToRole(user.Id, UserService.GetDefaultRole());
            
            // Send Email verificatoion Code
            try
            {
                string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                await UserManager.SendEmailAsync(user.Id, EmailService.getEmailVerifySubject(), EmailService.getEmailVerifyBody(user.Id, code));
            } catch (Exception ex) {
                Ok(new { code = "email_not_sent", message = ex });
            }            

            return Ok();
        }

        // POST api/Account/RegisterExternal
        [OverrideAuthentication]
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Route("RegisterExternal")]
        public async Task<IHttpActionResult> RegisterExternal(RegisterExternalBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var info = await Authentication.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return InternalServerError();
            }

            var user = new ApplicationUser() { UserName = model.Email, Email = model.Email };

            IdentityResult result = await UserManager.CreateAsync(user);
            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            result = await UserManager.AddLoginAsync(user.Id, info.Login);
            if (!result.Succeeded)
            {
                return GetErrorResult(result); 
            }
            return Ok();
        }


        [AllowAnonymous]
        [HttpGet]
        [Route("CheckUserAvailabilty")]
        public async Task<IHttpActionResult> CheckUserAvailabilty(string userName)
        {
            await Task.Delay(0);        
            if (UserService.IsUserExist(userName) == true)
            {
                // If userName exist in system, that mean it (the name) is not avaialable for a new Uer
                return NotFound();      
            }
            else
            {
                // If userName does not exist in system, that mean it (the name)  is avaialable for a new Uer
                return Ok();
            }            
        }
        
        [HttpPost]
        [Route("SetUserInfo")]
        public async Task<IHttpActionResult> SetUserInfo(UserInfoViewModel userInfoView)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                ApplicationUser user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
                if (user == null)
                {
                    return NotFound();
                }

                user= UserService.LoadUserWithProfileView(user, userInfoView);
                await UserManager.UpdateAsync(user);                               
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok();
        }


        [Authorize(Roles="Administrators")]
        [HttpGet]
        [Route("GetUsersByDate")]        
        public async Task<IHttpActionResult> GetUsersByDate(DateTime start, DateTime end)
        {
            try
            {
                await Task.Delay(0);
                return Ok(UserService.GetUsersByDate(start, end));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }            
        }

        // GET api/Account/UserInfoByName
        [Authorize(Roles="Administrators")]
        [Route("UserInfoByName")]
        public async Task<IHttpActionResult> GetUserInfoByName(string userName)
        {            
            ApplicationUser appuser = UserManager.FindByName(userName);
            if (appuser == null)
            {
                return NotFound();
            }

            try
            {
                UserInfoViewModel userInfoView = new UserInfoViewModel();
                await Task.Delay(0);
                userInfoView = UserService.AppUserToUserInfoViewModel(appuser);            
                return Ok(userInfoView);
            } catch (Exception ex) {
                return InternalServerError(ex);
            }            
        }

        [Authorize]
        [HttpPost]
        [Route("UploadUserThumbnail")]
        public async Task<HttpResponseMessage> UploadUserThumbnail()
        {
            await Task.Delay(0);
            if (User.Identity.IsAuthenticated == false)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Unauthorized User ");
            }

            string userName = User.Identity.Name;
            ApplicationUser user = await UserManager.FindByIdAsync(User.Identity.GetUserId());

            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                // Get the uploaded image from the Files collection  
                var httpPostedFile = HttpContext.Current.Request.Files["file"];
                if (httpPostedFile != null && httpPostedFile.ContentLength > 0)
                {
                    try
                    {
                        int length = httpPostedFile.ContentLength;

                        var ext = httpPostedFile.FileName.Substring(httpPostedFile.FileName.LastIndexOf('.'));
                        var extension = ext.ToLower();
                        if (!ImageHelper.IsImage(httpPostedFile))
                        {
                            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Please Upload image of type .jpg, .jpg, .gif, .png only");
                        }

                        if (length > MAX_FILE_SIZE)
                        {
                            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Please Upload a file upto " + (MAX_FILE_SIZE / 1024) + "kb only");
                        }

                        user.Photo = ImageHelper.ConvertToByteArray(httpPostedFile);

                        await UserManager.UpdateAsync(user);
                        
                        return Request.CreateResponse(HttpStatusCode.OK, "Image uploaded successfully");                        
                    }
                    catch (Exception ex)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
                    }
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NoContent, "No file to upload, Please select a file to upload");
                }
            }

            return Request.CreateErrorResponse(HttpStatusCode.NoContent, "No file to upload, Please select a file to upload");
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing && _userManager != null)
            {
                _userManager.Dispose();
                _userManager = null;
            }

            base.Dispose(disposing);
        }

        #region Helpers

        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        private class ExternalLoginData
        {
            public string LoginProvider { get; set; }
            public string ProviderKey { get; set; }
            public string UserName { get; set; }

            public IList<Claim> GetClaims()
            {
                IList<Claim> claims = new List<Claim>();
                claims.Add(new Claim(ClaimTypes.NameIdentifier, ProviderKey, null, LoginProvider));

                if (UserName != null)
                {
                    claims.Add(new Claim(ClaimTypes.Name, UserName, null, LoginProvider));
                }

                return claims;
            }

            public static ExternalLoginData FromIdentity(ClaimsIdentity identity)
            {
                if (identity == null)
                {
                    return null;
                }

                Claim providerKeyClaim = identity.FindFirst(ClaimTypes.NameIdentifier);

                if (providerKeyClaim == null || String.IsNullOrEmpty(providerKeyClaim.Issuer)
                    || String.IsNullOrEmpty(providerKeyClaim.Value))
                {
                    return null;
                }

                if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)
                {
                    return null;
                }

                return new ExternalLoginData
                {
                    LoginProvider = providerKeyClaim.Issuer,
                    ProviderKey = providerKeyClaim.Value,
                    UserName = identity.FindFirstValue(ClaimTypes.Name)
                };
            }
        }

        private static class RandomOAuthStateGenerator
        {
            private static RandomNumberGenerator _random = new RNGCryptoServiceProvider();

            public static string Generate(int strengthInBits)
            {
                const int bitsPerByte = 8;

                if (strengthInBits % bitsPerByte != 0)
                {
                    throw new ArgumentException("strengthInBits must be evenly divisible by 8.", "strengthInBits");
                }

                int strengthInBytes = strengthInBits / bitsPerByte;

                byte[] data = new byte[strengthInBytes];
                _random.GetBytes(data);
                return HttpServerUtility.UrlTokenEncode(data);
            }
        }

        #endregion
    }
}
