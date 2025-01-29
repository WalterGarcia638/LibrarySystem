import axiosClient from '../../api/axiosClient';

export const loanService = {
  getLoans: async () => {
    const response = await axiosClient.get('/loan');
    return response.data;
  },
  createLoan: async (loanData) => {
    const response = await axiosClient.post('/loan', loanData);
    return response.data;
  },
  registerReturn: async (loanId) => {
    const response = await axiosClient.post(`/loan/return/${loanId}`);
    return response.data;
  },
};
