import React from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  FaHome,
  FaBook,
  FaClipboardList,
  FaChartBar,
  FaUsers,
  FaSignOutAlt,
} from 'react-icons/fa';
import './PrivateLayout.css';

const PrivateLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      {}
      <header className="navbar">
        <nav className="navbar-links">
          <Link to="/">
            <FaHome /> Inicio
          </Link>
          <Link to="/books">
            <FaBook /> Libros
          </Link>
          <Link to="/loans">
            <FaClipboardList /> Préstamos
          </Link>
          {(user?.role === 'Admin' || user?.role === 'Librarian') && (
            <Link to="/reports">
              <FaChartBar /> Reportes
            </Link>
          )}
          {(user?.role === 'Admin' || user?.role === 'Librarian') && (
            <Link to="/users">
              <FaUsers /> Usuarios
            </Link>
          )}
        </nav>

        <div className="navbar-user">
          {user && (
            <span>
              Hola, <strong>{user.username}</strong> ({user.role})
            </span>
          )}
          <button onClick={handleLogout} className="logout-button">
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </div>
      </header>

      {}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
