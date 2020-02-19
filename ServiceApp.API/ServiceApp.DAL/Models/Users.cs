using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceApp.DAL.Models
{
  public  class Users
    {

        public int UserId { get; set; }
        public string UserEmail { get; set; }
        public string Name { get; set; }
        public string SurName { get; set; }
        public string Password { get; set; }
        public virtual Roles Roles { get; set; }
        public ICollection<Products> Products { get; set; }
    }
}
