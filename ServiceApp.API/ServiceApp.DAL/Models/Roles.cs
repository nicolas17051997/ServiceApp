using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceApp.DAL.Models
{
   public class Roles
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }

        public virtual Users Users { get; set; }
    }
}
