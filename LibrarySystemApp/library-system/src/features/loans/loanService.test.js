// src/features/loan/loanService.test.js

import axiosClient from '../../api/axiosClient';
import MockAdapter from 'axios-mock-adapter';
import { loanService } from './loanService';

// Creamos el mock sobre la MISMA instancia que usa loanService
const mock = new MockAdapter(axiosClient);

describe('loanService', () => {
  // Limpia el mock después de cada test
  afterEach(() => {
    mock.reset();
  });

  describe('getLoans', () => {
    it('debería obtener la lista de préstamos correctamente', async () => {
      const mockResponse = [
        { id: 1, bookId: 101, userId: 1001, returnDate: '2025-01-10' },
        { id: 2, bookId: 102, userId: 1002, returnDate: '2025-02-15' },
      ];

      // Simulamos la respuesta del backend
      mock.onGet('/loan').reply(200, mockResponse);

      // Llamamos al servicio
      const result = await loanService.getLoans();

      // Verificamos que el resultado sea el esperado
      expect(result).toEqual(mockResponse);
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe('/loan');
    });

    it('debería manejar errores al obtener la lista de préstamos', async () => {
      // Simulamos un error 500 del backend
      mock.onGet('/loan').reply(500, { message: 'Internal Server Error' });

      // Act & Assert: verificamos que el servicio lance un error
      await expect(loanService.getLoans()).rejects.toThrow();
    });
  });

  describe('createLoan', () => {
    it('debería crear un préstamo correctamente', async () => {
      const newLoan = { bookId: 103, userId: 1003, returnDate: '2025-03-20' };
      const mockResponse = { id: 3, ...newLoan };

      // Simulamos la respuesta del backend
      mock.onPost('/loan', newLoan).reply(201, mockResponse);

      // Llamamos al servicio
      const result = await loanService.createLoan(newLoan);

      // Verificamos que el resultado sea el esperado
      expect(result).toEqual(mockResponse);
      expect(mock.history.post.length).toBe(1);
      // Verifica el body enviado
      expect(JSON.parse(mock.history.post[0].data)).toEqual(newLoan);
      expect(mock.history.post[0].url).toBe('/loan');
    });

    it('debería manejar errores al crear un préstamo', async () => {
      const invalidLoan = {
        bookId: null,
        userId: 1004,
        returnDate: '2025-04-25',
      };

      // Simulamos un error 400 del backend
      mock.onPost('/loan', invalidLoan).reply(400, { message: 'Bad Request' });

      // Act & Assert: verificamos que el servicio lance un error
      await expect(loanService.createLoan(invalidLoan)).rejects.toThrow();
    });
  });

  describe('registerReturn', () => {
    it('debería registrar la devolución de un préstamo correctamente', async () => {
      const loanId = 1;
      const mockResponse = { message: 'Return registered successfully' };

      // Simulamos la respuesta del backend
      mock.onPost(`/loan/return/${loanId}`).reply(200, mockResponse);

      // Llamamos al servicio
      const result = await loanService.registerReturn(loanId);

      // Verificamos que el resultado sea el esperado
      expect(result).toEqual(mockResponse);
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].url).toBe(`/loan/return/${loanId}`);
    });

    it('debería manejar errores al registrar la devolución de un préstamo', async () => {
      const loanId = 999; // Supongamos que este ID no existe

      // Simulamos un error 404 del backend
      mock
        .onPost(`/loan/return/${loanId}`)
        .reply(404, { message: 'Loan Not Found' });

      // Act & Assert: verificamos que el servicio lance un error
      await expect(loanService.registerReturn(loanId)).rejects.toThrow();
    });
  });
});
