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

        // GET: api/Book
        [HttpGet]
        public IActionResult GetBooks()
        {
            var bookList = _bookRepository.GetBooks();
            var bookDTOList = _mapper.Map<ICollection<GetBookDTO>>(bookList);

            return Ok(bookDTOList);
        }

        // GET: api/Book/5
        [HttpGet("{id:int}", Name = "GetBookById")]
        public IActionResult GetBookById(int id)
        {
            var book = _bookRepository.GetBook(id);
            if (book == null) return NotFound();

            var bookDTO = _mapper.Map<GetBookDTO>(book);
            return Ok(bookDTO);
        }

        // GET: api/Book/ISBN/xxxx
        [HttpGet("ISBN/{isbn}", Name = "GetBookByISBN")]
        public IActionResult GetBookByISBN(string isbn)
        {
            var book = _bookRepository.GetBookByISBN(isbn);
            if (book == null) return NotFound();

            var bookDTO = _mapper.Map<GetBookDTO>(book);
            return Ok(bookDTO);
        }

        // GET: api/Book/search?title=...&author=...
        // Ejemplo de endpoint para filtrar por distintos campos.
        // Puedes separar endpoints si lo prefieres.
        [HttpGet("search")]
        public IActionResult SearchBooks([FromQuery] string? title, [FromQuery] string? author, [FromQuery] string? genre, string? isbn)
        {
            var books = _bookRepository.GetBooks(); // Obtiene todos los libros inicialmente

            // Filtra por título si se proporciona
            if (!string.IsNullOrEmpty(title))
            {
                books = books.Where(b => b.Title.ToLower().Contains(title.ToLower())).ToList();
            }

            // Filtra por autor si se proporciona
            if (!string.IsNullOrEmpty(author))
            {
                books = books.Where(b => b.Author.ToLower().Contains(author.ToLower())).ToList();
            }

            // Filtra por género si se proporciona
            if (!string.IsNullOrEmpty(genre))
            {
                books = books.Where(b => b.Genre.ToLower().Contains(genre.ToLower())).ToList();
            }

            if (!string.IsNullOrEmpty(isbn))
            {
                books = books.Where(b => b.ISBN.ToLower().Contains(isbn.ToLower())).ToList();
            }


            // Mapea los resultados a los DTOs
            var bookDTOs = _mapper.Map<ICollection<GetBookDTO>>(books);

            return Ok(bookDTOs);
        }


        // POST: api/Book
        [HttpPost]
        public IActionResult CreateBook([FromBody] BookDTO bookDTO)
        {
            if (bookDTO == null) return BadRequest(ModelState);

            // Verificar si ya existe un libro con este ISBN
            if (_bookRepository.ExistsBook(bookDTO.ISBN))
            {
                ModelState.AddModelError("", "El libro con este ISBN ya existe.");
                return StatusCode(409, ModelState); // Conflict
            }

            var book = _mapper.Map<Book>(bookDTO);

            if (!_bookRepository.CreateBook(book))
            {
                ModelState.AddModelError("", $"Algo salió mal al guardar el libro {book.Title}");
                return StatusCode(500, ModelState);
            }

            return CreatedAtRoute("GetBookById", new { id = book.Id }, book);
        }

        // PUT / PATCH: api/Book/5
        // Usa el que prefieras: PUT o PATCH
        [HttpPut("{id:int}", Name = "UpdateBook")]
        public IActionResult UpdateBook(int id, [FromBody] BookDTO bookDTO)
        {
            if (bookDTO == null || id <= 0)
                return BadRequest(ModelState);

            if (!_bookRepository.ExistsBook(id))
                return NotFound();

            var book = _bookRepository.GetBook(id);
            // O puedes mapear directo si quieres
            //var book = _mapper.Map<Book>(bookDTO);
            //book.Id = id;

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

        // DELETE: api/Book/5
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
