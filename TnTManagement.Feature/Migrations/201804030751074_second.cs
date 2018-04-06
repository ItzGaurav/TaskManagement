namespace TnTManagement.Feature.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class second : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Tasks", "ActualTaskStartDate", c => c.DateTime(nullable: true));
            AlterColumn("dbo.Tasks", "ActualTaskEndDate", c => c.DateTime(nullable: true));
            AddColumn("dbo.Tasks", "TaskName", c => c.String(nullable: true));

        }

        public override void Down()
        {
            AlterColumn("dbo.Tasks", "ActualTaskStartDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Tasks", "ActualTaskEndDate", c => c.DateTime(nullable: false));
            DropColumn("dbo.Tasks", "TaskName");
        }
    }
}
