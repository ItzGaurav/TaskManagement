using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TnTManagement.Feature.Models
{
    public class TaskDropDownModel
    {
        [JsonProperty(PropertyName = "taskId")]
        public int TaskID { get; set; }
        [JsonProperty(PropertyName = "projectId")]
        public int? ProjectId { get; set; }
        [JsonProperty(PropertyName = "taskName")]
        public string TaskName { get; set; }
        [JsonProperty(PropertyName = "taskType")]
        public string TaskType { get; set; }
    }
}
