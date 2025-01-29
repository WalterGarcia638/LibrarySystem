import React, { useState } from 'react';
import BookForm from '../components/BookForm';
import { bookService } from '../bookService';
import { useNavigate } from 'react-router-dom';

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
      navigate('/books');
    } catch (error) {
      alert('Error creando libro');
    }
  };

  return (
    <div>
      <h2>Agregar Libro</h2>
      <BookForm form={form} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
};

export default BookCreate;
