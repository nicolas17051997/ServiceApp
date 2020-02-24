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
        private readonly IProductService _productServise;
        public ProductService(IRepository<Products, int> repository, IProductService productservice) : base(repository)
        {
            _productServise = productservice;
        }

        public async Task<CreateProductViewModel> CreateNewProduct(CreateProductViewModel productmodel)
        {
            using (_repository.BeginTransaction())
            {
                try
                {
                    var product = GetAll(x => x.Name.ToLower().Equals(productmodel.Name) && x.Status == true).FirstOrDefault();
                    if (product == null)
                    {
                        var data = new Products
                        {
                            Name = productmodel.Name,
                            Price = productmodel.Price,
                            Status = productmodel.Status
                        };
                        var result = await Create(data);
                        productmodel.Id = result.Id;
                        _repository.CommitTransaction();
                        return productmodel;
                    }
                    else
                    {
                        return null;
                    }
                }
                catch
                {
                    _repository.RollbackTransaction();
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
                    await _productServise.Delete(product);
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
                var product = await _productServise.Get(model.Id);
                if (product != null)
                {
                    product.Name = model.Name;
                    product.Price = model.Price;
                    product.Status = model.Status;

                }
                var newmodel = await _productServise.Update(product);
                return model;
            }
            catch
            {
                return null;
            }
        }
    }
}
