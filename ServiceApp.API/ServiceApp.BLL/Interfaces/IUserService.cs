using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ServiceApp.BLL.DTO;

namespace ServiceApp.BLL.Interfaces
{
   public interface IUserService
    {
        Task<UserViewModel> Authenticate(string username, string password);
        Task<UserViewModel> AuthenticateByToken(byte[] token);
        Task<IEnumerable<UserViewModel>> GetAllUsers();
    }
}
