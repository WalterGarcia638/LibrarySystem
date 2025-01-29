using AutoMapper;
using LibrarySystem.Model.DTO.Book;
using LibrarySystem.Model;
using LibrarySystem.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibrarySystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;

        public BookController(IBookRepository bookRepository, IMapper mapper)
        {
            _bookRepository = bookRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetBooks()
        {
            var bookList = _bookRepository.GetBooks();
            var bookDTOList = _mapper.Map<ICollection<GetBookDTO>>(bookList);

            return Ok(bookDTOList);
        }

        [HttpGet("{id:int}", Name = "GetBookById")]
        public IActionResult GetBookById(int id)
        {
            var book = _bookRepository.GetBook(id);
            if (book == null) return NotFound();

            var bookDTO = _mapper.Map<GetBookDTO>(book);
            return Ok(bookDTO);
        }

        [HttpGet("ISBN/{isbn}", Name = "GetBookByISBN")]
        public IActionResult GetBookByISBN(string isbn)
        {
            var book = _bookRepository.GetBookByISBN(isbn);
            if (book == null) return NotFound();

            var bookDTO = _mapper.Map<GetBookDTO>(book);
            return Ok(bookDTO);
        }

        [HttpGet("search")]
        public IActionResult SearchBooks([FromQuery] string? title, [FromQuery] string? author, [FromQuery] string? genre, string? isbn)
        {
            var books = _bookRepository.GetBooks();

            if (!string.IsNullOrEmpty(title))
            {
                books = books.Where(b => b.Title.ToLower().Contains(title.ToLower())).ToList();
            }

            if (!string.IsNullOrEmpty(author))
            {
                books = books.Where(b => b.Author.ToLower().Contains(author.ToLower())).ToList();
            }

            if (!string.IsNullOrEmpty(genre))
            {
                books = books.Where(b => b.Genre.ToLower().Contains(genre.ToLower())).ToList();
            }

            if (!string.IsNullOrEmpty(isbn))
            {
                books = books.Where(b => b.ISBN.ToLower().Contains(isbn.ToLower())).ToList();
            }

            var bookDTOs = _mapper.Map<ICollection<GetBookDTO>>(books);

            return Ok(bookDTOs);
        }

        [HttpPost]
        public IActionResult CreateBook([FromBody] BookDTO bookDTO)
        {
            if (bookDTO == null) return BadRequest(ModelState);

            if (_bookRepository.ExistsBook(bookDTO.ISBN))
            {
                ModelState.AddModelError("", "El libro con este ISBN ya existe.");
                return StatusCode(409, ModelState);
            }

            var book = _mapper.Map<Book>(bookDTO);

            if (!_bookRepository.CreateBook(book))
            {
                ModelState.AddModelError("", $"Algo salió mal al guardar el libro {book.Title}");
                return StatusCode(500, ModelState);
            }

            return CreatedAtRoute("GetBookById", new { id = book.Id }, book);
        }

        [HttpPut("{id:int}", Name = "UpdateBook")]
        public IActionResult UpdateBook(int id, [FromBody] BookDTO bookDTO)
        {
            if (bookDTO == null || id <= 0)
                return BadRequest(ModelState);

            if (!_bookRepository.ExistsBook(id))
                return NotFound();

            var book = _bookRepository.GetBook(id);

            book.Title = bookDTO.Title;
            book.Author = bookDTO.Author;
            book.ISBN = bookDTO.ISBN;
            book.Genre = bookDTO.Genre;
            book.Year = bookDTO.Year;
            book.Quantity = bookDTO.Quantity;

            if (!_bookRepository.UpdateBook(book))
            {
                ModelState.AddModelError("", $"Algo salió mal al actualizar el libro {book.Title}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{id:int}", Name = "DeleteBook")]
        public IActionResult DeleteBook(int id)
        {
            if (!_bookRepository.ExistsBook(id))
                return NotFound();

            var book = _bookRepository.GetBook(id);

            if (!_bookRepository.DeleteBook(book))
            {
                ModelState.AddModelError("", $"Algo salió mal al eliminar el libro {book.Title}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}
