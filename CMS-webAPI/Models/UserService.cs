using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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
                userViewModel.FirstName = user.FirstName;
                userViewModel.LastName = user.LastName;
                userViewModel.Email = user.Email;
                userViewModel.HasRegistered = true;
                userViewModel.Phone = user.Phone;
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
                userViewModel.FirstName = user.FirstName;
                userViewModel.LastName = user.LastName;
                userViewModel.Email = user.Email;
                userViewModel.HasRegistered = true;
                userViewModel.Phone = user.Phone;
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

        public static RegisterBindingModel GetDefaultUser()
        {
            return new RegisterBindingModel() { 
                Email= "admin@gmail.com",
                Password = "Admin123#",
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
    }
}