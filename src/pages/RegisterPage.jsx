import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/auth.service'

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // ตรวจสอบรหัสผ่านยืนยัน
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }
  
      try {
        const response = await authService.register(username, email, password);
        console.log('Registration successful', response.data);
        // เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบหลังจากลงทะเบียนสำเร็จ
        navigate("/login");
      } catch (error) {
        console.error('Registration failed', error.response.data);
        setErrorMessage(error.response.data.message || 'Registration failed! Please try again.');
      }
    };
  
    return (
      <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
        <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-700">
            Register
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                className="w-full input input-bordered"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div>
              <label className="label">
                <span className="text-base label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full input input-bordered"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div>
              <button className="btn btn-block btn-neutral">Register</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default RegisterPage;
