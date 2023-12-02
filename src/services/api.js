import axios from 'axios';


const api = axios.create({
  baseURL: 'http://apivert.willian-yamakawa.top/api',
});

axios.defaults.headers.post['Content-Type'] = 'application/json';

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("@token");
    if (token) {
      config.headers = {
        Authorization: `Basic ${token}`,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log('aquiiiii');
    return response;
  },
  (error) => {
    console.log('entrou aqui');
    const responseData = error.response && error.response.data;

    if (responseData && (responseData.unauthorized || responseData.unauthenticated)) {
      localStorage.removeItem('@token');
    }

    return Promise.reject(error);
  }
);

export default api;