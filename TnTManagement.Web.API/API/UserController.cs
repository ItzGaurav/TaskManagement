using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using TnTManagement.Web.API.Infrastructure;
using TnTManagement.Web.API.ViewModels;

namespace TnTManagement.Web.API.API
{
    [RoutePrefix("api/user")]
    public class UserController : BaseApiController
    {
        [Authorize(Roles = "SuperAdmin,Admin")]
     //   [AllowAnonymous]
        [Route("create")]
        public async Task<IHttpActionResult> CreateUser(CreateUserBindingModel createUserModel)
        {
            if (!ModelState.IsValid)
            {
                //  return BadRequest(ModelState);
                //IHttpActionResult response;
                //HttpResponseMessage responseMsg = new HttpResponseMessage(HttpStatusCode.BadRequest);
                //response = ResponseMessage(responseMsg);
                //return response;
                var message = string.Join(" | ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.BadRequest, message));

            }
            this.AppUserManager.UserValidator = new UserValidator<ApplicationUser>(this.AppUserManager)
            {
               // AllowOnlyAlphanumericUserNames = true,
                RequireUniqueEmail = true
            };
            //this.AppUserManager.UserValidator = new MyCustomUserValidator(this.AppUserManager)
            //{
            //    AllowOnlyAlphanumericUserNames = true,
            //    RequireUniqueEmail = true
            //};
            this.AppUserManager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = false,
                RequireLowercase = true,
                RequireUppercase = true,
            };
            var user = new ApplicationUser()
            {
                UserName = createUserModel.Email.Split('@')[0],
                Email = createUserModel.Email,
                FirstName = createUserModel.FirstName,
                LastName = createUserModel.LastName,

                // JoinDate = DateTime.Now,
            };
            string defaultPassword = "P@ssw0rd";
            IdentityResult addUserResult = await this.AppUserManager.CreateAsync(user, defaultPassword);
            if (!addUserResult.Succeeded)
            {
                return GetErrorResult(addUserResult);
            }
            var appUser = await this.AppUserManager.FindByIdAsync(user.Id);
            string[] role = { "User" };
            IdentityResult addResult = await this.AppUserManager.AddToRolesAsync(appUser.Id, role);

            if (!addResult.Succeeded)
            {
                ModelState.AddModelError("", "Failed to add user roles");
                //  return BadRequest(ModelState);
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Failed to add user roles"));
            }

            // Uri locationHeader = new Uri(Url.Link("GetUserById", new { id = user.Id }));

            return Ok(user);
            //Created(locationHeader, TheModelFactory.Create(user));
        }

        [Route("changePassword")]
        [Authorize(Roles = "SuperAdmin,Admin,User")]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            this.AppUserManager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = false,
                RequireLowercase = true,
                RequireUppercase = true,
            };
            IdentityResult result = await this.AppUserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }


        [Authorize(Roles = "SuperAdmin,Admin")]
        [Route("users")]
        public IHttpActionResult GetUsers()
        {
            return Ok(this.AppUserManager.Users.Where(i => i.DeletedOn == null).ToList());
        }
        [Route("getresources")]
        [Authorize(Roles = "SuperAdmin,Admin,User")]
        public IHttpActionResult GetResources()
        {
            var users = this.AppUserManager.Users.Where(i=>i.DeletedOn == null).ToList();
            List<ResourceModel> resources = new List<ResourceModel>();
            foreach (var user in users)
            {
                ResourceModel data = new ResourceModel();
                data.Id = user.Id;
                data.Name = user.FirstName + ' ' + user.LastName;
                resources.Add(data);
            }
            return Ok(resources);
        }

        [Authorize(Roles = "SuperAdmin,Admin")]
        [HttpPost]
        [Route("delete")]
        public async Task<IHttpActionResult> DeleteUser(string userId)
        {

            //Only SuperAdmin or Admin can delete users (Later when implement roles)

            var appUser = await this.AppUserManager.FindByIdAsync(userId);
            var currentRoles = await this.AppUserManager.GetRolesAsync(appUser.Id);
            var role = currentRoles.Where(i => i.Contains("SuperAdmin")).FirstOrDefault();
           
            if (appUser != null && role == null)
            {
                appUser.DeletedOn = DateTime.Now;
                IdentityResult result = await this.AppUserManager.UpdateAsync(appUser);

                if (!result.Succeeded)
                {
                    return GetErrorResult(result);
                }

                return Ok(true);

            }

            return NotFound();

        }

    }
}
