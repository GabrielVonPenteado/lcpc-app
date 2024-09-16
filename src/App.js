import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Relatorios from './components/Relatorios';
import Pedidos from './components/Pedidos';
import Clientes from './components/Clientes';
import Produtos from './components/Produtos';
import Login from './components/Login'; // Página de Login
import LogoutButton from './components/LogoutButton'; // Botão de Logout
import './App.css'; // Adicione este import para os estilos
import logo from './images/logo512.png'; // Adicione o caminho para sua imagem de logo
import { isAuthenticated } from './utils/auth'; // Função que verifica autenticação

// Rota privada que verifica a autenticação
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Layout principal para rotas autenticadas
const AuthenticatedLayout = ({ children }) => {
  return (
    <div className="app-container">
      <nav className="sidebar">
        <img src={logo} alt="Logo" className="logo" />
        <ul>
          <li>
            <Link to="/pedidos">Pedidos</Link>
          </li>
          <li>
            <Link to="/clientes">Clientes</Link>
          </li>
          <li>
            <Link to="/produtos">Produtos</Link>
          </li>
          <li>
            <Link to="/relatorios">Relatórios</Link>
          </li>
        </ul>
        <LogoutButton />
      </nav>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AuthenticatedLayout>
                <Pedidos /> {/* Página padrão após login */}
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/relatorios"
          element={
            <PrivateRoute>
              <AuthenticatedLayout>
                <Relatorios />
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/pedidos"
          element={
            <PrivateRoute>
              <AuthenticatedLayout>
                <Pedidos />
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <PrivateRoute>
              <AuthenticatedLayout>
                <Clientes />
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/produtos"
          element={
            <PrivateRoute>
              <AuthenticatedLayout>
                <Produtos />
              </AuthenticatedLayout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
