using AutoMapper;
using LibrarySystem.Controllers;
using LibrarySystem.Model.DTO.Loan;
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
    public class LoanControllerTests
    {
        private readonly Mock<ILoanRepository> _mockRepo;
        private readonly Mock<IMapper> _mockMapper;
        private readonly LoanController _controller;

        public LoanControllerTests()
        {
            _mockRepo = new Mock<ILoanRepository>();
            _mockMapper = new Mock<IMapper>();
            _controller = new LoanController(_mockRepo.Object, _mockMapper.Object);
        }

        // ✅ Test: Obtener todos los préstamos devuelve 200 OK con lista de préstamos
        [Fact]
        public void GetLoans_ReturnsOk_WithListOfLoans()
        {
            // Arrange
            var loans = new List<Loan>
            {
                new Loan { Id = 1, Book = new Book { Title = "Cien Años de Soledad" }, User = new Users { Name = "Juan Pérez" }, LoanDate = DateTime.Now, ReturnDate = DateTime.Now.AddDays(7), Fine = 0 },
                new Loan { Id = 2, Book = new Book { Title = "Don Quijote" }, User = new Users { Name = "María López" }, LoanDate = DateTime.Now, ReturnDate = DateTime.Now.AddDays(14), Fine = 10 }
            };

            var loanDTOs = new List<GetLoanDTO>
            {
                new GetLoanDTO { Id = 1, BookTitle = "Cien Años de Soledad", UserName = "Juan Pérez", LoanDate = DateTime.Now, ReturnDate = DateTime.Now.AddDays(7), Fine = 0 },
                new GetLoanDTO { Id = 2, BookTitle = "Don Quijote", UserName = "María López", LoanDate = DateTime.Now, ReturnDate = DateTime.Now.AddDays(14), Fine = 10 }
            };

            _mockRepo.Setup(repo => repo.GetLoans()).Returns(loans);
            _mockMapper.Setup(mapper => mapper.Map<ICollection<GetLoanDTO>>(loans)).Returns(loanDTOs);

            // Act
            var result = _controller.GetLoans();

            // Assert
            result.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);
            var okResult = result as OkObjectResult;
            okResult.Value.Should().BeEquivalentTo(loanDTOs);
        }

        // ✅ Test: Obtener un préstamo por ID devuelve 200 OK si existe
        [Fact]
        public void GetLoanById_ReturnsOk_WhenLoanExists()
        {
            // Arrange
            var loan = new Loan { Id = 1, Book = new Book { Title = "Cien Años de Soledad" }, User = new Users { Name = "Juan Pérez" }, LoanDate = DateTime.Now, ReturnDate = DateTime.Now.AddDays(7), Fine = 0 };
            var loanDTO = new GetLoanDTO { Id = 1, BookTitle = "Cien Años de Soledad", UserName = "Juan Pérez", LoanDate = DateTime.Now, ReturnDate = DateTime.Now.AddDays(7), Fine = 0 };

            _mockRepo.Setup(repo => repo.GetLoanById(1)).Returns(loan);
            _mockMapper.Setup(mapper => mapper.Map<GetLoanDTO>(loan)).Returns(loanDTO);

            // Act
            var result = _controller.GetLoanById(1);

            // Assert
            result.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);
        }

        // ✅ Test: Obtener un préstamo por ID devuelve 404 Not Found si no existe
        [Fact]
        public void GetLoanById_ReturnsNotFound_WhenLoanDoesNotExist()
        {
            // Arrange
            _mockRepo.Setup(repo => repo.GetLoanById(It.IsAny<int>())).Returns((Loan)null);

            // Act
            var result = _controller.GetLoanById(99);

            // Assert
            result.Should().BeOfType<NotFoundResult>().Which.StatusCode.Should().Be(404);
        }

        // ✅ Test: Crear un préstamo devuelve 200 OK cuando es exitoso
        [Fact]
        public void CreateLoan_ReturnsOk_WhenSuccessful()
        {
            // Arrange
            var loanDTO = new CreateLoanDTO { BookId = 1, UserId = 1, LoanDate = DateTime.Now, ReturnDate = DateTime.Now.AddDays(7) };
            var loan = new Loan { Id = 1, BookId = 1, UserId = 1, LoanDate = DateTime.Now, ReturnDate = DateTime.Now.AddDays(7) };

            _mockMapper.Setup(mapper => mapper.Map<Loan>(loanDTO)).Returns(loan);
            _mockRepo.Setup(repo => repo.CreateLoan(loan)).Returns(true);

            // Act
            var result = _controller.CreateLoan(loanDTO);

            // Assert
            result.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);
        }

        // ✅ Test: Registrar devolución devuelve 200 OK cuando es exitoso
        [Fact]
        public void RegisterReturn_ReturnsOk_WhenSuccessful()
        {
            // Arrange
            var loan = new Loan { Id = 1, BookId = 1, UserId = 1, LoanDate = DateTime.Now, ReturnDate = DateTime.Now.AddDays(7), Fine = 0 };
            _mockRepo.Setup(repo => repo.RegisterReturn(1)).Returns(true);
            _mockRepo.Setup(repo => repo.GetLoanById(1)).Returns(loan);

            // Act
            var result = _controller.RegisterReturn(1);

            // Assert
            result.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);
        }

        // ✅ Test: Registrar devolución devuelve 400 Bad Request si falla
        [Fact]
        public void RegisterReturn_ReturnsBadRequest_WhenUnsuccessful()
        {
            // Arrange
            _mockRepo.Setup(repo => repo.RegisterReturn(It.IsAny<int>())).Returns(false);

            // Act
            var result = _controller.RegisterReturn(1);

            // Assert
            result.Should().BeOfType<BadRequestObjectResult>().Which.StatusCode.Should().Be(400);
        }

        // ✅ Test: Eliminar préstamo devuelve 204 No Content cuando es exitoso
        [Fact]
        public void DeleteLoan_ReturnsNoContent_WhenSuccessful()
        {
            // Arrange
            var loan = new Loan { Id = 1 };

            _mockRepo.Setup(repo => repo.GetLoanById(1)).Returns(loan);
            _mockRepo.Setup(repo => repo.DeleteLoan(loan)).Returns(true);

            // Act
            var result = _controller.DeleteLoan(1);

            // Assert
            result.Should().BeOfType<NoContentResult>().Which.StatusCode.Should().Be(204);
        }

        // ✅ Test: Eliminar préstamo devuelve 404 Not Found si no existe
        [Fact]
        public void DeleteLoan_ReturnsNotFound_WhenLoanDoesNotExist()
        {
            // Arrange
            _mockRepo.Setup(repo => repo.GetLoanById(It.IsAny<int>())).Returns((Loan)null);

            // Act
            var result = _controller.DeleteLoan(1);

            // Assert
            result.Should().BeOfType<NotFoundResult>().Which.StatusCode.Should().Be(404);
        }
    }
}