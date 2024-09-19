// src/services/orderService.js
import axios from 'axios';

export const fetchOrdersReport = async (startDate, endDate, status) => {
  const token = localStorage.getItem('token'); // Recupera o token JWT do localStorage

  if (!token) {
    throw new Error('Token não encontrado. Faça o login novamente.');
  }

  try {
    const response = await axios.get('http://localhost:5188/Order/report', {
      params: { startDate, endDate, status },
      headers: {
        Authorization: `Bearer ${token}` // Inclui o token no cabeçalho Authorization
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Não autorizado. Faça login novamente.');
    }
    throw new Error('Erro ao buscar o relatório de pedidos');
  }
};
