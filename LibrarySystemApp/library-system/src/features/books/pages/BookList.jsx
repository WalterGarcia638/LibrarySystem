import React, { useEffect, useState } from 'react';
import { bookService } from '../bookService';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchType, setSearchType] = useState('title'); // 'title', 'author', 'isbn', 'genre'
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const data = await bookService.getBooks();
      setBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Buscar libros
  const handleSearch = async () => {
    try {
      let query = `?${searchType}=${searchValue}`;
      const results = await bookService.searchBooks(query);
      setBooks(results);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error en la búsqueda',
        text: 'No se pudieron encontrar los libros.',
      });
      console.error(err);
    }
  };

  // Eliminar un libro con SweetAlert2
  const handleDelete = async (bookId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el libro permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d9534f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await bookService.deleteBook(bookId);
          Swal.fire({
            icon: 'success',
            title: 'Libro eliminado',
            text: 'El libro ha sido eliminado exitosamente.',
          });
          fetchBooks(); // Recarga la lista
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Error al eliminar',
            text: 'Hubo un problema al eliminar el libro.',
          });
        }
      }
    });
  };

  return (
    <div className="book-list-container">
      <h2 className="book-list-title">Catálogo de Libros</h2>

      {/* Barra de Búsqueda */}
      <div className="book-search-container">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="book-search-select"
        >
          <option value="title">Título</option>
          <option value="author">Autor</option>
          <option value="isbn">ISBN</option>
          <option value="genre">Género</option>
        </select>
        <input
          type="text"
          placeholder={`Buscar por ${searchType}`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="book-search-input"
        />
        <button onClick={handleSearch} className="book-search-button">
          Buscar
        </button>
      </div>

      {/* Botón para crear un nuevo libro */}
      <button
        onClick={() => navigate('/books/create')}
        className="book-add-button"
      >
        Agregar Nuevo Libro
      </button>

      {/* Tabla de Libros */}
      <table className="book-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>ISBN</th>
            <th>Género</th>
            <th>Año</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.isbn}</td>
                <td>{b.genre}</td>
                <td>{b.year}</td>
                <td>{b.quantity}</td>
                <td className="book-action-buttons">
                  <Link to={`/books/edit/${b.id}`} className="book-edit-link">
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="book-delete-button"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', padding: '1rem' }}>
                No hay libros disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
