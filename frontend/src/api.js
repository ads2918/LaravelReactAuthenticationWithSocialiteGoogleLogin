import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json',
  },
});

export async function ensureCsrfCookie() {
  await api.get('/sanctum/csrf-cookie');
}

export default api;
export { API_URL };
