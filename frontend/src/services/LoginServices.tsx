// src/services/authService.ts
import axios from 'axios';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:3000/api/user/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error( 'Login failed');
  }
};

export const register = async (name: string, email: string, password: string, role:'user' | 'admin') => {
  try {
    console.log(name,email,password);
    
    const response = await axios.post('http://localhost:3000/api/user/register', { name, email, password ,role});
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};
