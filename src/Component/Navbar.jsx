import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const Navbar = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        authService.logout(); 
        navigate("/"); 
    };
  
    const isLoggedIn = !!localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");
    const userName = localStorage.getItem("userName");

    return (
        <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Course Management
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <Link to="/" className="text-white hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/courses" className="text-white hover:underline">
              Courses
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost text-white m-1">
                  {userName || "User"} {/* แสดงชื่อผู้ใช้ */}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </li>
              {userRole === "admin" && (
                <li>
                  <Link to="/admin" className="text-white hover:underline">
                    Admin
                  </Link>
                </li>
              )}
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-white hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-white hover:underline">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;