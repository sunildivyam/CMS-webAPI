using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.ComponentModel.DataAnnotations;

namespace CMS_webAPI.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        [Required]
        [Display(Name = "First Name")]
        [MaxLength(500)]
        public string FirstName { get; set; }

        [Display(Name = "Last Name")]
        [MaxLength(500)]
        public string LastName { get; set; }

        [Display(Name = "Twitter")]
        [MaxLength()]
        public string Twitter { get; set; }

        [Display(Name = "Facebook")]
        [MaxLength()]
        public string Facebook { get; set; }

        [Display(Name = "Google")]
        [MaxLength()]
        public string Google { get; set; }

        [Display(Name = "Github")]
        [MaxLength()]
        public string Github { get; set; }

        [Display(Name = "Webpage")]
        [MaxLength()]
        public string Webpage { get; set; }

        [Display(Name = "Youtube")]
        [MaxLength()]
        public string Youtube { get; set; }

        [Display(Name = "Linkedin")]
        [MaxLength()]
        public string Linkedin { get; set; }

        [Display(Name = "Description")]
        [MaxLength()]
        public string Description { get; set; }

        [Display(Name = "Organisation")]
        [MaxLength()]
        public string Organisation { get; set; }

        [Display(Name = "Designation")]
        [MaxLength()]
        public string Designation { get; set; }

        [Display(Name = "CreatedOn")]        
        public DateTime? CreatedOn { get; set; }


        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here

            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}