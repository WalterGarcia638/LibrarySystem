import React, { useState } from 'react';
import { authService } from '../authService';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'User', name: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(form);
      alert('Usuario registrado con éxito');
    } catch (error) {
      alert('Error al registrar usuario');
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input name="name" value={form.name} onChange={handleChange} />
        </label>
        <br />
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
        <label>
          Rol:
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="User">Usuario</option>
            <option value="Librarian">Bibliotecario</option>
            <option value="Admin">Administrador</option>
          </select>
        </label>
        <br />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
