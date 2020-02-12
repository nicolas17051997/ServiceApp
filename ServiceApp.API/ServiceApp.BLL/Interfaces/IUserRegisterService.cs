using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ServiceApp.BLL.DTO;

namespace ServiceApp.BLL.Interfaces
{
    interface IUserRegisterService
    {
        Task<RegisterUserVeiwModel> CreateUser(RegisterUserVeiwModel model);
    }
}
