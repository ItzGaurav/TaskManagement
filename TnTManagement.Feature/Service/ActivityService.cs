using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TnTManagement.Feature.DAL;
using TnTManagement.Feature.Entities;
using TnTManagement.Feature.Modals;

namespace TnTManagement.Feature.Service
{
    public class ActivityService
    {
        public static readonly DataContext db = new DataContext();
        public bool CreateActivities(List<ActivityModel> value, string UserId)
        {
            if (value != null)
            {

                foreach (var item in value)
                {
                    var activity = new Activity
                    {
                   
                       // ProjectId = item.ProjectId,
                        TaskId = item.TaskId,
                        Comments = item.Comments,
                        NoOfHoursSpent = item.NoOfHoursSpent,
                        ActivityDate = item.ActivityDate,
                        ResourceID = UserId,
                        CreatedBy = UserId,
                        CreatedDate = DateTime.Now
                    };
                    db.Activities.Add(activity);
                }
                db.SaveChanges();
                return true;
            }
            return false;
        }
        public List<ActivityModel> ResourceActivities(string userId)
        {
          //  var data = db.Activities.Where(i => i.ResourceID == UserId).OrderByDescending(p => p.ActivityDate).ToList();
            var resp = (from activity in db.Activities
                        join task in db.Tasks on activity.TaskId equals task.TaskID
                        join project in db.Projects on task.ProjectId equals project.ProjectID
                        where activity.ResourceID == userId
                        select new ActivityModel()
                        {
                            ActivityID = activity.ActivityID,
                            ActivityDate = activity.ActivityDate,
                            NoOfHoursSpent = activity.NoOfHoursSpent,
                            Comments = activity.Comments,
                            ResourceID = activity.ResourceID,
                            ProjectId = task.ProjectId,
                            ProjectName = project.ProjectName,
                            TaskId = activity.TaskId,
                            Task = task.TaskName + " - " + task.TaskType, 
                        }).OrderByDescending(i => i.ActivityDate);
            return resp.ToList();
            //return data.Select(a => new ActivityModel()
            //{
            //    ActivityID = a.ActivityID,
            //    ActivityDate = a.ActivityDate,
            //    Comments = a.Comments,
            //    ResourceID = a.ResourceID,
            //    ProjectId = a.ProjectId,
            //    NoOfHoursSpent = a.NoOfHoursSpent,
            //    TaskId = a.TaskId
            //}).ToList();
        }

        public bool DeleteActivity(int activityId)
        {
            var item = db.Activities.Where(i => i.ActivityID == activityId).FirstOrDefault();
            db.Activities.Remove(item);
            try
            {
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }

        }
    }
}
