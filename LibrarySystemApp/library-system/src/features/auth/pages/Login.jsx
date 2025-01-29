import React, { useState } from 'react';
import { authService } from '../authService';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

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
      login(token); // Guardamos token en localStorage y actualizamos contexto
      navigate('/'); // Redirigir al home o dashboard
    } catch (error) {
      alert('Error de credenciales');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input name="username" value={form.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" name="password" value={form.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
