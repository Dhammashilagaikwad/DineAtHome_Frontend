import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../styles/LoginPage.css';
import axiosInstance from '../utils/axiosService';
import { useNotification } from './NotificationContext';
import ForgetPasswordForm from './ForgetPasswordForm'; // Import ForgetPasswordForm

const LoginPage = () => {
    const navigate = useNavigate();
    const { triggerNotification } = useNotification();
    const [isForgetPassword, setIsForgetPassword] = useState(false); 

    const handleForgotPasswordClick = () => {
        setIsForgetPassword(true); // Show Forget Password form
    };

    const handleBackToLogin = () => {
        setIsForgetPassword(false); // Go back to the login form
    };

    const handleLoginButton = async (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            const response = await axiosInstance.post("/api/login", { email, password });

            if (response.data && response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.username);

                if (response.data.role === "chef") {
                    triggerNotification('Login successful', 'green');
                    navigate("/home-shefs/dashboard");
                } else if (response.data.role === "user") {
                    triggerNotification('Login successful', 'green');
                    navigate("/user/afterloginpage");
                }
            } else {
                console.error("Token not found in response");
            }
        } catch (error) {
            triggerNotification('Invalid email or password', 'red');
        }
    };

    return (
        <div className="login-containerMain">
            <br /><br /><br /><br />
            <div className="login-container">
                <h2>Log In</h2>
                {isForgetPassword ? (
                    <ForgetPasswordForm onBackToLogin={handleBackToLogin} /> // Use ForgetPasswordForm component
                ) : (
                    <form onSubmit={handleLoginButton}>
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Password" required />
                        <p>
                            New to DineAtHome? 
                            <Link to="/signup"><span>Create account</span></Link>
                        </p>
                        <button type="submit">Log In</button>
                        <button type="button" onClick={handleForgotPasswordClick}>Forgot Password</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
