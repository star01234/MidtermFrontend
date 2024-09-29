import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">
        Welcome to the Course Management System
      </h1>
      <p className="text-lg text-gray-700 text-center mb-8">
        This platform allows you to manage your courses efficiently. Whether you're a student or an instructor, you can find all the tools you need to succeed.
      </p>
      
      <div className="bg-white shadow-lg rounded-lg p-6 w-11/12 max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Features:</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Create and manage courses with ease</li>
          <li>View detailed course information</li>
          <li>Track student progress and performance</li>
          <li>Interactive tools for instructors and students</li>
        </ul>
        <a href="/courses" className="btn btn-primary w-full text-center">
          Get Started
        </a>
      </div>
      
      <footer className="mt-10 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Course Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
