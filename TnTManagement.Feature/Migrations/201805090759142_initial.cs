namespace TnTManagement.Feature.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Activities",
                c => new
                    {
                        ActivityID = c.Int(nullable: false, identity: true),
                        TaskId = c.Int(nullable: false),
                        ResourceID = c.String(maxLength: 255),
                        Comments = c.String(),
                        ActivityStatus = c.String(),
                        ActivityDate = c.DateTime(nullable: false),
                        NoOfHoursSpent = c.Int(nullable: false),
                        LastModifiedBy = c.String(maxLength: 255),
                        CreatedBy = c.String(maxLength: 255),
                        LastModifiedDate = c.DateTime(),
                        CreatedDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.ActivityID)
                .ForeignKey("dbo.Tasks", t => t.TaskId, cascadeDelete: true)
                .Index(t => t.TaskId);
            
            CreateTable(
                "dbo.Tasks",
                c => new
                    {
                        TaskID = c.Int(nullable: false, identity: true),
                        ProjectId = c.Int(nullable: false),
                        ResourceID = c.String(maxLength: 255),
                        TaskName = c.String(maxLength: 255),
                        TaskType = c.String(),
                        PlannedTaskStartDate = c.DateTime(nullable: false),
                        PlannedTaskEndDate = c.DateTime(nullable: false),
                        PlannedTaskEffort = c.Decimal(nullable: false, precision: 18, scale: 2),
                        ActualTaskStartDate = c.DateTime(),
                        ActualTaskEndDate = c.DateTime(),
                        ActualTaskEffort = c.Decimal(nullable: false, precision: 18, scale: 2),
                        TaskStatus = c.String(maxLength: 255),
                        Description = c.String(),
                        LastModifiedBy = c.String(maxLength: 255),
                        CreatedBy = c.String(maxLength: 255),
                        LastModifiedDate = c.DateTime(),
                        CreatedDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.TaskID)
                .ForeignKey("dbo.Projects", t => t.ProjectId, cascadeDelete: true)
                .Index(t => t.ProjectId);
            
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        ProjectID = c.Int(nullable: false, identity: true),
                        ResourceID = c.String(),
                        EPICID = c.String(maxLength: 50),
                        CCNumber = c.String(maxLength: 50),
                        ProjectName = c.String(maxLength: 500),
                        PlannedStartDate = c.DateTime(nullable: false),
                        PlannedEndDate = c.DateTime(nullable: false),
                        PlannedEffort = c.Int(nullable: false),
                        ActualStartDate = c.DateTime(),
                        ActualEndDate = c.DateTime(),
                        ActualEffort = c.Int(nullable: false),
                        ProjectStatus = c.String(maxLength: 255),
                        LastModifiedBy = c.String(maxLength: 255),
                        CreatedBy = c.String(maxLength: 255),
                        LastModifiedDate = c.DateTime(),
                        CreatedDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.ProjectID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Activities", "TaskId", "dbo.Tasks");
            DropForeignKey("dbo.Tasks", "ProjectId", "dbo.Projects");
            DropIndex("dbo.Tasks", new[] { "ProjectId" });
            DropIndex("dbo.Activities", new[] { "TaskId" });
            DropTable("dbo.Projects");
            DropTable("dbo.Tasks");
            DropTable("dbo.Activities");
        }
    }
}
