import React, { useEffect, useState } from 'react';
import { loanService } from '../loanService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './LoanList.css';

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();

  const fetchLoans = async () => {
    try {
      const data = await loanService.getLoans();
      setLoans(data);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los préstamos.',
      });
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  // Devolver libro con SweetAlert2
  const handleReturn = async (loanId) => {
    Swal.fire({
      title: '¿Confirmar devolución?',
      text: 'Este libro será marcado como devuelto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, devolver',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await loanService.registerReturn(loanId);
          Swal.fire({
            icon: 'success',
            title: 'Libro devuelto',
            text: 'El préstamo ha sido actualizado.',
          });
          fetchLoans();
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Error en la devolución',
            text: 'No se pudo procesar la devolución.',
          });
        }
      }
    });
  };

  // Crear un nuevo préstamo
  const handleCreateLoan = () => {
    navigate('/loans/create');
  };

  return (
    <div className="loan-list-container">
      <h2 className="loan-list-title">Préstamos Activos</h2>

      {/* Botón para crear un nuevo préstamo */}
      <button onClick={handleCreateLoan} className="loan-add-button">
        Agregar Préstamo
      </button>

      <table className="loan-table">
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
          {loans.length > 0 ? (
            loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.book ? loan.book.title : `${loan.bookTitle}`}</td>
                <td>{loan.user ? loan.user.name : `${loan.userName}`}</td>
                <td>{loan.loanDate}</td>
                <td>{loan.returnDate}</td>
                <td>
                  {loan.actualReturnDate
                    ? `Sí, devuelto el ${loan.actualReturnDate}`
                    : 'No'}
                </td>
                <td>
                  {!loan.actualReturnDate && (
                    <button
                      onClick={() => handleReturn(loan.id)}
                      className="loan-return-button"
                    >
                      Devolver
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '1rem' }}>
                No hay préstamos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LoanList;
