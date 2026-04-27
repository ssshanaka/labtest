import axios from 'axios';

const api = axios.create({
  // Point to the backend URL. When deployed, change this to the deployed backend URL.
  baseURL: 'http://localhost:5000/api/items',
});

export default api;
