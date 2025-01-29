using AutoMapper;
using FluentAssertions;
using LibrarySystem.Controllers;
using LibrarySystem.Model;
using LibrarySystem.Model.DTO.Book;
using LibrarySystem.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using Moq;


namespace LibrarySystemTest
{
    public class BookControllerTests
    {
         private readonly Mock<IBookRepository> _mockRepo;
         private readonly Mock<IMapper> _mockMapper;
         private readonly BookController _controller;

         public BookControllerTests()
         {
             _mockRepo = new Mock<IBookRepository>();
             _mockMapper = new Mock<IMapper>();
             _controller = new BookController(_mockRepo.Object, _mockMapper.Object);
         }

         // ✅ Test: Obtener todos los libros devuelve 200 OK con lista de libros
         [Fact]
         public void GetBooks_ReturnsOk_WithListOfBooks()
         {
             // Arrange
             var books = new List<Book>
             {
                 new Book { Id = 1, Title = "Libro A", Author = "Autor A", ISBN = "123", Genre = "Ficción", Year = 2020, Quantity = 10 },
                 new Book { Id = 2, Title = "Libro B", Author = "Autor B", ISBN = "456", Genre = "No Ficción", Year = 2019, Quantity = 5 }
             };

             var bookDTOs = books.Select(b => new GetBookDTO { Id = b.Id, Title = b.Title, Author = b.Author, ISBN = b.ISBN, Genre = b.Genre, Year = b.Year }).ToList();

             _mockRepo.Setup(repo => repo.GetBooks()).Returns(books);
             _mockMapper.Setup(m => m.Map<ICollection<GetBookDTO>>(books)).Returns(bookDTOs);

             // Act
             var result = _controller.GetBooks();

             // Assert
             result.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);
             var okResult = result as OkObjectResult;
             okResult.Value.Should().BeEquivalentTo(bookDTOs);
         }

         // ✅ Test: Obtener un libro por ID devuelve 200 OK cuando existe
         [Fact]
         public void GetBookById_ReturnsOk_WhenBookExists()
         {
             // Arrange
             var book = new Book { Id = 1, Title = "Libro A", Author = "Autor A", ISBN = "123", Genre = "Ficción", Year = 2020, Quantity = 10 };
             var bookDTO = new GetBookDTO { Id = 1, Title = "Libro A", Author = "Autor A", ISBN = "123", Genre = "Ficción", Year = 2020 };

             _mockRepo.Setup(repo => repo.GetBook(1)).Returns(book);
             _mockMapper.Setup(m => m.Map<GetBookDTO>(book)).Returns(bookDTO);

             // Act
             var result = _controller.GetBookById(1);

             // Assert
             result.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);
         }

         // ✅ Test: Obtener un libro por ID devuelve 404 Not Found cuando no existe
         [Fact]
         public void GetBookById_ReturnsNotFound_WhenBookDoesNotExist()
         {
             // Arrange
             _mockRepo.Setup(repo => repo.GetBook(It.IsAny<int>())).Returns((Book)null);

             // Act
             var result = _controller.GetBookById(99);

             // Assert
             result.Should().BeOfType<NotFoundResult>().Which.StatusCode.Should().Be(404);
         }

         // ✅ Test: Crear un libro devuelve 201 Created cuando es exitoso
         [Fact]
         public void CreateBook_ReturnsCreated_WhenSuccessful()
         {
             // Arrange
             var bookDTO = new BookDTO { Title = "Libro A", Author = "Autor A", ISBN = "123", Genre = "Ficción", Year = 2020, Quantity = 10 };
             var book = new Book { Id = 1, Title = "Libro A", Author = "Autor A", ISBN = "123", Genre = "Ficción", Year = 2020, Quantity = 10 };

             _mockRepo.Setup(repo => repo.ExistsBook(bookDTO.ISBN)).Returns(false);
             _mockMapper.Setup(m => m.Map<Book>(bookDTO)).Returns(book);
             _mockRepo.Setup(repo => repo.CreateBook(book)).Returns(true);

             // Act
             var result = _controller.CreateBook(bookDTO);

             // Assert
             result.Should().BeOfType<CreatedAtRouteResult>().Which.StatusCode.Should().Be(201);
         }

         // ✅ Test: Crear un libro devuelve 400 Bad Request si el DTO es nulo
         [Fact]
         public void CreateBook_ReturnsBadRequest_WhenModelIsInvalid()
         {
             // Act
             var result = _controller.CreateBook(null);

             // Assert
             result.Should().BeOfType<BadRequestObjectResult>().Which.StatusCode.Should().Be(400);
         }

         // ✅ Test: Actualizar un libro devuelve 204 No Content cuando es exitoso
         [Fact]
         public void UpdateBook_ReturnsNoContent_WhenSuccessful()
         {
             // Arrange
             var bookDTO = new BookDTO { Title = "Libro Editado", Author = "Autor A", ISBN = "123", Genre = "Ficción", Year = 2022, Quantity = 5 };
             var book = new Book { Id = 1, Title = "Libro A", Author = "Autor A", ISBN = "123", Genre = "Ficción", Year = 2020, Quantity = 10 };

             _mockRepo.Setup(repo => repo.ExistsBook(1)).Returns(true);
             _mockRepo.Setup(repo => repo.GetBook(1)).Returns(book);
             _mockRepo.Setup(repo => repo.UpdateBook(book)).Returns(true);

             // Act
             var result = _controller.UpdateBook(1, bookDTO);

             // Assert
             result.Should().BeOfType<NoContentResult>().Which.StatusCode.Should().Be(204);
         }

         // ✅ Test: Eliminar un libro devuelve 204 No Content cuando es exitoso
         [Fact]
         public void DeleteBook_ReturnsNoContent_WhenSuccessful()
         {
             // Arrange
             var book = new Book { Id = 1, Title = "Libro A", Author = "Autor A", ISBN = "123", Genre = "Ficción", Year = 2020, Quantity = 10 };

             _mockRepo.Setup(repo => repo.ExistsBook(1)).Returns(true);
             _mockRepo.Setup(repo => repo.GetBook(1)).Returns(book);
             _mockRepo.Setup(repo => repo.DeleteBook(book)).Returns(true);

             // Act
             var result = _controller.DeleteBook(1);

             // Assert
             result.Should().BeOfType<NoContentResult>().Which.StatusCode.Should().Be(204);
         }

         // ✅ Test: Eliminar un libro devuelve 404 Not Found si no existe
         [Fact]
         public void DeleteBook_ReturnsNotFound_WhenBookDoesNotExist()
         {
             // Arrange
             _mockRepo.Setup(repo => repo.ExistsBook(It.IsAny<int>())).Returns(false);

             // Act
             var result = _controller.DeleteBook(1);

             // Assert
             result.Should().BeOfType<NotFoundResult>().Which.StatusCode.Should().Be(404);
         }
     }
    }
