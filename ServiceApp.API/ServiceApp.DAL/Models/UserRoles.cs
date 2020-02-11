using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceApp.DAL.Models
{
   public class UserRoles
    {
        public int UserRoleId { get; set; }
        public int UserId { get; set; }
        public int RoleId { get; set; }

        public virtual Roles Role { get; set; }
        public virtual Users Users { get; set; }
    }
}
