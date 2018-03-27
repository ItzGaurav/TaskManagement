using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TnTManagement.Feature.DAL;
using TnTManagement.Feature.Entities;
using TnTManagement.Feature.Models;

namespace TnTManagement.Feature.Service
{
    public class ProjectService
    {
        public static readonly DataContext db = new DataContext();

        public Project CreateProject(ProjectModel value)
        {
            if (value != null)
            {
                var project = new Project
                {
                    Name = value.Name,
                    //Project = value.Project,
                    //DueDate  = value.DueDate,
                    //Hours = value.Hours,
                    //Points = value.Points,
                    //CreatedBy = value.UserId,
                    CreatedOn = DateTime.Now
                };
                db.Projects.Add(project);
                db.SaveChanges();
                return project;
            }
            return null;
        }
    }
}
