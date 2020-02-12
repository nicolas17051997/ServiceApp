using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceApp.BLL.DTO
{
    class RegisterUserVeiwModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string UserSurname { get; set; }
        public string UserEmail { get; set; }
        public string UserPassword { get; set; }
        public string ConfirmedPassword { get; set; }
    }
}
