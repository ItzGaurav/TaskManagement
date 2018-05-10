using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TnTManagement.Feature.Modals;
using TnTManagement.Feature.Service;
using TnTManagement.Web.API.Infrastructure;

namespace TnTManagement.Web.API.API
{
    [RoutePrefix("api/report")]
    public class ReportController : BaseApiController
    {
        ReportService _reportService = new ReportService();
        [HttpGet]
        [Authorize(Roles ="Admin,SuperAdmin")]
        [Route("activityReportByUser")]
        public IHttpActionResult GetActivityReportByUser(string userId, DateTime? fromDate, DateTime? toDate)
        {
            List<ActivityModel> activities = new List<ActivityModel>();
            var users = this.AppUserManager.Users.ToList();
            var  data = _reportService.ResourceActivities(userId,fromDate,toDate);
            if (data != null)
            {
                foreach (var item in data)
                {
                    ApplicationUser user = users.FirstOrDefault(i => i.Id == item.ResourceID);
                    if (user != null)
                    {
                        item.ResourceName = user.FirstName + " " + user.LastName;
                    }
                    activities.Add(item);
                }
                return Ok(activities);
            }
            else return Ok();
        }
        
    }
}
