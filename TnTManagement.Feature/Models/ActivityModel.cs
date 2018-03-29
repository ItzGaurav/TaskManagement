using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TnTManagement.Feature.Modals
{
    public class ActivityModel
    {
        public int UserId { get; set; }
        public Task Tasks { get; set; }
        public int TaskId { get; set; }
        public string Description { get; set; }
        public string Comments { get; set; }
        public DateTime WorkDate { get; set; }
        public int WorkHours { get; set; }
    }
}
