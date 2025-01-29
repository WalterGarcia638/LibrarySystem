/*import React, { useState } from 'react';
import { loanService } from '../loanService';
import { useNavigate } from 'react-router-dom';

const LoanCreate = () => {
  const [form, setForm] = useState({
    bookId: '',
    userId: '',
    loanDate: '',
    returnDate: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loanService.createLoan(form);
      alert('Préstamo creado');
      navigate('/loans');
    } catch (err) {
      alert('Error creando préstamo');
    }
  };

  return (
    <div>
      <h2>Crear Préstamo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID Libro:
          <input name="bookId" value={form.bookId} onChange={handleChange} />
        </label>
        <label>
          ID Usuario:
          <input name="userId" value={form.userId} onChange={handleChange} />
        </label>
        <label>
          Fecha Préstamo:
          <input type="date" name="loanDate" value={form.loanDate} onChange={handleChange} />
        </label>
        <label>
          Fecha Devolución:
          <input type="date" name="returnDate" value={form.returnDate} onChange={handleChange} />
        </label>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default LoanCreate;*/

/*import React, { useState, useEffect } from 'react';
import { loanService } from '../loanService';
import { bookService } from '../../books/bookService';
import { userService } from '../../users/userService';
import { useNavigate } from 'react-router-dom';

const LoanCreate = () => {
  const [form, setForm] = useState({
    bookId: '',
    userId: '',
    loanDate: '',
    returnDate: '',
  });

  // Estados para cargar la lista de libros y usuarios
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  // 1. Cargar libros y usuarios cuando el componente se monte
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener todos los libros
        const bookData = await bookService.getBooks();
        setBooks(bookData);

        // Obtener todos los usuarios
        const userData = await userService.getUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Error al cargar libros/usuarios:', error);
      }
    };
    fetchData();
  }, []);

  // Manejo de cambios
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loanService.createLoan(form);
      alert('Préstamo creado');
      navigate('/loans');
    } catch (err) {
      alert('Error creando préstamo');
    }
  };

  return (
    <div>
      <h2>Crear Préstamo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Libro: </label>
          <select name="bookId" value={form.bookId} onChange={handleChange}>
            <option value="">-- Selecciona un libro --</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} (ID: {book.id})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Usuario: </label>
          <select name="userId" value={form.userId} onChange={handleChange}>
            <option value="">-- Selecciona un usuario --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} (ID: {user.id})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Fecha Préstamo: </label>
          <input
            type="date"
            name="loanDate"
            value={form.loanDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Fecha Devolución: </label>
          <input
            type="date"
            name="returnDate"
            value={form.returnDate}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default LoanCreate;*/

import React, { useState, useEffect } from 'react';
import { loanService } from '../loanService';
import { bookService } from '../../books/bookService';
import { userService } from '../../users/userService';
import { useNavigate } from 'react-router-dom';

const LoanCreate = () => {
  const [form, setForm] = useState({
    bookId: '',
    userId: '',
    loanDate: '',
    returnDate: '',
  });

  // Estados para cargar la lista de libros y usuarios
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  // 1. Cargar libros y usuarios cuando el componente se monte
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener todos los libros
        const bookData = await bookService.getBooks();
        setBooks(bookData);

        // Obtener todos los usuarios
        const userData = await userService.getUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Error al cargar libros/usuarios:', error);
        alert('Error al cargar libros o usuarios.');
      }
    };
    fetchData();
  }, []);

  // Manejo de cambios
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validación de campos requeridos antes de enviar
  const validateForm = () => {
    if (!form.bookId) {
      alert('Debes seleccionar un libro.');
      return false;
    }
    if (!form.userId) {
      alert('Debes seleccionar un usuario.');
      return false;
    }
    if (!form.loanDate) {
      alert('La fecha de préstamo es obligatoria.');
      return false;
    }
    if (!form.returnDate) {
      alert('La fecha de devolución es obligatoria.');
      return false;
    }
    return true;
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos
    if (!validateForm()) {
      return;
    }

    try {
      // Llama al servicio
      const response = await loanService.createLoan(form);
      alert(response.message || 'Préstamo creado');
      navigate('/loans');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert('Error creando préstamo');
      }
    }
  };

  return (
    <div>
      <h2>Crear Préstamo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Libro: </label>
          <select name="bookId" value={form.bookId} onChange={handleChange}>
            <option value="">-- Selecciona un libro --</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} (ID: {book.id})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Usuario: </label>
          <select name="userId" value={form.userId} onChange={handleChange}>
            <option value="">-- Selecciona un usuario --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} (ID: {user.id})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Fecha Préstamo: </label>
          <input
            type="date"
            name="loanDate"
            value={form.loanDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Fecha Devolución: </label>
          <input
            type="date"
            name="returnDate"
            value={form.returnDate}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default LoanCreate;
