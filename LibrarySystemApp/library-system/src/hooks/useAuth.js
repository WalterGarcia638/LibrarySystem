/*import { useState, useEffect, createContext, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import nombrado

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ username: decoded.sub, role: decoded.role || 'User' });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser({ username: decoded.sub, role: decoded.role || 'User' });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {' '}
      {children}{' '}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
*/
import { useState, useEffect, createContext, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decodificamos el token
      const decoded = jwtDecode(token);

      // Extraemos el rol usando la clave EXACTA que aparece en el token
      // "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      const roleFromToken =
        decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      setUser({
        username: decoded.sub,
        role: roleFromToken, // Librarian, Admin, etc.
      });
    }
  }, []);

  /**
   * Llamado cuando el usuario hace login
   */
  const login = (token) => {
    localStorage.setItem('token', token);

    const decoded = jwtDecode(token);
    const roleFromToken =
      decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    setUser({
      username: decoded.sub,
      role: roleFromToken,
    });
  };

  /**
   * Llamado cuando el usuario hace logout
   */
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {' '}
      {children}{' '}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
