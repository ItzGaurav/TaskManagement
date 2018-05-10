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
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Project> Projects { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Tasks>()
            //    .HasRequired(a => a.Project)
            //    .WithMany()
            //    .WillCascadeOnDelete(true);
            //   base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<Activity>()
            //   .HasRequired(a => a.Project)
            //   .WithMany()
            //   .WillCascadeOnDelete(true);
            //  base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Tasks>()
         .HasRequired(x => x.Project)
         .WithMany(x => x.Tasks)
         .HasForeignKey(x => x.ProjectId)
         .WillCascadeOnDelete(true);

            modelBuilder.Entity<Activity>()
        .HasRequired(x => x.Tasks)
        .WithMany()
        .HasForeignKey(x => x.TaskId)
        .WillCascadeOnDelete(true);

            //modelBuilder.Entity<Activity>()
            //    .HasRequired(a => a.Tasks)
            //    .WithMany()
            //    .WillCascadeOnDelete(true);
            base.OnModelCreating(modelBuilder);

        }
    }
}
