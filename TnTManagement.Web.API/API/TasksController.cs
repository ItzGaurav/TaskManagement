using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using TnTManagement.Feature.Entities;
using TnTManagement.Feature.Models;
using TnTManagement.Feature.Service;
using TnTManagement.Web.API.Infrastructure;

namespace TnTManagement.Web.API.API
{
    [RoutePrefix("api/tasks")]
    public class TasksController : BaseApiController
    {
        TaskService _taskService = new TaskService();
        [HttpPost]
        [Authorize(Roles = "SuperAdmin,Admin,User")]
        [Route("createAll")]
        public IHttpActionResult CreateAll(TaskList value)
        {

            if (value != null)
            {
                string userId = GetUserId();
                return Ok(_taskService.CreateAllTasks(value, userId));
            }
            return Ok(false);
        }
        [Route("getallByResource")]
        [HttpGet]
        [Authorize(Roles = "SuperAdmin,Admin,User")]
        public IHttpActionResult GetAll()
        {
            string userId = GetUserId();
            List<TaskReturnModel> taskList = new List<TaskReturnModel>();
            var users = this.AppUserManager.Users.ToList();
            var tasks = _taskService.GetAllTasks(userId);
            foreach (var item in tasks)
            {
                ApplicationUser createdUser = users.FirstOrDefault(i => i.Id == item.CreatedId);
                ApplicationUser assignedUser = users.FirstOrDefault(i => i.Id == item.ResourceID);
                if (assignedUser != null && createdUser != null)
                {
                    item.ResourceName = assignedUser.FirstName + " " + assignedUser.LastName;
                    item.CreaterName = createdUser.FirstName + " " + createdUser.LastName;
                }
                taskList.Add(item);
            }
            return Ok(taskList);

        }
        [Route("getTaskDropdown")]
        [Authorize(Roles = "SuperAdmin,Admin,User")]
        [HttpGet]
        public IHttpActionResult GetTaskByProject(int projectId)
        {
            string userId = GetUserId();
            return Ok(_taskService.GetTasksByProject(projectId, userId));
        }
        [Route("deleteTask")]
        [Authorize(Roles = "SuperAdmin,Admin,User")]
        [HttpPost]
        public IHttpActionResult DeleteTask(int taskId)
        {
            string userId = GetUserId();
     

            return Ok(_taskService.DeleteTask(taskId));
        }

    }
}
