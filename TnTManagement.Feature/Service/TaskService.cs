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
    public class TaskService
    {
        public static readonly DataContext db = new DataContext();

        public Tasks CreateTask(TaskModel value)
        {
            if (value != null)
            {
                var tasks = new Tasks
                {
                    Name = value.Name,
                    //Project = value.Project,
                    //DueDate  = value.DueDate,
                    //Hours = value.Hours,
                    //Points = value.Points,
                    //CreatedBy = value.UserId,
                    CreatedOn = DateTime.Now
                };
                db.Tasks.Add(tasks);
                db.SaveChanges();
                return tasks;
            }
            return null;
        }
        public bool CreateAllTasks(List<TaskModel> value)
        {
            if (value != null)
            {
                foreach (var item in value)
                {
                    var tasks = new Tasks
                    {
                        Name = item.Name,
                        //Project = value.Project,
                        //DueDate  = value.DueDate,
                        //Hours = value.Hours,
                        //Points = value.Points,
                        CreatedBy = item.,
                        CreatedOn = DateTime.Now
                    };
                    db.Tasks.Add(tasks);
                }
                db.SaveChanges();
                return true;
            }
            return false;
        }
        public Tasks UpdateTask(TaskModel value)
        {
            if (value != null)
            {
                var tasks = db.Tasks .Where(i => i.Id == value.TaskId).FirstOrDefault();

                tasks.Name = value.Name;
                //tasks.Project = value.Project;
                //tasks.DueDate = value.DueDate;
                //tasks.Hours = value.Hours;
                //tasks.Points = value.Points;
                //tasks.ChangedBy = value.UserId;
                tasks.UpdatedOn  = DateTime.Now;
                db.Tasks.Add(tasks);
                db.Entry<Tasks>(tasks).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return tasks;
            }
            return null;
        }
        public Tasks GetByTaskId(int taskId)
        {
            var tasks = db.Tasks.Where(i => i.Id == taskId).FirstOrDefault();
            return tasks;
        }
        public List<Tasks> GetAllTasks()
        {
            var tasklist = db.Tasks.ToList();
            return tasklist;
        }
    }
}
