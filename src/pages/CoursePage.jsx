import React, { useEffect, useState } from "react";  
import axios from "axios";

const CoursePage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const fetchCourses = async () => {
            try {
              const response = await axios.get(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_RESTO_API}`);
              console.log('Courses:', response.data);
              setCourses(response.data); 
            } catch (error) {
              console.error('Error fetching courses:', error);
            } finally {
              setLoading(false); 
            }
        };
  
      fetchCourses();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Courses</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">ID</th>
              <th className="border border-gray-200 px-4 py-2">Name</th>
              <th className="border border-gray-200 px-4 py-2">Description</th>
              <th className="border border-gray-200 px-4 py-2">Instructor</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="border border-gray-200 px-4 py-2">{course.id}</td>
                <td className="border border-gray-200 px-4 py-2">{course.name}</td>
                <td className="border border-gray-200 px-4 py-2">{course.description}</td>
                <td className="border border-gray-200 px-4 py-2">{course.instructor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  
export default CoursePage;