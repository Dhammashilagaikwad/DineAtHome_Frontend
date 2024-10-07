import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/SignupPage.css'; // Import the CSS file
import { useNavigate } from "react-router-dom";
import toastService from '../utils/toastService';
import tokenService from '../utils/tokenService';
import { useState, useEffect, useRef } from "react";
import axiosInstance from '../utils/axiosService';
import { useNotification } from './NotificationContext';

const SignupPage = () => {
  const { triggerNotification } = useNotification();
  
  const handleSignupButton = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response =await axiosInstance.post("/api/user/signup", { username, email, password });
      

      if (response.data.status) {
        alert("Signup successful!, Please Login!");
        triggerNotification('Signup successful!, Please Login!','green')
      } else {
        // alert(response.data.message || "Signup failed");
        triggerNotification('Signup failed','red')
      }
    } catch (error) {
      console.error('Signup error: ', error);
      const errorMessage = error.response?.data?.message || 'Something went wrong, please try again';
      alert(`Signup failed: ${errorMessage}`);
      // triggerNotification('Something went wrong, please try again','red')
    }
  }

  return (
    <>
      <div className="signup-containerMain">
        <br /><br /><br /><br />

        <div className="signup-container">
          <h2>Sign Up</h2>
          <form  onSubmit={handleSignupButton}>
            <input type="text" placeholder="Name" required name="username"  />
            <input type="email" placeholder="Email" required name="email"/>
            <input type="password" placeholder="Password" required name="password"/>
            <p>
              Already have an account? 
              <Link to="/login"> <span>Log in</span> </Link>
            </p>

            <button type="submit">Sign Up</button>
            <p>*Sign Up for HomeChef for is at Join Us Page</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
