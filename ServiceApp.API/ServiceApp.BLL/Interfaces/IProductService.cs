using System;
using System.Collections.Generic;
using System.Text;
using ServiceApp.BLL.DTO;
using System.Threading.Tasks;

namespace ServiceApp.BLL.Interfaces
{
   public interface IProductService
    {
        Task<CreateProductViewModel> CreateNewProduct(CreateProductViewModel productmodel);
    }
}
