using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TnTManagement.Feature.Entities;
using TnTManagement.Feature.Modals;
using TnTManagement.Feature.Service;

namespace TnTManagement.Web.API.API
{
    [RoutePrefix("api/tasks")]
    public class TasksController : ApiController
    {
        TaskService _taskService = new TaskService();
        [HttpPost]
        [Route("createAll")]
        public IHttpActionResult CreateAll(List<TaskModel> value)
        {
            if (value != null)
            {
                return Ok(_taskService.CreateAllTasks(value));
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
