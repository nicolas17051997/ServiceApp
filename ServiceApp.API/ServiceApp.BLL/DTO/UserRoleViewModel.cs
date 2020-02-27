using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceApp.BLL.DTO
{
   public class UserRoleViewModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string UserRole { get; set; }
    }
}
