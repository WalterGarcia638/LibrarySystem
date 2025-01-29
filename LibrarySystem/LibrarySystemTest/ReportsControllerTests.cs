using FluentAssertions;
using LibrarySystem.Controllers;
using LibrarySystem.Model;
using LibrarySystem.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibrarySystemTest
{
    public class ReportsControllerTests
    {
        private readonly Mock<IReportRepository> _mockRepo;
        private readonly ReportsController _controller;

        public ReportsControllerTests()
        {
            _mockRepo = new Mock<IReportRepository>();
            _controller = new ReportsController(_mockRepo.Object);
        }

        // ✅ Test: Obtener préstamos por periodo devuelve 200 OK con lista de préstamos
        [Fact]
        public void GetLoansByPeriod_ReturnsOk_WithListOfLoans()
        {
            // Arrange
            var start = new DateTime(2023, 1, 1);
            var end = new DateTime(2023, 12, 31);
            var loans = new List<Loan>
            {
                new Loan
                {
                    Id = 1,
                    BookId = 1,
                    UserId = 1,
                    LoanDate = DateTime.Now,
                    ReturnDate = DateTime.Now.AddDays(7),
                    ActualReturnDate = null,
                    Fine = 0,
                    Book = new Book { Id = 1, Title = "Cien Años de Soledad" },
                    User = new Users { Id = 1, Name = "Juan Pérez" }
                },
                new Loan
                {
                    Id = 2,
                    BookId = 2,
                    UserId = 2,
                    LoanDate = DateTime.Now,
                    ReturnDate = DateTime.Now.AddDays(14),
                    ActualReturnDate = null,
                    Fine = 5.50,
                    Book = new Book { Id = 2, Title = "Don Quijote" },
                    User = new Users { Id = 2, Name = "María López" }
                }
            };

            _mockRepo.Setup(repo => repo.GetLoansByPeriod(start, end)).Returns(loans);

            // Act
            var result = _controller.GetLoansByPeriod(start, end);

            // Assert
            result.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);
            var okResult = result as OkObjectResult;
            okResult.Value.Should().BeEquivalentTo(loans);
        }

        // ✅ Test: Obtener préstamos por periodo devuelve 400 Bad Request si las fechas no son válidas
        [Fact]
        public void GetLoansByPeriod_ReturnsBadRequest_WhenDatesAreInvalid()
        {
            // Arrange
            var start = default(DateTime);
            var end = default(DateTime);

            // Act
            var result = _controller.GetLoansByPeriod(start, end);

            // Assert
            result.Should().BeOfType<BadRequestObjectResult>().Which.StatusCode.Should().Be(400);
            var badRequestResult = result as BadRequestObjectResult;
            badRequestResult.Value.Should().BeEquivalentTo(new { message = "Debe proporcionar fechas válidas (start, end)." });
        }

        // ✅ Test: Obtener usuarios con multas pendientes devuelve 200 OK con lista de usuarios
        [Fact]
        public void GetUsersWithPendingFines_ReturnsOk_WithListOfUsers()
        {
            // Arrange
            var users = new List<Users>
            {
                new Users { Id = 1, Name = "Juan Pérez", Username = "jperez", Role = "User" },
                new Users { Id = 2, Name = "María López", Username = "mlopez", Role = "User" }
            };

            _mockRepo.Setup(repo => repo.GetUsersWithPendingFines()).Returns(users);

            // Act
            var result = _controller.GetUsersWithPendingFines();

            // Assert
            result.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);
            var okResult = result as OkObjectResult;
            okResult.Value.Should().BeEquivalentTo(users);
        }

        // ✅ Test: Obtener usuarios con multas pendientes devuelve 200 OK con lista vacía si no hay multas
        [Fact]
        public void GetUsersWithPendingFines_ReturnsOk_WithEmptyList_WhenNoFines()
        {
            // Arrange
            var users = new List<Users>(); // Lista vacía

            _mockRepo.Setup(repo => repo.GetUsersWithPendingFines()).Returns(users);

            // Act
            var result = _controller.GetUsersWithPendingFines();

            // Assert
            result.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);
            var okResult = result as OkObjectResult;
            okResult.Value.Should().BeEquivalentTo(users);
        }
    }
}