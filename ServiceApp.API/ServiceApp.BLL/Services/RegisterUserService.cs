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
        public async Task<RegisterUserVeiwModel> CreateUser(RegisterUserVeiwModel model)
        {
            using (_repository.BeginTransaction())
            {
                try
                {
                    var user = GetAll(x => x.Name)
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
