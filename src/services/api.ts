import axios from 'axios';

const api = axios.create({
  baseURL: 'https://foodjordanio.netlify.app/.netlify/functions',
});

export default api;
