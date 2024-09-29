import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_AUTH_API}`; 

const login = (username, password) => {
  return axios.post(`${API_URL}/signin`, { username, password });
};

const logout = () => {
    localStorage.removeItem('accessToken'); 
    localStorage.removeItem('username');
}
// export the functions you want to use
export default {
  login,
  logout
};