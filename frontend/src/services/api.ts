import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5285/api', // Ajuste a porta se o seu .NET rodar em porta diferente
});


export default api;