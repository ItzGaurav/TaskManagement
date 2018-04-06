using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TnTManagement.Feature.Entities
{
    public class Tasks : EntityBase
    {
        [Key]
        public int TaskID { get; set; }
        [ForeignKey("ProjectId")]
        public Project Project { get; set; }
        public int? ProjectId { get; set; }
        [Column(TypeName = "NVARCHAR")]
        [StringLength(255)]
        public string ResourceID { get; set; }
        [Column(TypeName = "NVARCHAR")]
        [StringLength(255)]

        public string TaskName{ get; set; }
        public string TaskType { get; set; }
        public DateTime PlannedTaskStartDate { get; set; }
        public DateTime PlannedTaskEndDate { get; set; }
        public decimal PlannedTaskEffort { get; set; }
        public DateTime? ActualTaskStartDate { get; set; }
        public DateTime? ActualTaskEndDate { get; set; }
        public decimal ActualTaskEffort { get; set; }
        [Column(TypeName = "NVARCHAR")]
        [StringLength(255)]
        public string TaskStatus { get; set; }
        public string Description { get; set; }

    }
}
