using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TnTManagement.Feature.Models
{
    public class ProjectModel
    {
        [JsonProperty(PropertyName = "projectId")]
        public int ProjectID { get; set; }
        [JsonProperty(PropertyName = "resourceId")]
        public string ResourceID { get; set; }
        [JsonProperty(PropertyName = "epicId")]
        public string EPICID { get; set; }
        [JsonProperty(PropertyName = "ccNumber")]
        public string CCNumber { get; set; }
        [JsonProperty(PropertyName = "projectName")]
        public string ProjectName { get; set; }
        [JsonProperty(PropertyName = "plannedStartDate")]
        public DateTime PlannedStartDate { get; set; }
        [JsonProperty(PropertyName = "plannedEndDate")]
        public DateTime PlannedEndDate { get; set; }
        [JsonProperty(PropertyName = "plannedEffort")]
        public int PlannedEffort { get; set; }
        [JsonProperty(PropertyName = "actualStartDate")]
        public DateTime? ActualStartDate { get; set; }
        [JsonProperty(PropertyName = "actualEndDate")]
        public DateTime? ActualEndDate { get; set; }
        [JsonProperty(PropertyName = "actualEffort")]
        public int ActualEffort { get; set; }
        [JsonProperty(PropertyName = "projectStatus")]
        public string ProjectStatus { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedDate { get; set; }
    }
}
