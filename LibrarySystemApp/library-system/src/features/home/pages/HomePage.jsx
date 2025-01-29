import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenido a la Biblioteca</h1>
      <p className="home-subtitle">
        Gestiona libros, préstamos y usuarios de manera sencilla.
      </p>

      <div className="home-links">
        <Link to="/books" className="home-button">
          Ver Libros
        </Link>
        <Link to="/loans" className="home-button">
          Ver Préstamos
        </Link>
        <Link to="/reports" className="home-button">
          Reportes
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
