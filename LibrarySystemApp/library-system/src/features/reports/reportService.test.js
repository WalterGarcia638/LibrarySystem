// src/features/report/reportService.test.js

import axiosClient from '../../api/axiosClient';
import MockAdapter from 'axios-mock-adapter';
import { reportService } from './reportService';

// Creamos el mock sobre la MISMA instancia que usa reportService
const mock = new MockAdapter(axiosClient);

describe('reportService', () => {
  // Limpia el mock después de cada test
  afterEach(() => {
    mock.reset();
  });

  describe('getLoansByPeriod', () => {
    it('debería obtener los préstamos dentro del periodo especificado', async () => {
      const startDate = '2025-01-01';
      const endDate = '2025-01-31';
      const mockResponse = [
        {
          id: 1,
          bookId: 101,
          userId: 1001,
          loanDate: '2025-01-05',
          returnDate: '2025-01-15',
        },
        {
          id: 2,
          bookId: 102,
          userId: 1002,
          loanDate: '2025-01-10',
          returnDate: '2025-01-20',
        },
      ];

      // Construimos la URL completa con los parámetros de consulta
      const url = `/reports/loans?start=${encodeURIComponent(startDate)}&end=${encodeURIComponent(endDate)}`;

      // Simulamos la respuesta del backend
      mock.onGet(url).reply(200, mockResponse);

      // Llamamos al servicio
      const result = await reportService.getLoansByPeriod(startDate, endDate);

      // Verificamos que el resultado sea el esperado
      expect(result).toEqual(mockResponse);
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe(url);
    });

    it('debería manejar errores al obtener los préstamos por periodo', async () => {
      const startDate = '2025-01-01';
      const endDate = '2025-01-31';

      // Construimos la URL completa con los parámetros de consulta
      const url = `/reports/loans?start=${encodeURIComponent(startDate)}&end=${encodeURIComponent(endDate)}`;

      // Simulamos un error 500 del backend
      mock.onGet(url).reply(500, { message: 'Internal Server Error' });

      // Act & Assert: verificamos que el servicio lance un error
      await expect(
        reportService.getLoansByPeriod(startDate, endDate)
      ).rejects.toThrow('Request failed with status code 500');
    });
  });

  describe('getUsersWithPendingFines', () => {
    it('debería obtener usuarios con multas pendientes', async () => {
      const mockResponse = [
        { userId: 1001, name: 'John Doe', pendingFines: 20 },
        { userId: 1002, name: 'Jane Smith', pendingFines: 15 },
      ];

      // Simulamos la respuesta del backend
      mock.onGet('/reports/pending-fines').reply(200, mockResponse);

      // Llamamos al servicio
      const result = await reportService.getUsersWithPendingFines();

      // Verificamos que el resultado sea el esperado
      expect(result).toEqual(mockResponse);
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe('/reports/pending-fines');
    });

    it('debería manejar errores al obtener usuarios con multas pendientes', async () => {
      // Simulamos un error 404 del backend
      mock.onGet('/reports/pending-fines').reply(404, { message: 'Not Found' });

      // Act & Assert: verificamos que el servicio lance un error
      await expect(reportService.getUsersWithPendingFines()).rejects.toThrow(
        'Request failed with status code 404'
      );
    });
  });
});
