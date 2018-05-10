using System.Collections.Generic;
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
        [Authorize(Roles =  "Admin,SuperAdmin")]
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
        [Authorize(Roles = "Admin,SuperAdmin")]
        [Route("update")]
        public IHttpActionResult UpdateProject(ProjectModel value)
        {
            if (value != null)
            {
                string userId = GetUserId();
                return Ok(_projectService.UpdateProject(value, userId));
            }
            return Ok(false);
        }

        [Authorize(Roles = "Admin,SuperAdmin,User")]
        [Route("getProjects")]
        public IHttpActionResult GetProject()
        {

            var projects = this._projectService.GetAllProjects();
            List<ProjectDropdownModel> projectsDropdown = new List<ProjectDropdownModel>();
            foreach (var project in projects)
            {
                ProjectDropdownModel data = new ProjectDropdownModel();
                data.ProjectID = project.ProjectID;
                data.ProjectName = project.ProjectName;
                projectsDropdown.Add(data);
            }
            return Ok(projectsDropdown);
        }
        [Authorize(Roles ="SuperAdmin,Admin")]
        [Route("getAllProjects")]
        public IHttpActionResult GetAllProjects()
        {
            return Ok(this._projectService.GetAllProjects()); 
        }
        [Authorize(Roles = "SuperAdmin,Admin")]
        [Route("deleteproject")]
        [HttpPost]
        public IHttpActionResult DeleteProject(int projectId)
        {
            return Ok(_projectService.DeleteProject(projectId));
        }

    }
}
