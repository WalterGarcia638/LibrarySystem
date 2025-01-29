using LibrarySystem.Model;
using LibrarySystem.Model.DTO.User;
using LibrarySystem.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibrarySystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepo;

        public UsersController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _userRepo.GetUsers();
            return Ok(users);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetUser(int id)
        {
            var user = _userRepo.GetUser(id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPut("{id:int}")]
        public IActionResult UpdateUser(int id, [FromBody] UpdateUserDTO updatedDto)
        {
            if (updatedDto == null)
                return BadRequest();

            var userFromDb = _userRepo.GetUser(id);
            if (userFromDb == null)
                return NotFound();

            userFromDb.Username = updatedDto.Username ?? userFromDb.Username;
            userFromDb.Name = updatedDto.Name ?? userFromDb.Name;

            if (!string.IsNullOrWhiteSpace(updatedDto.Password))
            {
                userFromDb.Password = updatedDto.Password;
            }

            userFromDb.Role = updatedDto.Role ?? userFromDb.Role;

            if (!_userRepo.UpdateUser(userFromDb))
            {
                ModelState.AddModelError("", "Error al actualizar el usuario");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }


        [HttpDelete("{id:int}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _userRepo.GetUser(id);
            if (user == null)
            {
                return NotFound();
            }

            if (!_userRepo.DeleteUser(user))
            {
                ModelState.AddModelError("", "Error al eliminar el usuario");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}