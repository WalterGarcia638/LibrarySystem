import React from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PrivateLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Llamamos el método logout del AuthContext
    logout();
    // Redirigimos al login
    navigate('/login');
  };

  return (
    <div>
      {/* Barra de navegación */}
      <header style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Enlaces a distintas secciones */}
          <div>
            <Link to="/" style={{ marginRight: '10px' }}>
              Inicio
            </Link>
            <Link to="/books" style={{ marginRight: '10px' }}>
              Libros
            </Link>
            <Link to="/loans" style={{ marginRight: '10px' }}>
              Préstamos
            </Link>
            {(user?.role === 'Admin' || user?.role === 'Librarian') && (
              <Link to="/reports" style={{ marginRight: '10px' }}>
                Reportes
              </Link>
            )}
            {(user?.role === 'Admin' || user?.role === 'Librarian') && (
              <Link to="/users" style={{ marginRight: '10px' }}>
                Usuarios
              </Link>
            )}
          </div>
          <div>
            {user && (
              <span style={{ marginRight: '15px' }}>
                Hola, {user.username} ({user.role})
              </span>
            )}
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </nav>
      </header>

      {/* Contenido principal (las páginas hijas) */}
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
