using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceApp.DAL.Models
{
   public class Roles
    {
        public Roles()
        {
            Users = new HashSet<Users>();
            UserRoles = new HashSet<UserRoles>();
        }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string RoleDescr { get; set; }
        public bool IsReadOnly { get; set; }

        public virtual ICollection<Users> Users { get; set; }
        public virtual ICollection<UserRoles> UserRoles { get; set; }
    }
}
