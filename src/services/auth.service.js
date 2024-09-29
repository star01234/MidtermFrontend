import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_AUTH_API}`; 

const login = (username, password) => {
  return axios.post(`${API_URL}/signin`, { username, password });
};

const getCourse = (id) => {
  return axios.get(`${API_URL}/courses/${id}`); // Fetch a course by ID
};

const addCourse = (courseData) => {
  return axios.post(`${API_URL}/courses`, courseData);
};

const updateCourse = (id, courseData) => {
  return axios.put(`${API_URL}/courses/${id}`, courseData); // Update a course
};

const deleteCourse = (id) => {
  return axios.delete(`${API_URL}/courses/${id}`); // Delete a course
};

const logout = () => {
  localStorage.removeItem('accessToken'); 
  localStorage.removeItem('username');
};

// Export all functions
export default {
  login,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  logout,
};