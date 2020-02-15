using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;


using ServiceApp.BLL.Services;
using ServiceApp.BLL.Interfaces;
using ServiceApp.BLL.DTO;

namespace ServiceApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        private IUserRegisterService _register;
        private readonly IConfiguration _configuration;

        public UserController(IUserService userServisce, IConfiguration configuration,
            IUserRegisterService registerService )
        {
            _userService = userServisce;
            _configuration = configuration;
            _register = registerService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody]UserViewModel userParam)
        {
            var user = await _userService.Authenticate(userParam.UserName, userParam.UserPassword);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(new UserTokenModel { User = user, Token = GetToken(user) });
        }

        [AllowAnonymous]
        [HttpGet("authenticateByToken")]
        public async Task<IActionResult> AuthenticateByToken([FromHeader] byte[] token)
        {
            var user = await _userService.AuthenticateByToken(token);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(new UserTokenModel { User = user, Token = GetToken(user) });
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> AllUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
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
        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]RegisterUserVeiwModel userDto)
        {
            // map dto to entity
            var user = _register.CreateUser(userDto);

            if (user == null)
                return BadRequest(new { message = "You must enter all fields to complete the registration" });
            return Ok();
        }
    }
    public class UserTokenModel
    {
        public string Token { get; set; }
        public UserViewModel User { get; set; }
    }
}
