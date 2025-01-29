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
import HomePage from '../features/home/pages/HomePage'; // <-- Nuevo componente

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* RUTAS PROTEGIDAS */}
        <Route path="/" element={<PrivateRoute />}>
          {/* Index => Home con links */}
          <Route index element={<HomePage />} />

          {/* Libros */}
          <Route path="books" element={<BookList />} />
          <Route path="books/create" element={<BookCreate />} />
          <Route path="books/edit/:id" element={<BookEdit />} />

          {/* Préstamos */}
          <Route path="loans" element={<LoanList />} />
          <Route path="loans/create" element={<LoanCreate />} />

          {/* Reportes => Solo bibliotecario/admin (puedes poner otra PrivateRoute si quieres) */}
          <Route path="reports" element={<AdminReports />} />
        </Route>

        {/* RUTA POR DEFECTO */}
        <Route path="*" element={<h2>404 - Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
