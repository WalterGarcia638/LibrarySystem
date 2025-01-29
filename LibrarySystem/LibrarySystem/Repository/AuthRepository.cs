using LibrarySystem.Data;
using LibrarySystem.Model;
using LibrarySystem.Repository.IRepository;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LibrarySystem.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthRepository(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public Users GetUserByUsername(string username)
        {
            return _context.Users.FirstOrDefault(u => u.Username == username);
        }

        public bool UserExists(string username)
        {
            return _context.Users.Any(u => u.Username == username);
        }

        public void CreateUser(Users user)
        {
            // Puedes asignar un rol por defecto si no te lo envían
            if (string.IsNullOrWhiteSpace(user.Role))
            {
                user.Role = "User";
            }

            _context.Users.Add(user);
        }

        /// <summary>
        /// Valida credenciales (retorna el usuario si coincide, null si no)
        /// </summary>
        public Users ValidateUser(string username, string password)
        {
            var user = GetUserByUsername(username);
            if (user == null || user.Password != password)
            {
                return null;
            }
            return user;
        }

        /// <summary>
        /// Genera el JWT agregando un claim con el rol
        /// </summary>
        public string GenerateJwtToken(Users user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                // Guardamos el rol en un claim 'role'
                new Claim(ClaimTypes.Role, user.Role ?? "User")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(int.Parse(_configuration["Jwt:ExpiresInMinutes"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public bool Save()
        {
            return _context.SaveChanges() >= 0;
        }
    }
}