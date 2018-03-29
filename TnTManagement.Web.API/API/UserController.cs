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
        [AllowAnonymous]
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
                AllowOnlyAlphanumericUserNames = true,
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
                UserName = createUserModel.Username,
                Email = createUserModel.Email,
                FirstName = createUserModel.FirstName,
                LastName = createUserModel.LastName,

                // JoinDate = DateTime.Now,
            };

            IdentityResult addUserResult = await this.AppUserManager.CreateAsync(user, createUserModel.Password);



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

        [Authorize(Roles = "SuperAdmin")]
        [Route("users")]
        public IHttpActionResult GetUsers()
        {
            return Ok(this.AppUserManager.Users.ToList());
        }
        [Route("getresources")]
        public IHttpActionResult GetResources()
        {
            var users = this.AppUserManager.Users.ToList();
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

    }
}
