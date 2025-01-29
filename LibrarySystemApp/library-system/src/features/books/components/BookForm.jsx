import React from 'react';
import './BookForm.css';

const BookForm = ({ form, onChange, onSubmit }) => {
  return (
    <div className="book-form-container">
      <h2 className="book-form-title">Gestión de Libros</h2>
      <form onSubmit={onSubmit} className="book-form">
        <div className="book-form-group">
          <label className="book-form-label">Título</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={onChange}
            className="book-form-input"
            placeholder="Ingrese el título del libro"
          />
        </div>

        <div className="book-form-group">
          <label className="book-form-label">Autor</label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={onChange}
            className="book-form-input"
            placeholder="Ingrese el autor"
          />
        </div>

        <div className="book-form-group">
          <label className="book-form-label">ISBN</label>
          <input
            type="text"
            name="isbn"
            value={form.isbn}
            onChange={onChange}
            className="book-form-input"
            placeholder="Ingrese el ISBN"
          />
        </div>

        <div className="book-form-group">
          <label className="book-form-label">Género</label>
          <input
            type="text"
            name="genre"
            value={form.genre}
            onChange={onChange}
            className="book-form-input"
            placeholder="Ingrese el género"
          />
        </div>

        <div className="book-form-group">
          <label className="book-form-label">Año</label>
          <input
            type="number"
            name="year"
            value={form.year}
            onChange={onChange}
            className="book-form-input"
            placeholder="Ingrese el año de publicación"
          />
        </div>

        <div className="book-form-group">
          <label className="book-form-label">Cantidad Disponible</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={onChange}
            className="book-form-input"
            placeholder="Ingrese la cantidad disponible"
          />
        </div>

        <div className="book-form-button-container">
          <button type="submit" className="book-form-button">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
