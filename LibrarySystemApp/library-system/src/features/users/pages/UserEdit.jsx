import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '../userService';
import Swal from 'sweetalert2';
import './UserEdit.css';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    name: '',
    password: '',
    role: 'User',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userService.getUser(id);
        setForm({
          username: data.username,
          name: data.name,
          password: '',
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.updateUser(id, form);
      Swal.fire({
        icon: 'success',
        title: '¡Usuario actualizado!',
        text: 'Los cambios se han guardado correctamente.',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        navigate('/users');
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el usuario.',
      });
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-edit-container">
      <h2 className="user-edit-title">Editar Usuario</h2>
      <form onSubmit={handleSubmit} className="user-edit-form">
        <div className="user-edit-group">
          <label className="user-edit-label">Usuario:</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="user-edit-input"
          />
        </div>

        <div className="user-edit-group">
          <label className="user-edit-label">Nombre:</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="user-edit-input"
          />
        </div>

        <div className="user-edit-group">
          <label className="user-edit-label">Contraseña (opcional):</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="user-edit-input"
          />
          <p className="user-edit-hint">
            Deja este campo vacío si no deseas cambiar la contraseña
          </p>
        </div>

        <div className="user-edit-group">
          <label className="user-edit-label">Rol:</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="user-edit-select"
          >
            <option value="User">Usuario</option>
            <option value="Librarian">Bibliotecario</option>
            <option value="Admin">Administrador</option>
          </select>
        </div>

        <button type="submit" className="user-edit-button">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
