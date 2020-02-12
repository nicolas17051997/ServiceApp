using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using ServiceApp.DAL.Models;

namespace ServiceApp.DAL.EFContext
{
   public class ServiceContext : DbContext
    {
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Products> Products { get; set; }
        public virtual DbSet<UserRoles> UserRoles { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        static ServiceContext()
        {

        }
        public ServiceContext(DbContextOptions<ServiceContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            string adminRoleName = "admin";
            string userRoleName = "user";

            string adminEmail = "admin@mail.ru";
            string adminname = "Admin";
            string adminPassword = "123456";
            Roles adminRole = new Roles { RoleName = adminRoleName, RoleId = 1 };
            Roles userRole = new Roles { RoleName = userRoleName, RoleId = 2 };
            Users adminUsers = new Users { UserId = 1, UserEmail = adminEmail, Password = adminPassword, RoleId = adminRole.RoleId, Name = adminname };

            builder.Entity<Roles>().HasData(new Roles[] { adminRole, userRole });
            builder.Entity<Users>().HasData(new Users[] { adminUsers });
            base.OnModelCreating(builder);
        }
    }
}
