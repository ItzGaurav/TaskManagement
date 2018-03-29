using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using TnTManagement.Web.API.Infrastructure;

namespace TnTManagement.Web.API.Providers
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
            return Task.FromResult<object>(null);
        }
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            var allowedOrigin = "*";

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });
          //  SetContextHeaders(context);
            var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();

            ApplicationUser user = await userManager.FindAsync(context.UserName, context.Password);

            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
                return;
            }

            //if (!user.EmailConfirmed)
            //{
            //    context.SetError("invalid_grant", "User did not confirm email.");
            //    return;
            //}

            ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(userManager, "JWT");

            //var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            //oAuthIdentity.AddClaim(new Claim(ClaimTypes.Name, context.Id));
            ////oAuthIdentity.AddClaim(new Claim("role", "SuperAdmin"));

            oAuthIdentity.AddClaim(new Claim("Id", user.Id));

            //oAuthIdentity.AddClaims(ExtendedClaimsProvider.GetClaims(user));

            //oAuthIdentity.AddClaims(RolesFromClaims.CreateRolesBasedOnClaims(oAuthIdentity));

            //  var ticket = new AuthenticationTicket(oAuthIdentity, null);
            var props = new AuthenticationProperties(new Dictionary<string, string>
                {
                    {
                         "userId", (user.Id == null) ? string.Empty : user.Id
                    }
                });



            var ticket = new AuthenticationTicket(oAuthIdentity, props);

            context.Validated(ticket);

        }
       
        //private void SetContextHeaders(OAuthGrantResourceOwnerCredentialsContext context)
        //{
        //    context.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
        //    context.Response.Headers.Add("Access-Control-Allow-Methods", new[] { "GET, PUT, DELETE, POST, OPTIONS" });
        //    context.Response.Headers.Add("Access-Control-Allow-Headers", new[] { "Content-Type, Accept, Authorization" });
        //    context.Response.Headers.Add("Access-Control-Max-Age", new[] { "1728000" });
        //}
    }
}