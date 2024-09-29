import React, { useEffect, useState } from "react";

const UserProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        // Fetch data from localStorage when the component loads
        const storedUsername = localStorage.getItem("userName");
        const storedEmail = localStorage.getItem("userEmail");
        const storedUserRole = localStorage.getItem("userRole");

        setUsername(storedUsername);
        setEmail(storedEmail);
        setUserRole(storedUserRole);
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <div className="card card-side bg-base-100 shadow-xl">
                <figure>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvIipkaf0CTRxWkhdpUk3AV9EffwVdTeJWCQ&s"
                        alt="Profile"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{username || "N/A"}</h2>
                    <p>Email: {email || "N/A"}</p>
                    <p>Role: {userRole || "N/A"}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
