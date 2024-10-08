import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../Component/Navbar";
import HomePage from "../pages/HomePage";
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CoursePage from "../pages/CoursePage";
import UserDashboard from '../pages/UserDashboard';
import AdminPage from "../pages/AdminPage";
import UserProfile from "../Component/UserProfile";
import AddCourse from "../Component/AddCourse";
import EditCourse from "../Component/EditCourse";

const AppRouter = () => {
    return (
      <Router>
        <Navbar />
        <div className="container mx-auto mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/courses" element={<CoursePage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/add" element={<AddCourse />} />
            <Route path="/Profile" element={<UserProfile />} />
            <Route path="/courses/edit/:id" element={<EditCourse />} />
          </Routes>
        </div>
      </Router>
    );
  };
  
  export default AppRouter;