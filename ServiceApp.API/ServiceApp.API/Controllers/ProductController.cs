using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;
using ServiceApp.BLL.DTO;
using ServiceApp.BLL.Interfaces;
using Microsoft.AspNetCore.Cors;
namespace ServiceApp.API.Controllers
{
    [Authorize]
    [ApiController]
    [EnableCors("CorsPolicy")]
    public class ProductController : BaseController
    {
        private readonly IProductService _productService;
        public ProductController(IProductService product)
        {
            _productService = product;
        }
        
        [HttpPost("createproduct")]
        public async Task<IActionResult> CreateProduct([FromBody] CreateProductViewModel productmodel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var newproduct = await _productService.CreateNewProduct(productmodel);
            if (newproduct != null)
            {
                return Success(newproduct);
            }
            else
            {
                return Error(Utils.Constant.ResponseStatusCode.UniqRowDuplicate, "Can't create new product");
            }
        }
        [HttpGet]
        [HttpGet("products")]
        public async Task<IActionResult> GetAllProducts()
        {
            var product = await _productService.GetAllProduct();
            return Success(product);
        }

        [HttpPost("deleteproduct")]
        public async Task<IActionResult> DeleteProductPost([FromBody] CreateProductViewModel model)
        {
            var product = await _productService.DeleteProduct(model);
            if (product != null)
            {
                return Success(product);
            }
            else
            {
                return Error(Utils.Constant.ResponseStatusCode.UniqRowDuplicate, "Can't delete  product");
            }
        }



        [HttpPut("update")]
        public async Task<IActionResult> UpdateProduct([FromBody] CreateProductViewModel product)
        {
            var uproduct = await _productService.UpdateProduct(product);
            if (uproduct != null)
            {
                return Success(uproduct);
            }
            else
            {
                return Error(Utils.Constant.ResponseStatusCode.UniqRowDuplicate, "Can't update curent product");
            }
        }


    }
}
