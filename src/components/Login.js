import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5188/auth/login', {
        username,
        password
      });
      
      // Armazena o token JWT no localStorage
      localStorage.setItem('token', response.data.token);

      // Redireciona para a página padrão (dashboard ou qualquer outra)
      navigate('/pedidos');
    } catch (error) {
      setError('Nome ou senha inválidos.');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2>LCPC</h2>
        <p>Tecnologia construindo o Futuro</p>

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.loginButton}>Entrar</button>

        <p style={styles.forgotPassword}>
          Esqueceu a senha? <a href="/reset-password" style={styles.link}>Clique aqui</a>
        </p>
      </form>
    </div>
  );
};

// Definição de estilos em CSS no mesmo arquivo usando objeto JavaScript
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0'
  },
  form: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '300px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  loginButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  forgotPassword: {
    marginTop: '10px',
  },
  link: {
    color: '#4CAF50',
    textDecoration: 'none',
  },
};

export default Login;
