import React, { useEffect, useState } from 'react';
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

export default BookList;
