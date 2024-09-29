import React, { useEffect, useState} from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import courseService from "../services/course.service";

const AdminPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");

    if (!userRole || !userRole.includes("ROLES_ADMIN")) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You do not have permission to access this page.",
        confirmButtonText: "OK",
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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await courseService.deleteCourse(id);
          setCourses(courses.filter((course) => course.id !== id));
          Swal.fire("Deleted!", "The course has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting course:", error);
          setErrorMessage("Failed to delete course. Please try again later.");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        <p className="text-blue-500 ml-2">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      <Link to="/add" className="btn btn-primary mb-4">Add Course</Link>
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
                <Link to={`/courses/edit/${course.id}`} className="btn btn-warning mr-2">
                  Edit
                </Link>
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