using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.OAuth;
using Owin;
using CMS_webAPI.Providers;
using CMS_webAPI.Models;

namespace CMS_webAPI
{
    public partial class Startup
    {
        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

        public static string PublicClientId { get; private set; }

        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            // Configure the db context and user manager to use a single instance per request
            app.CreatePerOwinContext(ApplicationDbContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);

            // Enable the application to use a cookie to store information for the signed in user
            // and to use a cookie to temporarily store information about a user logging in with a third party login provider
            app.UseCookieAuthentication(new CookieAuthenticationOptions());
            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

            // Configure the application for OAuth based flow
            PublicClientId = "self";
            OAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/Token"),
                Provider = new ApplicationOAuthProvider(PublicClientId),
                AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),       // expire in one day
                AllowInsecureHttp = true
            };

            // Enable the application to use bearer tokens to authenticate users
            app.UseOAuthBearerTokens(OAuthOptions);

            // Uncomment the following lines to enable logging in with third party login providers
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "",
            //    clientSecret: "");

            //app.UseTwitterAuthentication(
            //    consumerKey: "",
            //    consumerSecret: "");

            //app.UseFacebookAuthentication(
            //    appId: "",
            //    appSecret: "");

            //app.UseGoogleAuthentication(new GoogleOAuth2AuthenticationOptions()
            //{
            //    ClientId = "",
            //    ClientSecret = ""
            //});
        }

        private void createRolesandUsers()
        {
            ApplicationDbContext context = new ApplicationDbContext();

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));


            // In Startup iam creating first Admin Role and creating a default Admin User    
            string defaultAdminRole = UserService.GetDefaultAdminRole();

            if (!roleManager.RoleExists(defaultAdminRole))
            {

                // first we create Admin rool   
                var role = new IdentityRole();
                role.Name = defaultAdminRole;
                roleManager.Create(role);                
            }

            //Here we create a Admin super user who will maintain the website                  
            RegisterBindingModel adminUser = UserService.GetDefaultUser();
            var chkAdminUser = context.Users.FirstOrDefault(u => u.Email == adminUser.Email);

            if (chkAdminUser == null)
            {
                var user = new ApplicationUser();
                user.UserName = "admin";
                user.FirstName = adminUser.FirstName;
                user.LastName = adminUser.LastName;
                user.Email = adminUser.Email;
                user.EmailConfirmed = true;
                user.LockoutEnabled = false;
                var chkUser = UserManager.Create(user, adminUser.Password);
                
                //Add default User to Role Admin   
                if (chkUser.Succeeded)
                {
                    UserManager.AddToRole(user.Id, defaultAdminRole);
                }
            }            

            // creating Creating Readers role    
            if (!roleManager.RoleExists(UserService.GetDefaultRole()))
            {
                var role = new IdentityRole();
                role.Name = UserService.GetDefaultRole();
                roleManager.Create(role);
            }       
            
            // creating Creating Authors role    
            if (!roleManager.RoleExists(UserService.GetAuthorRole()))
            {
                var role = new IdentityRole();
                role.Name = UserService.GetAuthorRole();
                roleManager.Create(role);
            }       
        } 
    }
}
