// src/features/user/userService.test.js

import axiosClient from '../../api/axiosClient';
import MockAdapter from 'axios-mock-adapter';
import { userService } from './userService';

// Creamos el mock sobre la MISMA instancia que usa userService
const mock = new MockAdapter(axiosClient);

describe('userService', () => {
  // Limpia el mock después de cada test
  afterEach(() => {
    mock.reset();
  });

  describe('getUsers', () => {
    it('debería obtener la lista de usuarios correctamente', async () => {
      const mockResponse = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      ];

      // Simulamos la respuesta del backend
      mock.onGet('/users').reply(200, mockResponse);

      // Llamamos al servicio
      const result = await userService.getUsers();

      // Verificamos que el resultado sea el esperado
      expect(result).toEqual(mockResponse);
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe('/users');
    });

    it('debería manejar errores al obtener la lista de usuarios', async () => {
      // Simulamos un error 500 del backend
      mock.onGet('/users').reply(500, { message: 'Internal Server Error' });

      // Act & Assert: verificamos que el servicio lance un error
      await expect(userService.getUsers()).rejects.toThrow(
        'Request failed with status code 500'
      );
    });
  });

  describe('getUser', () => {
    it('debería obtener un usuario por id correctamente', async () => {
      const userId = 1;
      const mockResponse = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      };

      // Simulamos la respuesta del backend
      mock.onGet(`/users/${userId}`).reply(200, mockResponse);

      // Llamamos al servicio
      const result = await userService.getUser(userId);

      // Verificamos que el resultado sea el esperado
      expect(result).toEqual(mockResponse);
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe(`/users/${userId}`);
    });

    it('debería manejar errores al obtener un usuario por id', async () => {
      const userId = 999; // Supongamos que este ID no existe

      // Simulamos un error 404 del backend
      mock.onGet(`/users/${userId}`).reply(404, { message: 'User Not Found' });

      // Act & Assert: verificamos que el servicio lance un error
      await expect(userService.getUser(userId)).rejects.toThrow(
        'Request failed with status code 404'
      );
    });
  });

  describe('updateUser', () => {
    it('debería actualizar un usuario correctamente', async () => {
      const userId = 1;
      const updateData = {
        name: 'Johnathan Doe',
        email: 'johnathan@example.com',
      };
      const mockResponse = { id: 1, ...updateData };

      // Simulamos la respuesta del backend
      mock.onPut(`/users/${userId}`, updateData).reply(200, mockResponse);

      // Llamamos al servicio
      const result = await userService.updateUser(userId, updateData);

      // Verificamos que el resultado sea el esperado
      expect(result).toEqual(mockResponse);
      expect(mock.history.put.length).toBe(1);
      expect(mock.history.put[0].url).toBe(`/users/${userId}`);
      expect(JSON.parse(mock.history.put[0].data)).toEqual(updateData);
    });

    it('debería manejar errores al actualizar un usuario', async () => {
      const userId = 1;
      const updateData = { name: '', email: 'invalid-email' }; // Datos inválidos

      // Simulamos un error 400 del backend
      mock
        .onPut(`/users/${userId}`, updateData)
        .reply(400, { message: 'Bad Request' });

      // Act & Assert: verificamos que el servicio lance un error
      await expect(userService.updateUser(userId, updateData)).rejects.toThrow(
        'Request failed with status code 400'
      );
    });
  });

  describe('deleteUser', () => {
    it('debería eliminar un usuario correctamente', async () => {
      const userId = 1;
      const mockResponse = { message: 'User deleted successfully' };

      // Simulamos la respuesta del backend
      mock.onDelete(`/users/${userId}`).reply(200, mockResponse);

      // Llamamos al servicio
      const result = await userService.deleteUser(userId);

      // Verificamos que el resultado sea el esperado
      expect(result).toEqual(mockResponse);
      expect(mock.history.delete.length).toBe(1);
      expect(mock.history.delete[0].url).toBe(`/users/${userId}`);
    });

    it('debería manejar errores al eliminar un usuario', async () => {
      const userId = 999; // Supongamos que este ID no existe

      // Simulamos un error 404 del backend
      mock
        .onDelete(`/users/${userId}`)
        .reply(404, { message: 'User Not Found' });

      // Act & Assert: verificamos que el servicio lance un error
      await expect(userService.deleteUser(userId)).rejects.toThrow(
        'Request failed with status code 404'
      );
    });
  });
});
