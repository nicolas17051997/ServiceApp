using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ServiceApp.BLL.DTO;
using ServiceApp.BLL.Interfaces;
using System;
using System.Net.Http;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;

namespace ServiceApp.API.Controllers
{
    [Authorize]    
    [ApiController]
    public class UserController : BaseController
    {
        private IUserService _userService;
        private readonly IConfiguration _configuration;

        public UserController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        //[ActionName]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserVeiwModel registerModel)
        {
            if (registerModel == null)
            { return BadRequest("Invalid client request"); }
            try { }
            catch (HttpRequestException)
            { return BadRequest("Cannot connect to the IoT server."); }
            catch (Exception)
            {
                return BadRequest("Cannot register");
            }
            if (registerModel != null)
            {
                var newUser = await _userService.Register(registerModel);
                if (newUser != null)
                    return Success(new UserTokenModel { User = newUser, Token = GetToken(newUser) });
            }
            //else
            //{
            return BadRequest(new { message = "You must enter all fields to complete the registration" });
            //}
            
                
        }
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody]UserViewModel userParam)
        {
            var user = await _userService.Authenticate(userParam.UserName, userParam.UserPassword);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });
            //user.UserPassword = GetToken(user);
            return Success(new UserTokenModel { User = user, Token = GetToken(user) });
            
        }


        [AllowAnonymous]
        [HttpGet("users")]
        public async Task<IActionResult> AllUsers()
        {
            var users = await _userService.GetAllUsers();
            return Success(users);
        }
        private string GetToken(UserViewModel user)
        {
            var JWTSecret = _configuration["ApplicationSettings:JWT_Secret"].ToString();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim("UserName", user.UserName.ToString())
                }),

                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWTSecret)), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(securityToken);
        }
    }

    public class UserTokenModel
    {
        public string Token { get; set; }
        public UserViewModel User { get; set; }
    }
}
