import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import courseService from '../services/course.service'

const AdminPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      const userRole = localStorage.getItem("userRole");
      if (userRole !== "admin") {
        Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: 'You do not have permission to access this page.',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate("/");
        });
      } else {
        
        const fetchCourses = async () => {
          try {
            const response = await courseService.getAllCourses();
            setCourses(response.data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching courses:", error);
            setErrorMessage("Failed to fetch courses. Please try again later.");
            setLoading(false);
          }
        };
  
        fetchCourses();
      }
    }, [navigate]);
  
    const handleDeleteCourse = async (id) => {
      try {
        await courseService.deleteCourse(id); // ฟังก์ชันสำหรับลบรายวิชา
        setCourses(courses.filter((course) => course.id !== id));
      } catch (error) {
        console.error("Error deleting course:", error);
        setErrorMessage("Failed to delete course. Please try again later.");
      }
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">ID</th>
              <th className="border border-gray-200 px-4 py-2">Name</th>
              <th className="border border-gray-200 px-4 py-2">Description</th>
              <th className="border border-gray-200 px-4 py-2">Instructor</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="border border-gray-200 px-4 py-2">{course.id}</td>
                <td className="border border-gray-200 px-4 py-2">{course.name}</td>
                <td className="border border-gray-200 px-4 py-2">{course.description}</td>
                <td className="border border-gray-200 px-4 py-2">{course.instructor}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default AdminPage;