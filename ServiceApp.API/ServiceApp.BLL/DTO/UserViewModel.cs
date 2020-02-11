using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceApp.BLL.DTO
{
   public class UserViewModel
    {
        public int Id { get; set; }
        public int? IdEmp { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
    }
}
