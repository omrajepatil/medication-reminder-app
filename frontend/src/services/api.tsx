// src/services/api.ts
import axios from 'axios';

// Create an Axios instance with a base URL for your backend API
const api = axios.create({
  baseURL: 'http://your-backend-url/api', // Replace with your actual backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors here if you need to add authorization tokens, etc.

export default api;
