import React, { useState } from 'react';
import '../styles/InputForm.css';
import TermsCheckbox from '../components/TermsCheckbox';
import axios from 'axios';

const InputForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    phone: "",
    landmark: "",
    address1: "",
    address2: "",
    state: "",
    password: "",
    confirm_password: "", // Ensure this matches with input name
  });

  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false); 
  const [isSubmitted, setIsSubmitted] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); 
  };

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !emailRegex.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    if (!formData.landmark) newErrors.landmark = "Landmark is required";
    if (!formData.address1) newErrors.address1 = "Address 1 is required";
    if (!formData.address2) newErrors.address2 = "Address 2 is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!isChecked) newErrors.terms = "You must agree to the terms and conditions"; 
    
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirm_password) // Make sure to use confirm_password
      newErrors.confirm_password = "Passwords do not match"; // Ensure this matches error key

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:4000/api/chefs/signup', formData);
        console.log("Form Data:", formData);

        if (response.data) {
          console.log("Form Data Submitted Successfully:", response.data);
          setIsSubmitted(true);
          setFormData({
            name: "",
            email: "",
            city: "",
            phone: "",
            landmark: "",
            address1: "",
            address2: "",
            state: "",
            password: "",
            confirm_password: "", // Reset to empty
          });
          setIsChecked(false);
          alert("Successfully submitted");
        }
      } catch (error) {
        console.error('There was an error submitting the form:', error);
      }
    } else {
      console.log("Form validation failed", errors); // Log errors for better debugging
    }
  };

  return (
    <form onSubmit={handleSubmit} className="iform-container">
      <h2 className="iform-title">Join Us As A Home Chef</h2>

      <div className="iform-group inline">
        <div className="iform-input-wrapper">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="iform-input"
          />
          {errors.name && <p className="iform-error">{errors.name}</p>}
        </div>

        <div className="iform-input-wrapper">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="iform-input"
          />
          {errors.phone && <p className="iform-error">{errors.phone}</p>}
        </div>
      </div>

      <div className="iform-group inline">
        <div className="iform-input-wrapper">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="iform-input"
          />
          {errors.email && <p className="iform-error">{errors.email}</p>}
        </div>

        <div className="iform-input-wrapper">
          <input
            type="text"
            name="landmark"
            placeholder="Landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="iform-input"
          />
          {errors.landmark && <p className="iform-error">{errors.landmark}</p>}
        </div>
      </div>

      <div className="iform-group">
        <div className="iform-input-wrapper">
          <input
            type="text"
            name="address1"
            placeholder="Address 1"
            value={formData.address1}
            onChange={handleChange}
            className="iform-input"
          />
          {errors.address1 && <p className="iform-error">{errors.address1}</p>} {/* Updated to address1 */}
        </div>
      </div>

      <div className="iform-group">
        <div className="iform-input-wrapper">
          <input
            type="text"
            name="address2"
            placeholder="Address 2"
            value={formData.address2}
            onChange={handleChange}
            className="iform-input"
          />
          {errors.address2 && <p className="iform-error">{errors.address2}</p>} {/* Updated to address2 */}
        </div>
      </div>

      <div className="iform-group inline">
        <div className="iform-input-wrapper">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="iform-input"
          />
          {errors.city && <p className="iform-error">{errors.city}</p>}
        </div>

        <div className="iform-input-wrapper">
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="iform-input"
          />
          {errors.state && <p className="iform-error">{errors.state}</p>}
        </div>
      </div>

      <div className="iform-group inline">
        <div className="iform-input-wrapper">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="iform-input"
          />
          {errors.password && <p className="iform-error">{errors.password}</p>}
        </div>

        <div className="iform-input-wrapper">
          <input
            type="password"
            name="confirm_password" // Ensure this matches formData key
            placeholder="Confirm Password"
            value={formData.confirm_password} // Ensure this matches formData key
            onChange={handleChange}
            className="iform-input"
          />
          {errors.confirm_password && <p className="iform-error">{errors.confirm_password}</p>} {/* Updated to confirm_password */}
        </div>
      </div>

      <div>
        <TermsCheckbox isChecked={isChecked} onCheckboxChange={handleCheckboxChange} />
        {errors.terms && <p className="iform-error">{errors.terms}</p>}
      </div>

      <button type="submit" className="iform-submit">
        Submit
      </button>
      {isSubmitted && <p className="iform-success">Form submitted successfully!</p>}
    </form>
  );
};

export default InputForm;
