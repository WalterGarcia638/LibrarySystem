/*import React, { useEffect, useState } from 'react';
import { bookService } from '../bookService';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const data = await bookService.getBooks();
      setBooks(data);
    } catch (err) {
      console.error('Error fetching books', err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Catálogo de Libros</h2>
      <Link to="/books/create">Agregar Nuevo Libro</Link>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} - {book.author} 
            <Link to={`/books/edit/${book.id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;*/

import React, { useEffect, useState } from 'react';
import { bookService } from '../bookService';
import { useNavigate, Link } from 'react-router-dom';

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
      // Creamos el query string según el tipo
      let query = '';
      if (searchType === 'title') {
        query = `?title=${searchValue}`;
      } else if (searchType === 'author') {
        query = `?author=${searchValue}`;
      } else if (searchType === 'isbn') {
        query = `?isbn=${searchValue}`;
      } else if (searchType === 'genre') {
        query = `?genre=${searchValue}`;
      }

      const results = await bookService.searchBooks(query);
      setBooks(results);
    } catch (err) {
      alert('Error buscando libros');
      console.error(err);
    }
  };

  // Eliminar un libro
  const handleDelete = async (bookId) => {
    if (!window.confirm('¿Seguro que deseas eliminar este libro?')) return;
    try {
      await bookService.deleteBook(bookId);
      alert('Libro eliminado');
      fetchBooks(); // recarga la lista
    } catch (err) {
      alert('Error al eliminar libro');
    }
  };

  return (
    <div>
      <h2>Catálogo de Libros</h2>

      {/* Barra de Búsqueda */}
      <div style={{ marginBottom: '1rem' }}>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          style={{ marginRight: '8px' }}
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
          style={{ marginRight: '8px' }}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {/* Botón para crear un nuevo libro */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => navigate('/books/create')}>
          Agregar Nuevo Libro
        </button>
      </div>

      {/* Tabla de Libros */}
      <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
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
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.isbn}</td>
              <td>{b.genre}</td>
              <td>{b.year}</td>
              <td>{b.quantity}</td>
              <td>
                {/* Editar -> /books/edit/:id */}
                <Link to={`/books/edit/${b.id}`} style={{ marginRight: '8px' }}>
                  Editar
                </Link>
                {/* Eliminar */}
                <button onClick={() => handleDelete(b.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
