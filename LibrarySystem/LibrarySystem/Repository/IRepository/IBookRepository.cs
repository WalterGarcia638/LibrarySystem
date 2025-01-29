using LibrarySystem.Model;

namespace LibrarySystem.Repository.IRepository
{
    public interface IBookRepository
    {
        ICollection<Book> GetBooks();
        Book GetBook(int id);
        Book GetBookByISBN(string isbn);
        ICollection<Book> GetBooksByTitle(string title);
        ICollection<Book> GetBooksByAuthor(string author);
        ICollection<Book> GetBooksByGenre(string genre);

        bool ExistsBook(int id);
        bool ExistsBook(string isbn);

        bool CreateBook(Book book);
        bool UpdateBook(Book book);
        bool DeleteBook(Book book);

        bool Save();
    }
}
