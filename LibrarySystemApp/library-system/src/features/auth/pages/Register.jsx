import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../authService';
import Swal from 'sweetalert2';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'User',
    name: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(form);

      Swal.fire({
        icon: 'success',
        title: '¡Registro Exitoso!',
        text: 'El usuario ha sido registrado correctamente.',
        confirmButtonText: 'Ir a Iniciar Sesión',
      }).then(() => {
        navigate('/login');
      });
      setForm({ username: '', password: '', role: 'User', name: '' });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al Registrar',
        text: 'Hubo un problema al crear la cuenta. Inténtalo de nuevo.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="register-form-group">
          <label className="register-label">Nombre:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="register-input"
            placeholder="Ingrese su nombre completo"
          />
        </div>

        <div className="register-form-group">
          <label className="register-label">Usuario:</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="register-input"
            placeholder="Ingrese su nombre de usuario"
          />
        </div>

        <div className="register-form-group">
          <label className="register-label">Contraseña:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="register-input"
            placeholder="********"
          />
        </div>

        <div className="register-form-group">
          <label className="register-label">Rol:</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="register-select"
          >
            <option value="User">Usuario</option>
            <option value="Librarian">Bibliotecario</option>
            <option value="Admin">Administrador</option>
          </select>
        </div>

        <div className="register-button-container">
          <button
            type="submit"
            className="register-button register-button--register"
          >
            Registrar
          </button>
        </div>
      </form>

      {}
      <p className="register-login-link">
        ¿Ya tienes una cuenta?{' '}
        <span onClick={() => navigate('/login')}>Inicia sesión aquí</span>
      </p>
    </div>
  );
};

export default Register;
