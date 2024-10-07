// ForgetPasswordForm.js
import React, { useState } from "react";
import axiosInstance from '../utils/axiosService';
import { useNotification } from './NotificationContext';

const ForgetPasswordForm = ({ onBackToLogin }) => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const { triggerNotification } = useNotification();

    const handleEmailVerification = async () => {
        try {
            const response = await axiosInstance.post("/email/email-Verification", { email });
            
            if (response.data.status) {
                triggerNotification('Email already exists. Sending OTP...', 'blue');
                handleSendOtp(); 
            } else {
                triggerNotification('Email does not exist.', 'red');
            }
        } catch (error) {
            console.error("Error verifying email:", error);
            triggerNotification('An error occurred during email verification.', 'red');
        }
    };

    const handleSendOtp = async () => {
        try {
            const response = await axiosInstance.post("/email/forgot-password", { email });
            
            if (response.data) {
                setIsOtpSent(true);
                triggerNotification('OTP sent successfully!', 'green');
            } else {
                triggerNotification('Failed to send OTP', 'red');
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            triggerNotification('An error occurred while sending OTP', 'red');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await axiosInstance.post("/email/otp-verification", { email, otp: otp.toString() });
            
            if (response.data.status) {
                setIsOtpVerified(true);
                triggerNotification('OTP verified successfully!', 'green');
            } else {
                triggerNotification('Invalid OTP, please try again', 'red');
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            triggerNotification('An error occurred while verifying OTP', 'red');
        }
    };

    const handleSubmitNewPassword = async () => {
        try {
            const response = await axiosInstance.post("/email/reset-password", { email, newPassword });
            
            if (response.data.status) {
                triggerNotification('Password changed successfully!', 'green');
                setTimeout(() => {
                    onBackToLogin(); // Navigate back to login form after success
                }, 2000);
            } else {
                triggerNotification('Failed to reset password, please try again', 'red');
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            triggerNotification('An error occurred while resetting password', 'red');
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
                    <button type="button" onClick={handleEmailVerification} style={{ marginTop: "5px" }}>
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
                    <button type="button" onClick={handleVerifyOtp} style={{ marginTop: "5px" }}>
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
                    <button type="button" onClick={handleSubmitNewPassword} style={{ marginTop: "5px" }}>
                        Submit
                    </button>
                </div>
            )}
            <button type="button" onClick={onBackToLogin} style={{ marginTop: "5px" }}>
                Back to Login
            </button>
        </div>
    );
};

export default ForgetPasswordForm;
