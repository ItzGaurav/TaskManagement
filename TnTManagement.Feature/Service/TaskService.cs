using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TnTManagement.Feature.DAL;
using TnTManagement.Feature.Entities;
using TnTManagement.Feature.Models;

namespace TnTManagement.Feature.Service
{
    public class TaskService
    {
        public static readonly DataContext db = new DataContext();

        public Tasks CreateTask(TaskModel value)
        {
            if (value != null)
            {
                var tasks = new Tasks
                {
                    // Name = value.Name,
                    //Project = value.Project,
                    //DueDate  = value.DueDate,
                    //Hours = value.Hours,
                    //Points = value.Points,
                    //CreatedBy = value.UserId,
                    //  CreatedOn = DateTime.Now
                };
                db.Tasks.Add(tasks);
                db.SaveChanges();
                return tasks;
            }
            return null;
        }
        public bool CreateAllTasks(TaskList value, string UserId)
        {
            if (value != null)
            {

                foreach (var item in value.Task)
                {
                    var tasks = new Tasks
                    {
                        TaskName = value.TaskName,
                        ProjectId = value.ProjectId,
                        PlannedTaskStartDate = value.PlannedStartDate,
                        PlannedTaskEndDate = value.PlannedEndDate,
                        Description = value.Description,
                        TaskType = item.TaskType,
                        PlannedTaskEffort = item.PlannedHours,
                        ResourceID = item.Resources.Id,
                        TaskStatus = "Open",
                        CreatedBy = UserId,
                        CreatedDate = DateTime.Now
                    };
                    db.Tasks.Add(tasks);
                }
                db.SaveChanges();
                return true;
            }
            return false;
        }
        public List<TaskDropDownModel> GetTasksByProject(int projectId, string userId)
        {
            var tasks = db.Tasks.Where(i => i.ProjectId == projectId && i.ResourceID == userId ).ToList();
            return tasks.Select(a => new TaskDropDownModel()
            {
                ProjectId = a.ProjectId,
                TaskID = a.TaskID,
                TaskName = a.TaskName + ' ' +'-'+ ' ' + a.TaskType,
               // TaskType = a.TaskType,
            }).ToList();
        }

        public Tasks UpdateTask(TaskModel value)
        {
            if (value != null)
            {
                ////var tasks = db.Tasks .Where(i => i.Id == value.TaskId).FirstOrDefault();

                //tasks.Name = value.Name;
                ////tasks.Project = value.Project;
                ////tasks.DueDate = value.DueDate;
                ////tasks.Hours = value.Hours;
                ////tasks.Points = value.Points;
                ////tasks.ChangedBy = value.UserId;
                //tasks.UpdatedOn  = DateTime.Now;
                //db.Tasks.Add(tasks);
                //db.Entry<Tasks>(tasks).State = System.Data.Entity.EntityState.Modified;
                //db.SaveChanges();
                //return tasks;
            }
            return null;
        }
        public Tasks GetByTaskId(int taskId)
        {
            //var tasks = db.Tasks.Where(i => i.Id == taskId).FirstOrDefault();
            return null;
        }
        public List<TaskReturnModel> GetAllTasks(string UserId)
        {
            var tasklist = (from task in db.Tasks
                            join proj in db.Projects on task.ProjectId equals proj.ProjectID
                            where task.CreatedBy == UserId || task.ResourceID == UserId
                            select new TaskReturnModel()
                            {
                                TaskID = task.TaskID,
                                TaskName = task.TaskName,
                                ProjectId = task.ProjectId,
                                ProjectName = proj.ProjectName,
                                TaskType = task.TaskType,
                                TaskStatus = task.TaskStatus,
                                ResourceID = task.ResourceID,
                                Description = task.Description,
                                ActualTaskEffort = task.ActualTaskEffort,
                                ActualTaskStartDate = task.ActualTaskStartDate,
                                ActualTaskEndDate = task.ActualTaskEndDate,
                                PlannedTaskEffort = task.PlannedTaskEffort,
                                PlannedTaskEndDate = task.PlannedTaskEndDate,
                                PlannedTaskStartDate = task.PlannedTaskStartDate,
                                CreatedId = task.CreatedBy,
                            }).Distinct().ToList();
            return tasklist;
        }
        public bool DeleteTask(int taskId)
        {
            var item = db.Tasks.Where(i => i.TaskID == taskId).FirstOrDefault();
            db.Tasks.Remove(item);
            try
            {
                db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

    }
}
