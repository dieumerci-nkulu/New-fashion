// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // important si tu travailles avec des cookies (auth)
});

export default api;
