using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceApp.DAL.Models
{
  public  class Users
    {
        public Users()
        {
            UserRoleNavigation = new HashSet<UserRoles>();
        }

        public int UserId { get; set; }
        public string UserEmail { get; set; }
        public int UserRole { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Password { get; set; }
        public string ConfPassword { get; set; }
        public string Token { get; set; }

        public int? RoleId { get; set; }
        public virtual Roles UserRole1 { get; set; }
        public virtual ICollection<UserRoles> UserRoleNavigation { get; set; }
    }
}
