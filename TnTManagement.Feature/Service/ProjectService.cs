using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
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
                    ActualStartDate = value.PlannedStartDate,
                    ActualEndDate = value.PlannedEndDate,
                    ActualEffort = value.PlannedEffort,
                    CreatedBy = userId,
                    CreatedDate = DateTime.Now
                };
                db.Projects.Add(project);
                db.SaveChanges();
                return project;
            }
            return null;
        }

        public bool UpdateProject(ProjectModel value, string userId)
        {
            try
            {
                var data = db.Projects.Where(i => i.ProjectID == value.ProjectID).FirstOrDefault();
                data.ProjectName = value.ProjectName;
                data.EPICID = value.EPICID;
                data.CCNumber = value.CCNumber;
                data.ProjectStatus = value.ProjectStatus;
                data.ResourceID = value.ResourceID;
                data.PlannedStartDate = value.PlannedStartDate;
                data.PlannedEndDate = value.PlannedEndDate;
                data.PlannedEffort = value.PlannedEffort;
                data.ActualStartDate = value.ActualStartDate;
                data.ActualEndDate = value.ActualEndDate;
                data.ActualEffort = value.ActualEffort;
                data.LastModifiedBy = userId;
                data.LastModifiedDate = DateTime.Now;
                db.Projects.Add(data);
                db.Entry(data).State = EntityState.Modified;
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }


        }

        public bool DeleteProject(int projectId)
        {
            //Project project = new Project { ProjectID = projectId };
            //db.Entry(project).State = EntityState.Deleted;
            //db.SaveChanges();
            //return true;
            var project = db.Projects.FirstOrDefault(x => x.ProjectID == projectId);
            db.Projects.Remove(project);
            try
            {
                db.SaveChanges();
                return true;
            }
            catch (DataException ex)
            {
                return false;
            }
        }

        public List<ProjectModel> GetAllProjects()
        {
            var data = db.Projects.OrderByDescending(x => x.LastModifiedDate).ToList();
            return data.Select(a => new ProjectModel()
            {
                ProjectID = a.ProjectID,
                ProjectName = a.ProjectName,
                EPICID = a.EPICID,
                CCNumber = a.CCNumber,
                ProjectStatus = a.ProjectStatus,
                ResourceID = a.ResourceID,
                PlannedStartDate = a.PlannedStartDate,
                PlannedEndDate = a.PlannedEndDate,
                PlannedEffort = a.PlannedEffort,
                ActualStartDate = a.ActualStartDate,
                ActualEndDate = a.ActualEndDate,
                ActualEffort = a.ActualEffort
            }).ToList();
        }
    }
}
