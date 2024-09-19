import React from 'react';
import { useNavigate } from 'react-router-dom';
import ''; // Certifique-se de que o arquivo CSS está sendo importado

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem('token');

    // Redireciona para a página de login
    navigate('/login');
  };

  return (
    <div className="logoutButton">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
