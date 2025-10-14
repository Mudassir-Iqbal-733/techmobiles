import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});