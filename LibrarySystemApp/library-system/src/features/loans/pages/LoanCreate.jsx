import React, { useState, useEffect } from 'react';
import { loanService } from '../loanService';
import { bookService } from '../../books/bookService';
import { userService } from '../../users/userService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './LoanCreate.css';

const LoanCreate = () => {
  const [form, setForm] = useState({
    bookId: '',
    userId: '',
    loanDate: '',
    returnDate: '',
  });

  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await bookService.getBooks();
        setBooks(bookData);

        const userData = await userService.getUsers();
        setUsers(userData);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los datos.',
        });
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.bookId) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Selecciona un libro.',
      });
      return false;
    }
    if (!form.userId) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Selecciona un usuario.',
      });
      return false;
    }
    if (!form.loanDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Ingresa la fecha de préstamo.',
      });
      return false;
    }
    if (!form.returnDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Ingresa la fecha de devolución.',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await loanService.createLoan(form);
      Swal.fire({
        icon: 'success',
        title: '¡Préstamo Creado!',
        text: 'El préstamo ha sido registrado correctamente.',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        navigate('/loans');
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar el préstamo.',
      });
    }
  };

  return (
    <div className="loan-create-container">
      <h2 className="loan-create-title">Crear Préstamo</h2>
      <form onSubmit={handleSubmit} className="loan-create-form">
        <div className="loan-create-group">
          <label className="loan-create-label">Libro:</label>
          <select
            name="bookId"
            value={form.bookId}
            onChange={handleChange}
            className="loan-create-select"
          >
            <option value="">-- Selecciona un libro --</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
        </div>

        <div className="loan-create-group">
          <label className="loan-create-label">Usuario:</label>
          <select
            name="userId"
            value={form.userId}
            onChange={handleChange}
            className="loan-create-select"
          >
            <option value="">-- Selecciona un usuario --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="loan-create-group">
          <label className="loan-create-label">Fecha Préstamo:</label>
          <input
            type="date"
            name="loanDate"
            value={form.loanDate}
            onChange={handleChange}
            className="loan-create-input"
          />
        </div>

        <div className="loan-create-group">
          <label className="loan-create-label">Fecha Devolución:</label>
          <input
            type="date"
            name="returnDate"
            value={form.returnDate}
            onChange={handleChange}
            className="loan-create-input"
          />
        </div>

        <button type="submit" className="loan-create-button">
          Crear Préstamo
        </button>
      </form>
    </div>
  );
};

export default LoanCreate;
