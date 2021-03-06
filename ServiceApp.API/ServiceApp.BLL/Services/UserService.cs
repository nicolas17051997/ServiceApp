﻿using Microsoft.EntityFrameworkCore;
using ServiceApp.BLL.DTO;
using ServiceApp.BLL.Interfaces;
using ServiceApp.DAL.Models;
using ServiceApp.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ServiceApp.BLL.Services
{
    public class UserService : BaseService<Users, int>, IUserService
    {
        private readonly IRoleService _roleService;
        private readonly IUserRoleService _userRoleService;


        public UserService(
            IRepository<Users, int> repository,
                       IRoleService roleService,
                       IUserRoleService uroleService
            ) : base(repository)
        {
            _roleService = roleService;
            _userRoleService = uroleService;
        }
        public async Task<UserViewModel> Authenticate(string username, string password)
        {
            var user = await GetAll(x => x.Name.Trim() == username.Trim() &&
            x.Password == GetHashString(password))
                .Include(x=> x.UsersRoles).ThenInclude(x => x.)
                .Select(x => new UserViewModel
                {
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

        public async Task<IEnumerable<UserViewModel>> GetAllUsers()
        {
            return await GetAll()
                .Select(x => new UserViewModel
                {
                    Id = x.UserId,
                    UserName = x.Name,
                    UserPassword = null
                }).ToListAsync();
        }

        public async Task<UserViewModel> Register(RegisterUserVeiwModel model)
        {
            var role = _roleService.GetAll(x => x.RoleName.Equals("User")).First();
            var encodet = GetHashString(model.UserPassword);
            try
            {
                var user = new Users
                {
                    Name = model.UserName,
                    SurName = model.UserSurname,
                    Password = encodet,
                    UserEmail = model.UserEmail,
                };
                var data = await Create(user);

                var userRole = new UsersRoles
                {
                    RolesId = role.RoleId,
                    UsersId = data.UserId
                };

                await _userRoleService.Create(userRole);

                var userView = new UserViewModel
                {
                    Id = data.UserId,
                    UserName = data.Name,
                    UserPassword = data.Password
                };

                return userView;
            }
            catch
            {
                return null;
            }
        }

    }
}
