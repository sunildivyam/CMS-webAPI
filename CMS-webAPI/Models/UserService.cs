using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace CMS_webAPI.Models
{
    public class UserService
    {
        ApplicationDbContext _appDB = new ApplicationDbContext();

        public static UserInfoViewModel GetUserViewModelByName(string userName)
        {
            UserInfoViewModel userViewModel = new UserInfoViewModel();
            ApplicationDbContext _appDB = new ApplicationDbContext();
            ApplicationUser user = _appDB.Users.FirstOrDefault(u => u.UserName == userName);
            if (user != null)
            {
                userViewModel = AppUserToUserInfoViewModel(user);               
                userViewModel.HasRegistered = true;
            }
            return userViewModel;
        }

        public static UserInfoViewModel GetUserViewModelById(string id)
        {
            UserInfoViewModel userViewModel = new UserInfoViewModel();
            ApplicationDbContext _appDB = new ApplicationDbContext();
            ApplicationUser user = _appDB.Users.Find(id);

            if (user != null)
            {
                userViewModel = AppUserToUserInfoViewModel(user);
                userViewModel.HasRegistered = true;
            }
            return userViewModel;
        }

        public static ApplicationUser getUserFromUserViewModel(UserInfoViewModel userViewModel)
        {
            if (userViewModel == null)
            {
                return null;
            }
            else
            {
                ApplicationDbContext _appDB = new ApplicationDbContext();
                return _appDB.Users.FirstOrDefault(u => u.UserName == userViewModel.Email);
            }
        }

        public static ApplicationUser getUserByUserName(string userName)
        {
            ApplicationDbContext _appDB = new ApplicationDbContext();
            return _appDB.Users.FirstOrDefault(u => u.UserName == userName);
        }

        public static RegisterBindingModel GetSuperUser()
        {
            return new RegisterBindingModel() {
                Email= ConfigurationManager.AppSettings["SuperUserEmail"], // super user Email id
                Password = ConfigurationManager.AppSettings["SuperUserPw"],  // Super User Pw,
                FirstName = "Administrator",
                LastName = "User"
            };
        }

        public static string GetDefaultRole()
        {
            return "Readers";
        }

        public static string GetDefaultAdminRole()
        {
            return "Administrators";
        }

        public static string GetAuthorRole()
        {
            return "Authors";
        }

        public static bool IsUserExist(string userName)
        {
            ApplicationDbContext _appDB = new ApplicationDbContext();
            ApplicationUser user = _appDB.Users.FirstOrDefault(u => u.UserName == userName);

            if (user != null)
            {
                return true;
            }
            return false;
        }

        public static UserInfoViewModel AppUserToUserInfoViewModel(ApplicationUser user)
        {
            if (user != null)
            {
                UserInfoViewModel userInfoView = new UserInfoViewModel()
                {
                    Email = user.Email,
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    PhoneNumber = user.PhoneNumber,                    
                    Twitter = user.Twitter,
                    Facebook = user.Facebook,
                    Google = user.Google,
                    Webpage = user.Webpage,
                    Youtube = user.Youtube,
                    Github = user.Github,
                    Description = user.Description,
                    Organisation = user.Organisation,
                    Designation = user.Designation,
                    CreatedOn = (DateTime)user.CreatedOn
                };
                return userInfoView;
            }
            return null;            
        }

        public static ApplicationUser LoadUserWithProfileView(ApplicationUser user, UserInfoViewModel userInfoView) {
            user.PhoneNumber = userInfoView.PhoneNumber;
            user.Twitter = userInfoView.Twitter;
            user.Facebook = userInfoView.Facebook;
            user.Google = userInfoView.Google;
            user.Github = userInfoView.Github;
            user.Webpage = userInfoView.Webpage;
            user.Youtube = userInfoView.Youtube;
            user.Linkedin = userInfoView.Linkedin;
            user.Description = userInfoView.Description;
            user.Organisation = userInfoView.Organisation;
            user.Designation = userInfoView.Designation;
            return user;
        }

        public static IList<UsersViewModel> GetUsersByDate(DateTime start, DateTime end)
        {
            ApplicationDbContext _appDB = new ApplicationDbContext();            
            List<UsersViewModel> users = _appDB.Users.Where(u => u.CreatedOn >= start && u.CreatedOn <= end)
                .Select(u => new UsersViewModel() { UserName = u.UserName, CreatedOn = (DateTime)u.CreatedOn })
                .ToList();

            return users;
        }
    }
}