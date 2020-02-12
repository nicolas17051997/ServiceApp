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
            if (string.IsNullOrWhiteSpace(model.UserPassword)) {
                throw new ApplicationException("Password is required");
            }
            if (string.IsNullOrWhiteSpace(model.UserEmail))
            {
                throw new ApplicationException("Email is required");
            }
            if(string.IsNullOrWhiteSpace(model.UserName))
            {
                throw new ApplicationException("Name is required");
            }
            if (string.IsNullOrWhiteSpace(model.UserSurname))
            {
                throw new ApplicationException("Surname is required");
            }
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
                        UserRole = 2,
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
