import axiosClient from '../../api/axiosClient';

export const userService = {
  getUsers: async () => {
    const response = await axiosClient.get('/users'); // Ajusta tu endpoint
    return response.data;
  },
  getUser: async (id) => {
    const response = await axiosClient.get(`/users/${id}`);
    return response.data;
  },
  updateUser: async (id, userData) => {
    // PUT o PATCH según tu backend
    const response = await axiosClient.put(`/users/${id}`, userData);
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await axiosClient.delete(`/users/${id}`);
    return response.data; // o podría ser vacío si tu API retorna NoContent
  },
};
