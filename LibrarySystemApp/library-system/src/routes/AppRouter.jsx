import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import BookList from '../features/books/pages/BookList';
import BookCreate from '../features/books/pages/BookCreate';
import BookEdit from '../features/books/pages/BookEdit';
import LoanList from '../features/loans/pages/LoanList';
import LoanCreate from '../features/loans/pages/LoanCreate';
import AdminReports from '../features/reports/pages/AdminReports';
import { PrivateRoute } from './PrivateRoute';
import PrivateLayout from '../features/layout/PrivateLayout';
import UserList from '../features/users/pages/UserList';
import UserEdit from '../features/users/pages/UserEdit';

// O un HomePage si lo tienes
const HomePage = () => <h2>Bienvenido a la Biblioteca</h2>;

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route path="/" element={<PrivateRoute />}>
          <Route element={<PrivateLayout />}>
            {/* Ruta / => HomePage */}
            <Route index element={<HomePage />} />

            {/* Libros */}
            <Route path="books" element={<BookList />} />
            <Route path="books/create" element={<BookCreate />} />
            <Route path="books/edit/:id" element={<BookEdit />} />

            {/* Préstamos */}
            <Route path="loans" element={<LoanList />} />
            <Route path="loans/create" element={<LoanCreate />} />

            {/* Reportes */}
            <Route path="reports" element={<AdminReports />} />

            {/* Rutas de Usuarios */}
            <Route path="users" element={<UserList />} />
            <Route path="users/edit/:id" element={<UserEdit />} />
          </Route>
        </Route>

        {/* Ruta no encontrada */}
        <Route path="*" element={<h2>404 - Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
