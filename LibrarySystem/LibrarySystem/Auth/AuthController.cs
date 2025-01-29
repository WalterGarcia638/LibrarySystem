using LibrarySystem.Data;
using LibrarySystem.Model;
using LibrarySystem.Model.Request;
using LibrarySystem.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LibrarySystem.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;

        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("El nombre de usuario y la contraseña son obligatorios.");
            }

            var user = _authRepository.ValidateUser(request.Username, request.Password);
            if (user == null)
            {
                return Unauthorized("Usuario o contraseña incorrectos.");
            }

            var token = _authRepository.GenerateJwtToken(user);
            return Ok(new { token });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] Users newUser)
        {
            if (newUser == null)
            {
                return BadRequest(new { message = "El cuerpo de la solicitud no puede estar vacío." });
            }

            if (string.IsNullOrWhiteSpace(newUser.Username) || string.IsNullOrWhiteSpace(newUser.Password))
            {
                return BadRequest(new { message = "El nombre de usuario y la contraseña son obligatorios." });
            }

            if (_authRepository.UserExists(newUser.Username))
            {
                return BadRequest(new { message = "El usuario ya existe." });
            }

            _authRepository.CreateUser(newUser);

            if (!_authRepository.Save())
            {
                return StatusCode(500, new { message = "Error guardando el usuario en la base de datos." });
            }

            return Ok(new { message = "Usuario registrado exitosamente." });
        }
    }
}