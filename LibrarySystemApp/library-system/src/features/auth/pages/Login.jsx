import React, { useState } from 'react';
import { authService } from '../authService';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Swal from 'sweetalert2';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await authService.login(form.username, form.password);
      login(token);

      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Has iniciado sesión correctamente.',
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al Iniciar Sesión',
        text: 'Credenciales inválidas o servidor no disponible.',
        footer: '<a href="/register">¿No tienes cuenta? Regístrate aquí</a>',
      });
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form-group">
          <label className="login-label">Usuario:</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="login-input"
            placeholder="Ingresa tu usuario"
          />
        </div>

        <div className="login-form-group">
          <label className="login-label">Contraseña:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="login-input"
            placeholder="********"
          />
        </div>

        <div className="login-button-container">
          <button type="submit" className="login-button login-button--login">
            Ingresar
          </button>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="login-button login-button--register"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
