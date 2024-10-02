import React, { useState } from "react";
import "../styles/contactUs.css"; 
// import cors from 'cors';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Log the form data

    try {
        const response = await fetch('http://localhost:4000/api/contact/data/contact-us', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        console.log('API Response:', result); // Log the response from the API
        if (result.status) {
            alert(result.message);
            setFormData({
                name: '',
                email: '',
                mobileNumber: '',
                subject: '',
                message: ''
            });
        } else {
            alert("Submission failed. Please try again.");
        }
    } catch (error) {
        console.error("Error during form submission:", error); // Log the error
        alert("An error occurred. Please try again later.");
    }
};

  return (
    <div className="contact-form-container">
      <h2 className="form-heading">GET IN TOUCH</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="input halfInput"
            required
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="input halfInput"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="input"
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="textarea"
          required
        />
        <button type="submit" className="submitButton">Submit</button>
      </form>
    </div>
  );
};

// const cors = require('cors');
// app.use(cors());

export default ContactForm;
