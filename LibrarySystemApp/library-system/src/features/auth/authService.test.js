import axiosClient from '../../api/axiosClient';
import MockAdapter from 'axios-mock-adapter';
import { authService } from './authService';

const mock = new MockAdapter(axiosClient);

describe('authService', () => {
  afterEach(() => {
    mock.reset();
  });

  it('debería realizar el login correctamente', async () => {
    // Arrange
    const mockResponse = { token: 'fake-jwt-token' };
    mock.onPost('/auth/login').reply(200, mockResponse);

    // Act
    const result = await authService.login('username', 'password');

    // Assert
    expect(result).toEqual(mockResponse);
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].data).toEqual(
      JSON.stringify({ username: 'username', password: 'password' })
    );
  });

  it('debería manejar errores en el login', async () => {
    // Arrange
    mock.onPost('/auth/login').reply(401, { message: 'Unauthorized' });

    // Act & Assert
    await expect(
      authService.login('wrong-user', 'wrong-password')
    ).rejects.toThrow();
  });

  it('debería registrar un usuario correctamente', async () => {
    // Arrange
    const mockResponse = { message: 'User registered successfully' };
    mock.onPost('/auth/register').reply(201, mockResponse);

    // Act
    const result = await authService.register({
      username: 'newuser',
      password: 'password123',
    });

    // Assert
    expect(result).toEqual(mockResponse);
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].data).toEqual(
      JSON.stringify({ username: 'newuser', password: 'password123' })
    );
  });

  it('debería manejar errores en el registro', async () => {
    // Arrange
    mock.onPost('/auth/register').reply(400, { message: 'Bad Request' });

    // Act & Assert
    await expect(
      authService.register({ username: 'invalid', password: 'short' })
    ).rejects.toThrow();
  });
});
