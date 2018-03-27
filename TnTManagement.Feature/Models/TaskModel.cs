using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TnTManagement.Feature.Modals
{

    public class TaskModel
    {
        public int TaskId { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        public string Description { get; set; }
        //public decimal Points { get; set; }
        //public decimal Hours { get; set; }
        //public DateTime DueDate { get; set; }
        //public string Project { get; set; }

        public string UserId { get; set; }
    }
    public class TaskList
    {
        public List<TaskModel> Task { get; set; }
    }
}
