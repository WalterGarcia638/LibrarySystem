import axiosClient from '../../api/axiosClient';

export const authService = {
  login: async (username, password) => {
    const response = await axiosClient.post('/auth/login', {
      username,
      password,
    });
    return response.data;
  },

  register: async (userData) => {
    const response = await axiosClient.post('/auth/register', userData);
    return response.data;
  },
};
