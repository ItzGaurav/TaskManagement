using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using TnTManagement.Feature.Entities;

namespace TnTManagement.Feature.DAL
{
    public class DataContext : DbContext
    {
        public DataContext() : base("DefaultConnection")
        {
            Database.SetInitializer<DataContext>(new CreateDatabaseIfNotExists<DataContext>());

        }
        public DbSet<Tasks> Tasks { get; set; }
        public DbSet<TimeSheet> TimeSheets { get; set; }
        public DbSet<Project> Projects { get; set; }
    }
}
