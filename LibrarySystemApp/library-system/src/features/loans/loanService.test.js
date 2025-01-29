import axiosClient from '../../api/axiosClient';
import MockAdapter from 'axios-mock-adapter';
import { loanService } from './loanService';

const mock = new MockAdapter(axiosClient);

describe('loanService', () => {
  afterEach(() => {
    mock.reset();
  });

  describe('getLoans', () => {
    it('debería obtener la lista de préstamos correctamente', async () => {
      const mockResponse = [
        { id: 1, bookId: 101, userId: 1001, returnDate: '2025-01-10' },
        { id: 2, bookId: 102, userId: 1002, returnDate: '2025-02-15' },
      ];

      mock.onGet('/loan').reply(200, mockResponse);

      const result = await loanService.getLoans();

      expect(result).toEqual(mockResponse);
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe('/loan');
    });

    it('debería manejar errores al obtener la lista de préstamos', async () => {
      mock.onGet('/loan').reply(500, { message: 'Internal Server Error' });

      await expect(loanService.getLoans()).rejects.toThrow();
    });
  });

  describe('createLoan', () => {
    it('debería crear un préstamo correctamente', async () => {
      const newLoan = { bookId: 103, userId: 1003, returnDate: '2025-03-20' };
      const mockResponse = { id: 3, ...newLoan };

      mock.onPost('/loan', newLoan).reply(201, mockResponse);

      const result = await loanService.createLoan(newLoan);

      expect(result).toEqual(mockResponse);
      expect(mock.history.post.length).toBe(1);

      expect(JSON.parse(mock.history.post[0].data)).toEqual(newLoan);
      expect(mock.history.post[0].url).toBe('/loan');
    });

    it('debería manejar errores al crear un préstamo', async () => {
      const invalidLoan = {
        bookId: null,
        userId: 1004,
        returnDate: '2025-04-25',
      };

      mock.onPost('/loan', invalidLoan).reply(400, { message: 'Bad Request' });

      await expect(loanService.createLoan(invalidLoan)).rejects.toThrow();
    });
  });

  describe('registerReturn', () => {
    it('debería registrar la devolución de un préstamo correctamente', async () => {
      const loanId = 1;
      const mockResponse = { message: 'Return registered successfully' };

      mock.onPost(`/loan/return/${loanId}`).reply(200, mockResponse);

      const result = await loanService.registerReturn(loanId);

      expect(result).toEqual(mockResponse);
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].url).toBe(`/loan/return/${loanId}`);
    });

    it('debería manejar errores al registrar la devolución de un préstamo', async () => {
      const loanId = 999;

      mock
        .onPost(`/loan/return/${loanId}`)
        .reply(404, { message: 'Loan Not Found' });

      await expect(loanService.registerReturn(loanId)).rejects.toThrow();
    });
  });
});
