/*import React, { useState } from 'react';
import { reportService } from '../reportService';
import { useAuth } from '../../../hooks/useAuth';

const AdminReports = () => {
  const { user } = useAuth();
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [reportData, setReportData] = useState([]);

  if (user?.role !== 'Librarian' && user?.role !== 'Admin') {
    return <h2>No tienes acceso a esta sección</h2>;
  }

  const handleFetch = async () => {
    const data = await reportService.getLoansByPeriod(start, end);
    setReportData(data);
  };

  return (
    <div>
      <h2>Reportes de Préstamos</h2>
      <input type="date" value={start} onChange={e => setStart(e.target.value)} />
      <input type="date" value={end} onChange={e => setEnd(e.target.value)} />
      <button onClick={handleFetch}>Generar Reporte</button>

      <div>
        {reportData.map(item => (
          <div key={item.loanId}>
            <p>Libro ID: {item.bookId}</p>
            <p>Usuario ID: {item.userId}</p>
            <p>Fecha Préstamo: {item.loanDate}</p>
            {}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReports;*/

import React, { useState } from 'react';
import { reportService } from '../reportService';

const AdminReports = () => {
  // Estados para filtrar préstamos por periodo
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [loans, setLoans] = useState([]);

  // Estado para usuarios con multas pendientes
  const [usersWithFines, setUsersWithFines] = useState([]);

  // Manejar búsqueda de préstamos por periodo
  const handleFetchLoans = async () => {
    if (!start || !end) {
      alert('Debes seleccionar la fecha inicial y final');
      return;
    }
    try {
      const data = await reportService.getLoansByPeriod(start, end);
      setLoans(data);
    } catch (err) {
      console.error(err);
      alert('Error al cargar reporte de préstamos');
    }
  };

  // Manejar búsqueda de usuarios con multas pendientes
  const handleFetchPendingFines = async () => {
    try {
      const data = await reportService.getUsersWithPendingFines();
      setUsersWithFines(data);
    } catch (err) {
      console.error(err);
      alert('Error al cargar usuarios con multas pendientes');
    }
  };

  return (
    <div>
      <h2>Reportes</h2>

      <section style={{ marginBottom: '2rem' }}>
        <h3>Préstamos por Periodo</h3>
        <div>
          <label>Fecha Inicio: </label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <label style={{ marginLeft: '1rem' }}>Fecha Fin: </label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
          <button style={{ marginLeft: '1rem' }} onClick={handleFetchLoans}>
            Generar Reporte
          </button>
        </div>

        {/* Tabla de préstamos */}
        <table
          border="1"
          cellPadding="5"
          style={{ borderCollapse: 'collapse', marginTop: '1rem' }}
        >
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
            {loans.map((loan) => (
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
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>Usuarios con Multas Pendientes</h3>
        <button onClick={handleFetchPendingFines}>Ver Usuarios</button>

        {/* Lista de usuarios con multas */}
        <ul style={{ marginTop: '1rem' }}>
          {usersWithFines.map((u) => (
            <li key={u.id}>
              {u.name} - {u.username} - Rol: {u.role}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminReports;
