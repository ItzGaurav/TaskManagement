using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TnTManagement.Feature.Models
{
    public class ProjectDropdownModel
    {
        [JsonProperty(PropertyName = "projectId")]
        public int ProjectID { get; set; }
        [JsonProperty(PropertyName = "projectName")]
        public string ProjectName { get; set; }
    }
}
