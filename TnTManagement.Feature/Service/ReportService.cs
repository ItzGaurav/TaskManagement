using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TnTManagement.Feature.DAL;
using TnTManagement.Feature.Modals;

namespace TnTManagement.Feature.Service
{
    public class ReportService
    {
        public static readonly DataContext db = new DataContext();
        public List<ActivityModel> ResourceActivities(string userId, DateTime? fromDate, DateTime? toDate)
        {
            if (!String.IsNullOrEmpty(userId) && !fromDate.HasValue && !toDate.HasValue)
            {
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
                            }
                   ).OrderByDescending(i => i.ActivityDate);
                return resp.ToList();
            }
            else if (!String.IsNullOrEmpty(userId) && fromDate.HasValue && toDate.HasValue)
            {
                var resp = (from activity in db.Activities
                            join task in db.Tasks on activity.TaskId equals task.TaskID
                            join project in db.Projects on task.ProjectId equals project.ProjectID
                            where activity.ResourceID == userId && activity.ActivityDate >= fromDate && activity.ActivityDate <= toDate
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
                            }
                  ).OrderByDescending(i => i.ActivityDate);
                return resp.ToList();
            }
            else if (String.IsNullOrEmpty(userId) && fromDate.HasValue && toDate.HasValue)
            {
                var resp = (from activity in db.Activities
                            join task in db.Tasks on activity.TaskId equals task.TaskID
                            join project in db.Projects on task.ProjectId equals project.ProjectID
                            where  activity.ActivityDate >= fromDate && activity.ActivityDate <= toDate
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
                            }
                     ).OrderByDescending(i => i.ActivityDate);
                return resp.ToList();

            }
            else if (!String.IsNullOrEmpty(userId) && fromDate.HasValue && !toDate.HasValue)
            {
                var resp = (from activity in db.Activities
                            join task in db.Tasks on activity.TaskId equals task.TaskID
                            join project in db.Projects on task.ProjectId equals project.ProjectID
                            where activity.ActivityDate >= fromDate
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
                            }
                     ).OrderByDescending(i => i.ActivityDate);
                return resp.ToList();

            }
            else if (!String.IsNullOrEmpty(userId) && !fromDate.HasValue && toDate.HasValue)
            {
                var resp = (from activity in db.Activities
                            join task in db.Tasks on activity.TaskId equals task.TaskID
                            join project in db.Projects on task.ProjectId equals project.ProjectID
                            where activity.ActivityDate <= toDate
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
                            }
                     ).OrderByDescending(i => i.ActivityDate);
                return resp.ToList();

            }
            else return null;
       
        }
    }
}
