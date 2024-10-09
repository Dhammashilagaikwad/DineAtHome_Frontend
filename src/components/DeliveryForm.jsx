import React, { useState } from "react";
import '../styles/DeliveryExecutive.css'; // Ensure this file has styles for the form if needed
import axiosInstance from '../utils/axiosService';
import toastService from "../utils/toastService";
import { useNotification } from "./NotificationContext";

const DeliverForm = () => {
  const { triggerNotification } = useNotification();

  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    city: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend
      const response = await axiosInstance.post('/deliveryPerson/delivery', formData);
      
      if (response.data.status) {
        setMessage("Form submitted successfully!");
        setFormData({
          name: "",
          mobileNumber: "",
          email: "",
          city: "",
          address: "",
        })
        // Show the alert pop-up
        // window.alert("Form submitted successfully!");
        triggerNotification("Form submitted successfully!",'green')
      } else {
        setMessage("Error: " + response.data.message);
        // window.alert("Error submitting the form.");
        triggerNotification("Error submitting the form.",'red')
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Something went wrong, please try again.");
      // window.alert("Something went wrong, please try again.");
      triggerNotification("Something went wrong, please try again.",'red')
    }
  };

  return (
    <div className="deliver-form">
      <h2 className="form-heading">GET IN TOUCH</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="form-input half-input"
            required
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="form-input half-input"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="form-input"
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="form-textarea"
          required
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DeliverForm;
