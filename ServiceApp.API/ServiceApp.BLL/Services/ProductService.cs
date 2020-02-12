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
   public class ProductService: BaseService<Products,int>, IProductService
    {
        public ProductService(IRepository<Products, int> repository): base(repository)
        {

        }

        public Task<CreateProductViewModel> CreateNewProduct(CreateProductViewModel productmodel)
        {
            using (_repository.BeginTransaction())
            {
                try
                {
                    var product = GetAll(x => x.Name.ToLower().Equals(productmodel.Name) && x.Price )
                }
                catch
                {

                }
            }
        }
    }
}
