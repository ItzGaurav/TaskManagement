namespace TnTManagement.Feature.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Projects", "ActualStartDate", c => c.DateTime(nullable: true));
            AlterColumn("dbo.Projects", "ActualEndDate", c => c.DateTime(nullable: true));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Projects", "ActualStartDate", c => c.Int(nullable: false));
            AlterColumn("dbo.Projects", "ActualEndDate", c => c.DateTime(nullable: false));
        }
    }
}
