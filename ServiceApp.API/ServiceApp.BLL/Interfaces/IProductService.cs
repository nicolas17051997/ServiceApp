using ServiceApp.BLL.DTO;
using ServiceApp.DAL.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace ServiceApp.BLL.Interfaces
{
    public interface IProductService : IBaseService<Products, int>
    {
        Task<CreateProductViewModel> CreateNewProduct(CreateProductViewModel productmodel);
        Task<IEnumerable<CreateProductViewModel>> GetAllProduct();
        Task<CreateProductViewModel> UpdateProduct(CreateProductViewModel model);
        Task<bool> DeleteProduct(CreateProductViewModel model);
    }
}
