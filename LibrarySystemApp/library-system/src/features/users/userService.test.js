import axiosClient from '../../api/axiosClient';
import MockAdapter from 'axios-mock-adapter';
import { userService } from './userService';

const mock = new MockAdapter(axiosClient);

describe('userService', () => {
  afterEach(() => {
    mock.reset();
  });

  describe('getUsers', () => {
    it('debería obtener la lista de usuarios correctamente', async () => {
      const mockResponse = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      ];

      mock.onGet('/users').reply(200, mockResponse);

      const result = await userService.getUsers();

      expect(result).toEqual(mockResponse);
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe('/users');
    });

    it('debería manejar errores al obtener la lista de usuarios', async () => {
      mock.onGet('/users').reply(500, { message: 'Internal Server Error' });

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

      mock.onGet(`/users/${userId}`).reply(200, mockResponse);

      const result = await userService.getUser(userId);

      expect(result).toEqual(mockResponse);
      expect(mock.history.get.length).toBe(1);
      expect(mock.history.get[0].url).toBe(`/users/${userId}`);
    });

    it('debería manejar errores al obtener un usuario por id', async () => {
      const userId = 999;

      mock.onGet(`/users/${userId}`).reply(404, { message: 'User Not Found' });

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

      mock.onPut(`/users/${userId}`, updateData).reply(200, mockResponse);

      const result = await userService.updateUser(userId, updateData);

      expect(result).toEqual(mockResponse);
      expect(mock.history.put.length).toBe(1);
      expect(mock.history.put[0].url).toBe(`/users/${userId}`);
      expect(JSON.parse(mock.history.put[0].data)).toEqual(updateData);
    });

    it('debería manejar errores al actualizar un usuario', async () => {
      const userId = 1;
      const updateData = { name: '', email: 'invalid-email' };

      mock
        .onPut(`/users/${userId}`, updateData)
        .reply(400, { message: 'Bad Request' });

      await expect(userService.updateUser(userId, updateData)).rejects.toThrow(
        'Request failed with status code 400'
      );
    });
  });

  describe('deleteUser', () => {
    it('debería eliminar un usuario correctamente', async () => {
      const userId = 1;
      const mockResponse = { message: 'User deleted successfully' };

      mock.onDelete(`/users/${userId}`).reply(200, mockResponse);

      const result = await userService.deleteUser(userId);

      expect(result).toEqual(mockResponse);
      expect(mock.history.delete.length).toBe(1);
      expect(mock.history.delete[0].url).toBe(`/users/${userId}`);
    });

    it('debería manejar errores al eliminar un usuario', async () => {
      const userId = 999;

      mock
        .onDelete(`/users/${userId}`)
        .reply(404, { message: 'User Not Found' });

      await expect(userService.deleteUser(userId)).rejects.toThrow(
        'Request failed with status code 404'
      );
    });
  });
});
