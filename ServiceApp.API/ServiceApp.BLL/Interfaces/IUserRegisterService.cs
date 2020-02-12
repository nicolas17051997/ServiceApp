using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ServiceApp.BLL.DTO;
using ServiceApp.DAL.Models;

namespace ServiceApp.BLL.Interfaces
{
   public interface IUserRegisterService
    {
        Task<Users> CreateUser(RegisterUserVeiwModel model);
    }
}
