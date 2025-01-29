import axiosClient from '../../api/axiosClient';

export const bookService = {
  getBooks: async () => {
    const response = await axiosClient.get('/book');
    return response.data;
  },
  getBook: async (id) => {
    const response = await axiosClient.get(`/book/${id}`);
    return response.data;
  },
  createBook: async (data) => {
    const response = await axiosClient.post('/book', data);
    return response.data;
  },
  updateBook: async (id, data) => {
    const response = await axiosClient.put(`/book/${id}`, data);
    return response.data;
  },
  deleteBook: async (id) => {
    const response = await axiosClient.delete(`/book/${id}`);
    return response.data;
  },
  searchBooks: async (query) => {
    const response = await axiosClient.get(`/book/search${query}`);
    return response.data;
  },
};
