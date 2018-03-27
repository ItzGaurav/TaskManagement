using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace TnTManagement.Feature.Entities
{
    public class TimeSheet : EntityBase
    {
      
        public string UserId { get; set; }
        [ForeignKey("TaskId")]
        public Tasks Tasks { get; set; }
        public int TaskId { get; set; }
        public string Description { get; set; }
        public string Comments { get; set; }
        public DateTime WorkDate { get; set; }
        public int WorkHours { get; set; }
    }
}
