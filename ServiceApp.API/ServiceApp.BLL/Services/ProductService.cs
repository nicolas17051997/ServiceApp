using System;
using System.Collections.Generic;
using System.Text;
using ServiceApp.DAL.Models;
using ServiceApp.DAL.Repository;
using ServiceApp.BLL.Interfaces;
using System.Threading.Tasks;
using ServiceApp.BLL.DTO;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace ServiceApp.BLL.Services
{
    public class ProductService : BaseService<Products, int>, IProductService
    {
        //private readonly IUserService _userService;

        public ProductService(IRepository<Products, int> repository
            //IUserService userservice
            ) : base(repository)
        {
            
            
            
        }

        public async Task<CreateProductViewModel> CreateNewProduct(CreateProductViewModel productmodel)
        {
            using (_repository.BeginTransaction())
            {
                try
                {
                    var product = GetAll(x => x.Name.ToLower().Equals(productmodel.Name.ToLower())).FirstOrDefault();
                    if (product == null)
                    {
                        var data = new Products
                        {
                            Name = productmodel.Name,
                            Price = productmodel.Price,
                            Status = productmodel.Status,
                            Amount = productmodel.Amount
                        };
                        var result = await Create(data);
                        productmodel.Id = result.Id;

                        var vewproduct = new CreateProductViewModel
                        {
                            Id = result.Id,
                            Name = result.Name,
                            Price = result.Price,
                            Amount = result.Amount,
                            Status = result.Status
                        };

                        _repository.CommitTransaction();

                        return vewproduct;
                    }
                    else
                    {
                        _repository.RollbackTransaction();
                        return null;
                    }
                }
                catch
                {
                    return null;
                }
            }
            

        }

        public async Task<bool> DeleteProduct(CreateProductViewModel model)
        {
            try
            {
                var product = await Get(model.Id);
                if (product != null)
                {
                    await _repository.Delete(product);
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<IEnumerable<CreateProductViewModel>> GetAllProduct()
        {
            return await GetAll()
                .Select(x => new CreateProductViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Price = x.Price,
                    Amount = x.Amount,
                    Status = x.Status
                }).ToListAsync();
        }

        public async Task<CreateProductViewModel> UpdateProduct(CreateProductViewModel model)
        {
            try
            {
                var product = await Get(model.Id);
                if (product != null)
                {
                    product.Name = model.Name;
                    product.Price = model.Price;
                    product.Status = model.Status;

                }
                var newmodel = await _repository.Update(product);
                return model;
            }
            catch
            {
                return null;
            }
        }
    }
}
