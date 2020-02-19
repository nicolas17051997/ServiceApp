using System;
using System.Collections.Generic;
using System.Text;
using ServiceApp.DAL.Models;
using ServiceApp.DAL.Repository;
using ServiceApp.BLL.Interfaces;
using System.Threading.Tasks;
using ServiceApp.BLL.DTO;

namespace ServiceApp.BLL.Services
{
    public class RegisterUserService : BaseService<Users, int>, IUserRegisterService
    {
        public RegisterUserService(IRepository<Users, int> repository): base(repository)
        {

        }
        public async Task<Users> CreateUser(RegisterUserVeiwModel model)
        {
            var role = new Roles { RoleName = "User" };
            using (_repository.BeginTransaction())
            {
                try
                {
                    var user = new Users
                    {
                        Name = model.UserName,
                        SurName = model.UserSurname,
                        Password = model.UserPassword,
                        UserEmail = model.UserEmail,
                        Roles = role
                        
                    };
                    var data = await Create( user);

                    return user;
                }
                catch
                {
                    _repository.RollbackTransaction();
                    return null;
                }
            }
            
        }
    }
}
