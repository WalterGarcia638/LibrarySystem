import React, { useEffect, useState } from 'react';
import { userService } from '../userService';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm('¿Seguro que deseas eliminar este usuario?')) return;
    try {
      await userService.deleteUser(userId);
      // Si todo va bien, recargamos la lista
      fetchUsers();
    } catch (err) {
      alert('Error al eliminar usuario');
    }
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td>
                <Link to={`/users/edit/${u.id}`}>Editar</Link> |{' '}
                <button onClick={() => handleDelete(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
