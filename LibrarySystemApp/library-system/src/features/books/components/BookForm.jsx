import React from 'react';

const BookForm = ({ form, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Título</label>
        <input name="title" value={form.title} onChange={onChange} />
      </div>
      <div>
        <label>Autor</label>
        <input name="author" value={form.author} onChange={onChange} />
      </div>
      <div>
        <label>ISBN</label>
        <input name="isbn" value={form.isbn} onChange={onChange} />
      </div>
      <div>
        <label>Género</label>
        <input name="genre" value={form.genre} onChange={onChange} />
      </div>
      <div>
        <label>Año</label>
        <input name="year" value={form.year} onChange={onChange} />
      </div>
      <div>
        <label>Cantidad Disponible</label>
        <input name="quantity" value={form.quantity} onChange={onChange} />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default BookForm;
