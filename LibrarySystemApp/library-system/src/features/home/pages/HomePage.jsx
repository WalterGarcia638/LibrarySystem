import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Bienvenido a la Biblioteca</h1>
      <nav>
        {/* Enlaces a otras secciones */}
        <ul>
          <li>
            <Link to="/books">Gestionar Libros</Link>
          </li>
          <li>
            <Link to="/loans">Gestionar Préstamos</Link>
          </li>
          <li>
            <Link to="/reports">Reportes (Solo Bibliotecario/Admin)</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
