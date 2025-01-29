import React, { useState } from 'react';
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

export default LoanCreate;
