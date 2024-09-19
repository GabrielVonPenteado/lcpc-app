import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Relatorios from './components/Relatorios'; // Certifique-se de que você tenha os componentes
import Pedidos from './components/Pedidos';     // Certifique-se de que você tenha os componentes
import Clientes from './components/Clientes';   // Certifique-se de que você tenha os componentes
import Produtos from './components/Produtos';   // Certifique-se de que você tenha os componentes
import Login from './components/Login';         // Certifique-se de que você tenha os componentes
import logo from './images/logo512.png';        // Certifique-se de que você tenha o logo
import { isAuthenticated } from './utils/auth'; // Função que verifica autenticação

const LogoutButton = ({ handleLogout }) => {
  return (
    <div className="logoutButton">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

// Rota privada que verifica a autenticação
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Layout principal para rotas autenticadas
const AuthenticatedLayout = ({ children }) => {
  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem('token');

    // Redireciona para a página de login
    window.location.href = '/login'; // Simples redirecionamento para o login
  };

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
        <LogoutButton handleLogout={handleLogout} />
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

// CSS embutido no mesmo arquivo (pode ser movido para um arquivo separado se necessário)
const styles = `
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Inter', sans-serif;
  }

  body {
    background-color: #e1e8ee;
  }

  .app-container {
    display: flex;
    height: 100vh;
    overflow: hidden; /* Evitar que o layout tenha scroll lateral */
  }

  .sidebar {
    width: 250px;
    background-color: #5A7696;
    color: #fff;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
  }

  .logo {
    width: 50%;
    margin-bottom: 20px;
  }

  .sidebar ul {
    list-style-type: none;
    padding: 0;
    width: 100%;
  }

  .sidebar li {
    margin: 20px 0;
  }

  .sidebar a {
    text-decoration: none;
    color: #fff;
    font-size: 18px;
    display: block;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: #4D6784;
    text-align: center;
    transition: background 0.3s, transform 0.3s;
  }

  .sidebar a:hover {
    background-color: #405971;
    transform: translateY(-2px);
  }

  .content {
    flex-grow: 1;
    padding: 20px;
    background-color: #ffffff;
    overflow-y: auto; /* Permitir que a parte principal role verticalmente */
  }

  .logoutButton {
    position: absolute;
    bottom: 20px; /* Distância da parte inferior da sidebar */
    left: 20px; /* Alinhado à esquerda */
    width: calc(100% - 40px); /* Para que o botão tenha largura total com espaçamento */
  }

  .logoutButton button {
    width: 100%;
    background-color: #f44336;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    transition: background 0.3s ease-in-out;
  }

  .logoutButton button:hover {
    background-color: #d32f2f;
  }
`;

// Injetar o CSS diretamente no documento
const injectStyles = () => {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = styles;
  document.head.appendChild(styleTag);
};

// Executa a injeção de estilos quando o componente é montado
injectStyles();

export default App;
