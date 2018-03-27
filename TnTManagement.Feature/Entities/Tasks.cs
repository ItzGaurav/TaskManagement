using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TnTManagement.Feature.Entities
{
    public class Tasks : EntityBase
    {
        [ForeignKey("ProjectId")]
        public Project Project { get; set; }
        public int? ProjectId { get; set; }
        public string Name { get; set; }
        public string UserId { get; set; }

        //public decimal Points { get; set; }
        //public decimal Hours { get; set; }
        //public DateTime DueDate { get; set; }
        //public string Project { get; set; }

    }
}
