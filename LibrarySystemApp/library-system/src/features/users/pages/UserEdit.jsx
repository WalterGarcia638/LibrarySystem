import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '../userService';

const UserEdit = () => {
  const { id } = useParams(); // /users/edit/:id
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    name: '',
    password: '', // Campo para la contraseña
    role: 'User', // Valor por defecto
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar datos del usuario al montar
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userService.getUser(id);
        setForm({
          username: data.username,
          name: data.name,
          password: '', // Por defecto vacío (solo se llena si el usuario quiere cambiar)
          role: data.role,
        });
        setLoading(false);
      } catch (err) {
        setError('Error al cargar usuario');
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Hacemos la llamada al servicio
      await userService.updateUser(id, form);
      alert('Usuario actualizado correctamente');
      navigate('/users'); // Vuelve a la lista de usuarios
    } catch (err) {
      setError('Error al actualizar usuario');
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario: </label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nombre: </label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label>Contraseña (opcional): </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Deja este campo vacío si no deseas cambiar la contraseña
          </p>
        </div>
        <div>
          <label>Rol: </label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="User">Usuario</option>
            <option value="Librarian">Bibliotecario</option>
            <option value="Admin">Administrador</option>
          </select>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default UserEdit;
