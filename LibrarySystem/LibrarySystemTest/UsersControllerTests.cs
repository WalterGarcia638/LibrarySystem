using LibrarySystem.Controllers;
using LibrarySystem.Model.DTO.User;
using LibrarySystem.Model;
using LibrarySystem.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;

namespace LibrarySystemTest
{
    public class UsersControllerTests
    {
        private readonly Mock<IUserRepository> _mockRepo;
        private readonly UsersController _controller;

        public UsersControllerTests()
        {
            _mockRepo = new Mock<IUserRepository>();
            _controller = new UsersController(_mockRepo.Object);
        }

        // ✅ Test: Obtener todos los usuarios devuelve 200 OK con lista de usuarios
        [Fact]
        public void GetUsers_ReturnsOk_WithListOfUsers()
        {
            // Arrange
            var users = new List<Users>
            {
                new Users { Id = 1, Username = "jperez", Name = "Juan Pérez", Role = "User" },
                new Users { Id = 2, Username = "mlopez", Name = "María López", Role = "Admin" }
            };

            _mockRepo.Setup(repo => repo.GetUsers()).Returns(users);

            // Act
            var result = _controller.GetUsers();

            // Assert
            result.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);
            var okResult = result as OkObjectResult;
            okResult.Value.Should().BeEquivalentTo(users);
        }

        // ✅ Test: Obtener un usuario por ID devuelve 200 OK si existe
        [Fact]
        public void GetUser_ReturnsOk_WhenUserExists()
        {
            // Arrange
            var user = new Users { Id = 1, Username = "jperez", Name = "Juan Pérez", Role = "User" };
            _mockRepo.Setup(repo => repo.GetUser(1)).Returns(user);

            // Act
            var result = _controller.GetUser(1);

            // Assert
            result.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);
            var okResult = result as OkObjectResult;
            okResult.Value.Should().BeEquivalentTo(user);
        }

        // ✅ Test: Obtener un usuario por ID devuelve 404 Not Found si no existe
        [Fact]
        public void GetUser_ReturnsNotFound_WhenUserDoesNotExist()
        {
            // Arrange
            _mockRepo.Setup(repo => repo.GetUser(It.IsAny<int>())).Returns((Users)null);

            // Act
            var result = _controller.GetUser(99);

            // Assert
            result.Should().BeOfType<NotFoundResult>().Which.StatusCode.Should().Be(404);
        }

        // ✅ Test: Actualizar usuario devuelve 204 No Content cuando es exitoso
        [Fact]
        public void UpdateUser_ReturnsNoContent_WhenSuccessful()
        {
            // Arrange
            var user = new Users { Id = 1, Username = "jperez", Name = "Juan Pérez", Password = "12345", Role = "User" };
            var updatedDto = new UpdateUserDTO { Username = "newuser", Name = "Juan Actualizado", Password = "54321", Role = "Admin" };

            _mockRepo.Setup(repo => repo.GetUser(1)).Returns(user);
            _mockRepo.Setup(repo => repo.UpdateUser(It.IsAny<Users>())).Returns(true);

            // Act
            var result = _controller.UpdateUser(1, updatedDto);

            // Assert
            result.Should().BeOfType<NoContentResult>().Which.StatusCode.Should().Be(204);
        }

        // ✅ Test: Actualizar usuario devuelve 404 Not Found si no existe
        [Fact]
        public void UpdateUser_ReturnsNotFound_WhenUserDoesNotExist()
        {
            // Arrange
            var updatedDto = new UpdateUserDTO { Username = "newuser", Name = "Juan Actualizado", Password = "54321", Role = "Admin" };
            _mockRepo.Setup(repo => repo.GetUser(It.IsAny<int>())).Returns((Users)null);

            // Act
            var result = _controller.UpdateUser(99, updatedDto);

            // Assert
            result.Should().BeOfType<NotFoundResult>().Which.StatusCode.Should().Be(404);
        }

        // ✅ Test: Actualizar usuario devuelve 400 Bad Request si el DTO es nulo
        [Fact]
        public void UpdateUser_ReturnsBadRequest_WhenDtoIsNull()
        {
            // Act
            var result = _controller.UpdateUser(1, null);

            // Assert
            result.Should().BeOfType<BadRequestResult>().Which.StatusCode.Should().Be(400);
        }

        // ✅ Test: Eliminar usuario devuelve 204 No Content cuando es exitoso
        [Fact]
        public void DeleteUser_ReturnsNoContent_WhenSuccessful()
        {
            // Arrange
            var user = new Users { Id = 1, Username = "jperez", Name = "Juan Pérez", Role = "User" };

            _mockRepo.Setup(repo => repo.GetUser(1)).Returns(user);
            _mockRepo.Setup(repo => repo.DeleteUser(user)).Returns(true);

            // Act
            var result = _controller.DeleteUser(1);

            // Assert
            result.Should().BeOfType<NoContentResult>().Which.StatusCode.Should().Be(204);
        }

        // ✅ Test: Eliminar usuario devuelve 404 Not Found si no existe
        [Fact]
        public void DeleteUser_ReturnsNotFound_WhenUserDoesNotExist()
        {
            // Arrange
            _mockRepo.Setup(repo => repo.GetUser(It.IsAny<int>())).Returns((Users)null);

            // Act
            var result = _controller.DeleteUser(99);

            // Assert
            result.Should().BeOfType<NotFoundResult>().Which.StatusCode.Should().Be(404);
        }
    }
}