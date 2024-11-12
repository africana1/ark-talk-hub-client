import axios from 'axios';

// server port
export const PORT = '5500';

// base url
//export const baseURL = `http://localhost:${PORT}/v1`;
//export const baseURL_SOCKET_IO = `http://localhost:${PORT}`;

export const baseURL = `https://f5yhm7kkof.execute-api.eu-central-1.amazonaws.com/v1`;
export const baseURL_SOCKET_IO = `https://f5yhm7kkof.execute-api.eu-central-1.amazonaws.com/v1`;

//create axios instance
const axiosInstance = axios.create({
  baseURL,
});

const token = `Bearer ${localStorage.getItem('token')}`;

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.defaults.headers.common['Authorization'] = token;

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    config.headers['Content-Type'] = 'application/json';
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
