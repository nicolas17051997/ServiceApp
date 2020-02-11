using System;
using System.Collections.Generic;
using System.Text;
using ServiceApp.BLL.Interfaces;
using ServiceApp.DAL.Repository;
using ServiceApp.DAL.Models;
using System.Threading.Tasks;
using ServiceApp.BLL.DTO;
using ServiceApp.BLL.Helper;
using System.Linq;
using Microsoft.EntityFrameworkCore;


namespace ServiceApp.BLL.Services
{
    public class UserService : BaseService<Users, int>, IUserService
    {
        private readonly AppSettings _settings;

        public UserService(IRepository<Users, int> repository): base(repository)
        {

        }
        public async Task<UserViewModel> Authenticate(string username, string password)
        {
            var user = await GetAll(x => x.Name.Trim() == username.Trim() &&
            x.Password == GetHashString(password))
                .Select(x => new UserViewModel
                {
                    IdEmp = 1,
                    Id = x.UserId,
                    UserName = x.Name,
                    UserPassword = x.Password

                }).FirstOrDefaultAsync();
            if (user == null)
            {
                return null;
            }
            
            return user;
            
        }
        private string GetHashString(string s)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(s);
            byte[] byteHash = GetHash(bytes);

            string hash = Convert.ToBase64String(byteHash);

            return hash;
        }
        private byte[] GetHash(byte[] bytes)
        {
            using (var sha = System.Security.Cryptography.SHA1.Create())
            {
                var hash = sha.ComputeHash(bytes);
                return hash;
            }
        }

        public async Task<UserViewModel> AuthenticateByToken(byte[] token)
        {
            var credentials = Encoding.UTF8.GetString(token).Split(':');
            var username = credentials[0];
            var password = GetHashString(credentials[1]);

            var user = await GetAll(x =>
            x.Name.Trim() == username.Trim() &&
            x.Password == password)
                .Select(x => new UserViewModel
                {
                    IdEmp= x.RoleId,
                    Id = x.UserId,
                    UserName = x.Name,
                    UserPassword = null

                }).FirstOrDefaultAsync();
            if (user == null)
                return null;

            return user;
        }

        public async Task<IEnumerable<UserViewModel>> GetAllUsers()
        {
            return await GetAll()
                .Select(x => new UserViewModel
                {
                    IdEmp = x.RoleId,
                    Id = x.UserId,
                    UserName = x.Name,
                    UserPassword = null
                }).ToListAsync();
        }
    }
}
