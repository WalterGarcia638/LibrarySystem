/*import React, { useEffect, useState } from 'react';
import { loanService } from '../loanService';

const LoanList = () => {
  const [loans, setLoans] = useState([]);

  const fetchLoans = async () => {
    try {
      const data = await loanService.getLoans();
      setLoans(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleReturn = async (loanId) => {
    try {
      await loanService.registerReturn(loanId);
      alert('Devolución registrada');
      fetchLoans();
    } catch (err) {
      alert('Error en la devolución');
    }
  };

  return (
    <div>
      <h2>Préstamos Activos</h2>
      <ul>
        {loans.map((loan) => (
          <li key={loan.id}>
            {loan.bookId} - Fecha devolución: {loan.returnDate}
            {loan.actualReturnDate ? (
              <span> (Devuelto: {loan.actualReturnDate})</span>
            ) : (
              <button onClick={() => handleReturn(loan.id)}>Devolver</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanList;
*/

/*import React, { useEffect, useState } from 'react';
import { loanService } from '../loanService';
import { useNavigate } from 'react-router-dom';

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate(); 

  const fetchLoans = async () => {
    try {
      const data = await loanService.getLoans();
      setLoans(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleReturn = async (loanId) => {
    try {
      await loanService.registerReturn(loanId);
      alert('Devolución registrada');
      fetchLoans();
    } catch (err) {
      alert('Error en la devolución');
    }
  };


  const handleCreateLoan = () => {
  
    navigate('/loans/create');
  };

  return (
    <div>
      <h2>Préstamos Activos</h2>
      {}
      <button onClick={handleCreateLoan}>Crear Préstamo</button>

      <ul>
        {loans.map((loan) => (
          <li key={loan.id}>
            {loan.bookId} - Fecha devolución: {loan.returnDate}
            {loan.actualReturnDate ? (
              <span> (Devuelto: {loan.actualReturnDate})</span>
            ) : (
              <button onClick={() => handleReturn(loan.id)}>Devolver</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanList;*/

import React, { useEffect, useState } from 'react';
import { loanService } from '../loanService';
import { useNavigate } from 'react-router-dom';

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();

  const fetchLoans = async () => {
    try {
      const data = await loanService.getLoans();
      setLoans(data);
    } catch (err) {
      console.error(err);
      alert('Error al cargar préstamos');
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const handleReturn = async (loanId) => {
    try {
      await loanService.registerReturn(loanId);
      alert('Devolución registrada');
      fetchLoans();
    } catch (err) {
      alert('Error en la devolución');
    }
  };

  const handleCreateLoan = () => {
    // Te redirige a la página de Crear Préstamo
    navigate('/loans/create');
  };

  return (
    <div>
      <h2>Préstamos</h2>

      {/* Botón para crear un nuevo préstamo */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={handleCreateLoan}>Crear Préstamo</button>
      </div>

      <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Libro</th>
            <th>Usuario</th>
            <th>Fecha Préstamo</th>
            <th>Fecha Devolución</th>
            <th>Devuelto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.id}</td>
              {/* Muestra el título del libro si viene en `loan.book` */}
              <td>
                {loan.book ? loan.book.title : `Libro ID: ${loan.bookId}`}
              </td>
              {/* Muestra el nombre del usuario si viene en `loan.user` */}
              <td>
                {loan.user ? loan.user.name : `Usuario ID: ${loan.userName}`}
              </td>
              <td>{loan.loanDate}</td>
              <td>{loan.returnDate}</td>
              <td>
                {loan.actualReturnDate
                  ? `Sí, devuelto el ${loan.actualReturnDate}`
                  : 'No'}
              </td>
              <td>
                {/* Solo muestra botón "Devolver" si no está devuelto */}
                {!loan.actualReturnDate && (
                  <button onClick={() => handleReturn(loan.id)}>
                    Devolver
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanList;
