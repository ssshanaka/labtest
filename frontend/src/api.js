import axios from "axios";

const api = axios.create({
  // Point to the backend URL. When deployed, change this to the deployed backend URL.
  baseURL: "https://labtest-production-2ae1.up.railway.app/api/items",
});

export default api;
