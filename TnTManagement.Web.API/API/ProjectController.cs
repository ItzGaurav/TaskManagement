using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using TnTManagement.Feature.Models;
using TnTManagement.Feature.Service;

namespace TnTManagement.Web.API.API
{
    [RoutePrefix("api/project")]
    public class ProjectController : BaseApiController
    {
        ProjectService _projectService = new ProjectService();
        [Authorize(Roles =  "Admin,Super Admin")]
        [Route("create")]
        public IHttpActionResult CreateProject(ProjectModel value)
        {

            if (value != null)
            {
                string userId = GetUserId();
                return Ok(_projectService.CreateProject(value, userId));
            }
            return Ok(false);
        }

    }
}
