using LibrarySystem.Data;
using LibrarySystem.Model;
using LibrarySystem.Repository.IRepository;

namespace LibrarySystem.Repository
{
    public class BookRepository : IBookRepository
    {
        private readonly ApplicationDbContext _db;
        public BookRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public ICollection<Book> GetBooks()
        {
            return _db.Book
                .OrderBy(b => b.Id)
                .ToList();
        }

        public Book GetBook(int id)
        {
            return _db.Book.FirstOrDefault(b => b.Id == id);
        }

        public Book GetBookByISBN(string isbn)
        {
            return _db.Book.FirstOrDefault(b => b.ISBN.ToLower().Trim() == isbn.ToLower().Trim());
        }

        public ICollection<Book> GetBooksByTitle(string title)
        {
            return _db.Book
                .Where(b => b.Title.ToLower().Contains(title.ToLower().Trim()))
                .ToList();
        }

        public ICollection<Book> GetBooksByAuthor(string author)
        {
            return _db.Book
                .Where(b => b.Author.ToLower().Contains(author.ToLower().Trim()))
                .ToList();
        }

        public ICollection<Book> GetBooksByGenre(string genre)
        {
            return _db.Book
                .Where(b => b.Genre.ToLower().Contains(genre.ToLower().Trim()))
                .ToList();
        }

        public bool ExistsBook(int id)
        {
            return _db.Book.Any(b => b.Id == id);
        }

        public bool ExistsBook(string isbn)
        {
            return _db.Book.Any(b => b.ISBN.ToLower().Trim() == isbn.ToLower().Trim());
        }

        public bool CreateBook(Book book)
        {
            book.AvailableCopies = book.Quantity;
            _db.Book.Add(book);
            return Save();
        }

        public bool UpdateBook(Book book)
        {
            _db.Book.Update(book);
            return Save();
        }

        public bool DeleteBook(Book book)
        {
            _db.Book.Remove(book);
            return Save();
        }

        public bool Save()
        {
            return _db.SaveChanges() >= 0;
        }
    }
}
