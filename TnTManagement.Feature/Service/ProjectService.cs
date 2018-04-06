using System;
using System.Collections.Generic;
using System.Data.Entity;
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

        public Project CreateProject(ProjectModel value, string userId)
        {
            if (value != null)
            {
                var project = new Project
                {
                    ProjectName = value.ProjectName,
                    CCNumber = value.CCNumber,
                    EPICID = value.EPICID,
                    PlannedStartDate = value.PlannedStartDate,
                    PlannedEndDate = value.PlannedEndDate,
                    PlannedEffort = value.PlannedEffort,
                    LastModifiedBy = userId,
                    ProjectStatus = value.ProjectStatus,
                    ResourceID = value.ResourceID,
                    //ActualStartDate =value.ActualStartDate,
                    //ActualEndDate = value.ActualEndDate,
                    //ActualEffort = value.ActualEffort,
                    LastModifiedDate = DateTime.Now
                };
                db.Projects.Add(project);
                db.SaveChanges();
                return project;
            }
            return null;
        }

        public bool DeleteProject(int projectId)
        {
            Project project = new Project { ProjectID = projectId };
            db.Entry(project).State = EntityState.Deleted;
            db.SaveChanges();
            return false;
        }

        public List<ProjectModel> GetAllProjects()
        {
            var data =  db.Projects.OrderByDescending(x => x.LastModifiedDate).ToList();
            return data.Select(a => new ProjectModel(){
                ProjectID = a.ProjectID,
                ProjectName = a.ProjectName,
                EPICID = a.EPICID,
                CCNumber = a.CCNumber,
                ProjectStatus = a.ProjectStatus,
                ResourceID =a.ResourceID,
                PlannedStartDate =a.PlannedStartDate,
                PlannedEndDate = a.PlannedEndDate,
                PlannedEffort = a.PlannedEffort,
                ActualStartDate = a.ActualStartDate,
                ActualEndDate = a.ActualEndDate,
                ActualEffort =a.ActualEffort                
            }).ToList();
        }
    }
}
