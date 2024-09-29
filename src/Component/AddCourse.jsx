import React, { useState } from "react";
import Swal from "sweetalert2";
import courseService from "../services/course.service"; 

const AddCourse = () => {
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseInstructor, setCourseInstructor] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await courseService.addCourse({
                name: courseName,
                description: courseDescription,
                instructor: courseInstructor,
            });

            Swal.fire({
                icon: 'success',
                title: 'Course Added',
                text: 'The course has been added successfully.',
            });
            setCourseName("");
            setCourseDescription("");
            setCourseInstructor("");
        } catch (error) {
            console.error("Error adding course:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add course. Please try again.',
            });
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Add New Course</h1>
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
                <button type="submit" className="btn btn-primary mt-4">Add Course</button>
            </form>
        </div>
    );
};

export default AddCourse;
