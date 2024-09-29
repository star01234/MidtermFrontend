import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import courseService from "../services/course.service"; 

const EditCourse = () => {
    const { id } = useParams(); // Get the course ID from the URL
    const navigate = useNavigate();
    
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseInstructor, setCourseInstructor] = useState("");

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await courseService.getCourse(id); // Ensure this matches your service method
                const course = response.data;
                setCourseName(course.name);
                setCourseDescription(course.description);
                setCourseInstructor(course.instructor);
            } catch (error) {
                console.error("Error fetching course:", error);
            }
        };

        fetchCourse();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await courseService.updateCourse(id, {
                name: courseName,
                description: courseDescription,
                instructor: courseInstructor,
            });

            // Navigate to the course list after saving
            navigate('/courses');
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-2">Course Name:</label>
                    <input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="mt-4">
                    <label className="block mb-2">Description:</label>
                    <textarea
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        className="textarea textarea-bordered w-full"
                        required
                    ></textarea>
                </div>
                <div className="mt-4">
                    <label className="block mb-2">Instructor:</label>
                    <input
                        type="text"
                        value={courseInstructor}
                        onChange={(e) => setCourseInstructor(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-4">Save Changes</button>
            </form>
        </div>
    );
};

export default EditCourse;
