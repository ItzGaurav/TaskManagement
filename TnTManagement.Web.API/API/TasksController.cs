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

namespace TnTManagement.Web.API.API
{
    [RoutePrefix("api/tasks")]
    public class TasksController : BaseApiController
    {
        TaskService _taskService = new TaskService();
        [HttpPost]
        [Authorize(Roles ="SuperAdmin")]
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
        [Route("getall")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            return Ok(_taskService.GetAllTasks());

        }
    }
}
