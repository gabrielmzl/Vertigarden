import axios from 'axios';

const api = axios.create({
  baseURL: 'http://apivert.willian-yamakawa.top/api',
});

export default api;