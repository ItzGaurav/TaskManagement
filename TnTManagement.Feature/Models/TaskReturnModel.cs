using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TnTManagement.Feature.Models
{
    public class TaskReturnModel
    {
        [JsonProperty(PropertyName = "taskId")]
        public int TaskID { get; set; }
        [JsonProperty(PropertyName = "projectId")]
        public int? ProjectId { get; set; }
        [JsonProperty(PropertyName = "projectName")]
        public string ProjectName { get; set; }
        [JsonProperty(PropertyName = "resourceID")]
        public string ResourceID { get; set; }
        [JsonProperty(PropertyName = "resourceName")]
        public string ResourceName { get; set; }
        [JsonProperty(PropertyName = "taskName")]
        public string TaskName { get; set; }
        [JsonProperty(PropertyName = "taskType")]
        public string TaskType { get; set; }
        [JsonProperty(PropertyName = "plannedTaskStartDate")]
        public DateTime PlannedTaskStartDate { get; set; }
        [JsonProperty(PropertyName = "plannedTaskEndDate")]
        public DateTime PlannedTaskEndDate { get; set; }
        [JsonProperty(PropertyName = "plannedTaskEffort")]
        public decimal PlannedTaskEffort { get; set; }
        [JsonProperty(PropertyName = "actualTaskStartDate")]
        public DateTime? ActualTaskStartDate { get; set; }
        [JsonProperty(PropertyName = "actualTaskEndDate")]
        public DateTime? ActualTaskEndDate { get; set; }
        [JsonProperty(PropertyName = "actualEffort")]
        public decimal ActualTaskEffort { get; set; }
        [JsonProperty(PropertyName = "taskStatus")]
        public string TaskStatus { get; set; }
        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }
        [JsonProperty(PropertyName = "createdId")]
        public string CreatedId { get; set; }
        [JsonProperty(PropertyName = "createrName")]
        public string CreaterName { get; set; }
    }
}
