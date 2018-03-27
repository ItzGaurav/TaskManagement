

using System.Web.Http;
using TnTManagement.Feature.Models;
using TnTManagement.Feature.Service;

namespace TnTManagement.Web.API.API
{
    public class ProjectController : BaseApiController
    {
        ProjectService _projectService = new ProjectService();
        public IHttpActionResult CreateProject(ProjectModel value)
        {
            if (value != null)
            {
                return Ok(_projectService.CreateProject(value));
            }
            return Ok(false);
        }

    }
}
