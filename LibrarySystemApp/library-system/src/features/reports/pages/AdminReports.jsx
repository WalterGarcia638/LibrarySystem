import React, { useState } from 'react';
import { reportService } from '../reportService';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import './AdminReports.css';

const AdminReports = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [loans, setLoans] = useState([]);
  const [usersWithFines, setUsersWithFines] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const loansPerPage = 5;

  const handleFetchLoans = async () => {
    if (!start || !end) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Debes seleccionar la fecha inicial y final.',
      });
      return;
    }
    try {
      const data = await reportService.getLoansByPeriod(start, end);
      setLoans(data);
      setCurrentPage(0);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar el reporte de préstamos.',
      });
    }
  };
  const handleFetchPendingFines = async () => {
    try {
      const data = await reportService.getUsersWithPendingFines();
      setUsersWithFines(data);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar la lista de usuarios con multas pendientes.',
      });
    }
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * loansPerPage;
  const currentLoans = loans.slice(offset, offset + loansPerPage);
  const pageCount = Math.ceil(loans.length / loansPerPage);

  return (
    <div className="admin-reports-container">
      <h2 className="admin-reports-title">Reportes</h2>

      {}
      <section className="admin-reports-section">
        <h3>Préstamos por Periodo</h3>
        <div className="admin-reports-filters">
          <label>Inicio:</label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="admin-reports-input"
          />
          <label>Fin:</label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="admin-reports-input"
          />
          <button onClick={handleFetchLoans} className="admin-reports-button">
            Generar Reporte
          </button>
        </div>

        {}
        <table className="admin-reports-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Libro</th>
              <th>Usuario</th>
              <th>Fecha Préstamo</th>
              <th>Fecha Devolución</th>
              <th>Devuelto</th>
              <th>Multa</th>
            </tr>
          </thead>
          <tbody>
            {currentLoans.length > 0 ? (
              currentLoans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td>{loan.book ? loan.book.title : loan.bookId}</td>
                  <td>{loan.user ? loan.user.name : loan.userId}</td>
                  <td>{loan.loanDate}</td>
                  <td>{loan.returnDate}</td>
                  <td>
                    {loan.actualReturnDate
                      ? `Sí (${loan.actualReturnDate})`
                      : 'No'}
                  </td>
                  <td>{loan.fine}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: 'center', padding: '1rem' }}
                >
                  No hay datos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {}
        {loans.length > loansPerPage && (
          <ReactPaginate
            previousLabel={'← Anterior'}
            nextLabel={'Siguiente →'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        )}
      </section>

      {}
      <section className="admin-reports-section">
        <h3>Usuarios con Multas Pendientes</h3>
        <button
          onClick={handleFetchPendingFines}
          className="admin-reports-button"
        >
          Ver Usuarios
        </button>

        {}
        <ul className="admin-reports-fines-list">
          {usersWithFines.length > 0 ? (
            usersWithFines.map((u) => (
              <li key={u.id}>
                <strong>{u.name}</strong>
              </li>
            ))
          ) : (
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              No hay usuarios con multas pendientes.
            </p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default AdminReports;
