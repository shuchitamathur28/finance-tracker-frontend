import axios from 'axios';

const API_URL = 'http://localhost:5000/';

// Register user
const signup = async (userData) => {
  const response = await axios.post(`${API_URL}signup`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token); // Store token
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);
  // console.log("Login response", response);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token); // Store token
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user'); // Remove token on logout
  localStorage.removeItem('expense_user');
};

const AuthService = {
  signup,
  login,
  logout
};

export default AuthService;
