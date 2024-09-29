import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_RESTO_API}`; 

const getAllCourses = () => {
  return axios.get(API_URL);
};

// export the functions you want to use
export default {
  getAllCourses,
};