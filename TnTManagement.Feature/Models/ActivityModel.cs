using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TnTManagement.Feature.Modals
{
    public class ActivityModel
    {
        [JsonProperty(PropertyName = "activityId")]
        public int ActivityID { get; set; }
        [JsonProperty(PropertyName = "projectId")]
        public int ProjectId { get; set; }
        [JsonProperty(PropertyName = "projectName")]
        public string ProjectName { get; set; }
        [JsonProperty(PropertyName = "taskId")]
        public int TaskId { get; set; }
        [JsonProperty(PropertyName = "task")]
        public string Task { get; set; }
        [JsonProperty(PropertyName = "resourceId")]
        public string ResourceID { get; set; }
        [JsonProperty(PropertyName = "resourceName")]
        public string ResourceName { get; set; }
        [JsonProperty(PropertyName = "comments")]
        public string Comments { get; set; }
        [JsonProperty(PropertyName = "activityDate")]
        public DateTime ActivityDate { get; set; }
        [JsonProperty(PropertyName = "noOfHoursSpent")]
        public int NoOfHoursSpent { get; set; }
    }
}
