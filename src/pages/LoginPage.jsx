import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import Swal from "sweetalert2";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await authService.login(username, password);
            console.log('Login successful', response.data);
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("userName", response.data.username);
            localStorage.setItem("userEmail", response.data.email);
            localStorage.setItem("userRole", response.data.roles);

           
            Swal.fire({
                title: 'Login Successful!',
                text: 'Welcome back, ' + response.data.username,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate("/"); 
            });
        } catch (error) {
            console.error('Login failed', error.response.data);

            Swal.fire({
                title: 'Login Failed!',
                text: error.response.data.message || 'Please try again.',
                icon: 'error',
                confirmButtonText: 'Retry'
            });
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
            <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-700">
                    DaisyUI
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Email Address"
                            className="w-full input input-bordered"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full input input-bordered"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
                    <div>
                        <button className="btn btn-block btn-neutral">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;