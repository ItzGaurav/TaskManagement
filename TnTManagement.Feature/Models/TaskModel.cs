using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TnTManagement.Feature.Models
{

    public class TaskModel
    {
        [JsonProperty(PropertyName = "taskType")]
        public string TaskType { get; set; }
        [JsonProperty(PropertyName = "plannedEffort")]
        public int PlannedHours { get; set; }
        [JsonProperty(PropertyName = "resource")]
        public ResourceModel Resources { get; set; }
    }
    public class TaskList
    {
   
        [JsonProperty(PropertyName = "projectId")]
        public int ProjectId { get; set; }
        [JsonProperty(PropertyName = "taskName")]
        public string TaskName { get; set; }
        [JsonProperty(PropertyName = "plannedStartDate")]
        public DateTime PlannedStartDate { get; set; }
        [JsonProperty(PropertyName = "plannedEndDate")]
        public DateTime PlannedEndDate { get; set; }
        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }
        [JsonProperty(PropertyName = "tasktype")]
        public List<TaskModel> Task { get; set; }
    }
}
