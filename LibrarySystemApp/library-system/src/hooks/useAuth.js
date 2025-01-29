import { useState, useEffect, createContext, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);

      const roleFromToken =
        decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      setUser({
        username: decoded.sub,
        role: roleFromToken,
      });
    }
  }, []);

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
