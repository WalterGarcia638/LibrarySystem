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

import React, { useEffect, useState } from 'react';
import { loanService } from '../loanService';
import { useNavigate } from 'react-router-dom';

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate(); // Para navegar con un botón

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

  // Maneja el clic del botón "Crear Préstamo"
  const handleCreateLoan = () => {
    // Redirige a la ruta /loans/create
    navigate('/loans/create');
  };

  return (
    <div>
      <h2>Préstamos Activos</h2>
      {/* Botón para crear un nuevo préstamo */}
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

export default LoanList;
