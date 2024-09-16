import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem('token');

    // Redireciona para a página de login
    navigate('/login');
  };

  return (
    <div style={styles.logoutButton}>
      <button onClick={handleLogout} style={styles.button}>Logout</button>
    </div>
  );
};

// Definição de estilos em CSS no mesmo arquivo usando objeto JavaScript
const styles = {
  logoutButton: {
    position: 'absolute',
    top: '10px',
    right: '20px',
  },
  button: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#d32f2f',
  },
};

export default LogoutButton;
