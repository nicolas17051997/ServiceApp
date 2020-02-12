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

    }
}
