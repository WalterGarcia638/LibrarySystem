import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { bookService } from '../bookService';

const BookEdit = () => {
  const { id } = useParams();           // Captura el id de la URL (ruta: /books/edit/:id)
  const navigate = useNavigate();       
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    year: '',
    quantity: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1) Cargar los datos del libro cuando se monte el componente
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await bookService.getBook(id);
        setForm({
          title: data.title,
          author: data.author,
          isbn: data.isbn,
          genre: data.genre,
          year: data.year,
          quantity: data.quantity
        });
        setLoading(false);
      } catch (e) {
        setError('Error al cargar los datos del libro');
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // 2) Manejo de eventos en cada campo
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 3) Enviar el formulario: actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookService.updateBook(id, form);
      navigate('/books'); // Redirige a la lista de libros
    } catch (error) {
      setError('Error al actualizar el libro');
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Editar Libro</h2>
      <BookForm form={form} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
};

export default BookEdit;
