import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/LoginPage.css';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../utils/axiosService';
import { useState } from "react";

const LoginPage = () => {
    const navigate = useNavigate();
    const [isForgetPassword, setIsForgetPassword] = useState(false); // State for Forget Password

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

        console.log("Email:", email); // Log email for debugging
        console.log("Password:", password); // Log password for debugging

        try {
            const response = await axiosInstance.post("/api/login", {
                email,
                password,
            });

            console.log("Response:", response.data); // Log the entire response

            if (response.data && response.data.token) { // Check for token
                // Store the token in localStorage
                localStorage.setItem("token", response.data.token);
                // Store the username in localStorage
                localStorage.setItem("username", response.data.username);

                if (response.data.role === "chef") {
                    console.log("Chef logged in");
                    alert("Chef logged in");
                    navigate("/home-shefs/dashboard");
                } else if (response.data.role === "user") {
                    console.log("User logged in");
                    navigate("/afterloginpage");
                }
            } else {
                console.error("Token not found in response");
            }
        } catch (error) {
            console.error("Error logging in:", error.response ? error.response.data : error);
            alert("Invalid email or password.");
        }
    };

    return (
        <>
            <div className="login-containerMain">
                <br /><br /><br /><br />
                <div className="login-container">
                    <h2>Log In</h2>
                    {isForgetPassword ? ( // Conditional rendering for forgot password
                        <ForgetPasswordForm onBackToLogin={handleBackToLogin} />
                    ) : (
                        <form onSubmit={handleLoginButton}>
                            <input type="email" placeholder="Email" required />
                            <input type="password" placeholder="Password" required />
                            <p>
                                New to DineAtHome?
                                <Link to="/signup"> <span>Create account</span> </Link>
                            </p>
                            <button type="submit">Log In</button>
                            <button type="button" onClick={handleForgotPasswordClick}>Forgot Password</button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

function ForgetPasswordForm({ onBackToLogin }) {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleEmailVerification = async () => {
        try {
            const response = await axiosInstance.post("/email/email-Verification", { email });
            
            if (response.data.status) {
                alert("Email already exists. Sending OTP...");
                // Proceed to send the OTP
                handleSendOtp(); // Call your send OTP function here
            } else {
                alert("Email does not exist.");
            }
        } catch (error) {
            console.error("Error verifying email:", error);
            alert("An error occurred during email verification.");
        }
    };

    const handleSendOtp = async () => {
        try {
            const response = await axiosInstance.post("/email/forgot-password", {
                email,
            });

            console.log(response.data); // Log to inspect the structure

            if (response.data) {
                setIsOtpSent(true);
                alert("OTP sent successfully!");
            } else {
                alert("Failed to send OTP");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("An error occurred while sending OTP");
        }
    };

    const handleVerifyOtp = async () => {
        try {
            console.log('Email:', email); // Log email
            console.log('OTP:', otp); // Log OTP being verified

            const response = await axiosInstance.post("/email/otp-verification", {
                email, // same phoneNumber used to send the OTP
                otp: otp.toString(),
            });
            console.log('OTP Verification Response:', response.data); 
            if (response.data.status) {
                setIsOtpVerified(true);
                alert("OTP verified successfully!");
            } else {
                alert("Invalid OTP, please try again");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("An error occurred while verifying OTP");
        }
    };

    const handleSubmitNewPassword = async () => {
        try {
            const response = await axiosInstance.post("/email/reset-password", {
                email, // or email
                newPassword,
            });
            
            if (response.data.status) {
                setSuccessMessage("Password changed successfully!");
                alert("Password changed successfully!");
                setTimeout(() => {
                    onBackToLogin(); // Navigate back to login form after success
                }, 2000);
            } else {
                alert("Failed to reset password, please try again");
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            alert("An error occurred while resetting password");
        }
    };

    return (
        <div className="forget-password-form">
            <h3>Forgot Password</h3>
            {!isOtpSent ? (
                <div>
                    <input
                        type="text"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={handleEmailVerification}
                        style={{ marginTop: "5px" }}
                    >
                        Verify Email and Send OTP
                    </button>
                </div>
            ) : !isOtpVerified ? (
                <div>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={handleVerifyOtp}
                        style={{ marginTop: "5px" }}
                    >
                        Verify OTP
                    </button>
                </div>
            ) : (
                <div>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={handleSubmitNewPassword}
                        style={{ marginTop: "5px" }}
                    >
                        Submit
                    </button>
                </div>
            )}
            <button
                type="button"
                onClick={onBackToLogin}
                style={{ marginTop: "5px" }}
            >
                Back to Login
            </button>
        </div>
    );
}

export default LoginPage;
