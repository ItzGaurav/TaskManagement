using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace TnTManagement.Web.API.Infrastructure
{
    public class IdentityHelper
    {
        internal static void SeedIdentities()
        {
            ApplicationDbContext context = new ApplicationDbContext();
            var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            if (!roleManager.RoleExists("SuperAdmin"))
            {
                var roleresult = roleManager.Create(new IdentityRole("SuperAdmin"));
            }

            if (!roleManager.RoleExists("Admin"))
            {
                var roleresult = roleManager.Create(new IdentityRole("Admin"));
            }
            if (!roleManager.RoleExists("User"))
            {
                var roleresult = roleManager.Create(new IdentityRole("User"));

            }

            string userName = "sanjeevs";
            string password = "Pass@321";
            string email = "sa@sa.com";
            string firstName = "Sanjeev";
            string lastName = "S";
            ApplicationUser user = userManager.FindByName(userName);
            var PasswordHash = new PasswordHasher();
            if (user == null)
            {
                user = new ApplicationUser()
                {
                    UserName = userName,
                    Email = email,
                    FirstName = firstName,
                    LastName = lastName,
                    //PasswordHash = PasswordHash.HashPassword(password)
                };
                IdentityResult userResult = userManager.Create(user, password);
                if (userResult.Succeeded)
                {
                    var result = userManager.AddToRole(user.Id, "SuperAdmin");
                }
            }

        }
    }
}