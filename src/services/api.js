import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5022/api',
});

export default api;