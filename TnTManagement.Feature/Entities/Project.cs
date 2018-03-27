using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TnTManagement.Feature.Entities
{
    public class Project : EntityBase
    {
        public string Name { get; set; }
       
    }
}
