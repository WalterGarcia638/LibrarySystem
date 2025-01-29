import React, { useState } from 'react';
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
            {/* etc */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReports;
