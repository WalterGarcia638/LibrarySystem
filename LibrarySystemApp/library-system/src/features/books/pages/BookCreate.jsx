import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import BookForm from '../components/BookForm';
import { bookService } from '../bookService';

const BookCreate = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    year: '',
    quantity: 1,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookService.createBook(form);

      // Mensaje de éxito con SweetAlert2
      Swal.fire({
        icon: 'success',
        title: '¡Libro Agregado!',
        text: 'El libro se ha registrado correctamente.',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        navigate('/books'); // Redirige a la lista de libros
      });
    } catch (error) {
      // Mensaje de error con SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error al Crear Libro',
        text: 'Hubo un problema al registrar el libro. Inténtalo de nuevo.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="book-create-container">
      <h2 className="book-create-title">Agregar Libro</h2>
      <BookForm form={form} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
};

export default BookCreate;
