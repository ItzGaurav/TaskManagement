using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.UI;
using System.Web.UI.WebControls;
using TnTManagement.Feature.Modals;
using TnTManagement.Feature.Service;

namespace TnTManagement.Web.API.API
{
    [RoutePrefix("api/activity")]
    public class ActivityController : BaseApiController
    {
        ActivityService _activityService = new ActivityService();
        [Route("createAll")]
        [HttpPost]
        [Authorize(Roles = "SuperAdmin,Admin,User")]
        public IHttpActionResult CreateActivities(List<ActivityModel> value)
        {
            if (value != null)
            {
                string userId = GetUserId();
                return Ok(_activityService.CreateActivities(value, userId));
            }
            return Ok(false);
        }
        [HttpGet]
        [Route("getAllActivity")]
        [Authorize(Roles = "SuperAdmin,Admin,User")]
        public IHttpActionResult GetAllActivities()
        {
            string userId = GetUserId();
            return Ok(_activityService.ResourceActivities(userId));
        }
        [HttpPost]
        [Route("deleteActivity")]
        [Authorize(Roles = "SuperAdmin,Admin,User")]
        public IHttpActionResult DeleteActivity(int activityId)
        {
            return Ok(_activityService.DeleteActivity(activityId));
        }


        [HttpGet]
        [Route("exportMyReport")]
        [Authorize(Roles ="SuperAdmin,Admin,User")]
        public void ExportReportByResource()
        {
            var gv = new GridView();
            string userId = GetUserId();
            gv.DataSource = _activityService.ResourceActivities(userId);
            gv.DataBind();

            HttpContext.Current.Response.ClearContent();

            NameValueCollection headers = HttpContext.Current.Request.Headers;
            Type t = headers.GetType();
            //get the property
            PropertyInfo p = t.GetProperty("IsReadOnly", BindingFlags.Instance | BindingFlags.IgnoreCase | BindingFlags.NonPublic | BindingFlags.FlattenHierarchy);
            //unset readonly
            p.SetValue(headers, false, null);
            //add a header
            headers.Add("Server", "Microsoft-IIS%2f10.0&X-AspNetMvc-Version=5.2");


            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.BufferOutput = true;

            string filename = $"ActivityReport_{DateTime.Now:MM dd yyyy}.xls";

            HttpContext.Current.Response.AddHeader("content-disposition", $"attachment; filename={filename}");
            HttpContext.Current.Response.ContentType = "application/ms-excel";
            HttpContext.Current.Response.Charset = "";
            StringWriter objStringWriter = new StringWriter();
            HtmlTextWriter objHtmlTextWriter = new HtmlTextWriter(objStringWriter);
            gv.RenderControl(objHtmlTextWriter);
            HttpContext.Current.Response.Output.Write(objStringWriter.ToString());
            HttpContext.Current.Response.Flush();
            HttpContext.Current.Response.End();
        }
    }
}
