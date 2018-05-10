using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TnTManagement.Feature.Entities
{
    public class Project : EntityBase
    {
        [Key]
        public int ProjectID { get; set; }
        public string ResourceID { get; set; }
        [Column(TypeName = "NVARCHAR")]
        [StringLength(50)]
        public string EPICID { get; set; }
        [Column(TypeName = "NVARCHAR")]
        [StringLength(50)]
        public string CCNumber { get; set; }
        [Column(TypeName = "NVARCHAR")]
        [StringLength(500)]
        public string ProjectName { get; set; }
        public DateTime PlannedStartDate { get; set; }
        public DateTime PlannedEndDate { get; set; }
        public int PlannedEffort { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public DateTime? ActualEndDate { get; set; }
        public int ActualEffort { get; set; }
        [Column(TypeName = "NVARCHAR")]
        [StringLength(255)]
        public string ProjectStatus { get; set; }
        public virtual ICollection<Tasks> Tasks { get; set; }
    }
}
