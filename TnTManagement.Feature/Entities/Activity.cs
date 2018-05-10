using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace TnTManagement.Feature.Entities
{
    public class Activity : EntityBase
    {
        [Key]
        public int ActivityID { get; set; }
        //[ForeignKey("ProjectId")]
        //public Project Project { get; set; }
        //public int ProjectId { get; set; }
        [ForeignKey("TaskId")]
        public Tasks Tasks { get; set; }
        public int TaskId { get; set; }
        [Column(TypeName = "NVARCHAR")]
        [StringLength(255)]
        public string ResourceID { get; set; }
        public string Comments { get; set; }
        public string ActivityStatus { get; set; }
        public DateTime ActivityDate { get; set; }
        public int NoOfHoursSpent { get; set; }
    }
}
