import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode
import "../Styles/Navbar.css";
import profileDefaultImage from '../images/User_Icon.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploadPromptOpen, setUploadPromptOpen] = useState(false);
  const [isImageUploadPromptOpen, setImageUploadPromptOpen] = useState(false);
  const [isDeletePromptOpen, setDeletePromptOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [address, setAddress] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let chefId = null;

  if (token) {
    const decodedToken = jwtDecode(token);
    chefId = decodedToken.id; // Extract chefId from the token
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUploadPrompt = () => {
    setUploadPromptOpen(!isUploadPromptOpen);
  };

  const toggleImageUploadPrompt = () => {
    setImageUploadPromptOpen(!isImageUploadPromptOpen);
  };

  const toggleDeletePrompt = () => {
    setDeletePromptOpen(!isDeletePromptOpen);
    setErrorMessage("");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
      toggleImageUploadPrompt();
    }
  };

  const handleAddressEditToggle = async () => {
    if (isEditingAddress) {
      try {
        const response = await fetch(`http://localhost:4000/api/chefs/${chefId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ address }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Address updated successfully.");
        } else {
          setErrorMessage(data.message || "Error updating address.");
        }
      } catch (error) {
        console.error("Error updating address:", error);
        setErrorMessage("An error occurred while updating the address.");
      }
    }

    setIsEditingAddress(!isEditingAddress);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    if (!password) {
      setErrorMessage("Password cannot be empty.");
      return false;
    }
    return true;
  };

  const handleDeleteAccount = async () => {
    if (!validateInput()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/chefs/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account deleted successfully.");
        navigate('/');
      } else {
        setErrorMessage(data.message || "Error deleting account.");
      }
    } catch (error) {
      console.error("Error during account deletion:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      toggleDeletePrompt();
      setEmail("");
      setPassword("");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/chefs/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        localStorage.removeItem('token');
        alert("Logged out successfully.");
        navigate('/login');
      } else {
        alert("Error logging out.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <nav className='navbarmain'>
      <div className="navbar">
        <div className="logo">DineAtHome</div>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><NavLink to="/homechefhome" onClick={toggleMenu} activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/homechefshop" onClick={toggleMenu} activeClassName="active">Shop</NavLink></li>
          <li><NavLink to="/homecheffaqs" onClick={toggleMenu} activeClassName="active">FAQs</NavLink></li>
          <li><NavLink to="/history" onClick={toggleMenu} activeClassName="active">History</NavLink></li>
          <li><NavLink to="/notification" onClick={toggleMenu} activeClassName="active">Notifications</NavLink></li>
          <li><NavLink to="/homechefourinfo" onClick={toggleMenu} activeClassName="active">Our Info</NavLink></li>
        </div>

        <div className="profile" onClick={toggleUploadPrompt}>
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="profile-img" />
          ) : (
            <img src={profileDefaultImage} alt="No profile uploaded" className="profile-img" />
          )}
        </div>

        <div className="menu-toggle" onClick={toggleMenu}>
          <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
        </div>
      </div>

      {/* Upload Prompt for Editing Profile */}
      {isUploadPromptOpen && (
        <div className="halfHalf">
          <div className="clickedProfile">
            <div className='editProfile'>
              <p>Edit Profile</p>
              <button className='EditBtnOfclickedProfile' onClick={toggleImageUploadPrompt}>Edit</button>
            </div>

            <div className='logOutProfile'>
              <p>Log Out</p>
              <button className='logOutBtnOfclickedProfile' onClick={handleLogout}>Logout</button>
            </div>

            <div className='deleteAccount'>
              <p>Delete My Account</p>
              <button className='DeleteBtnOfclickedProfile' onClick={toggleDeletePrompt}>Delete</button>
            </div>

            <button className='closeForclickedProfile' onClick={toggleUploadPrompt}>Close</button>
          </div>
        </div>
      )}

      {/* Image Upload Prompt */}
      {isImageUploadPromptOpen && (
        <div className="forAddressAndProfilePhoto">
          <div className="upload-prompt">
            <h3>Upload Photo :</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <div className="addressSectionMain">
            <div className='addressSection'>
              <p>Address:</p>
              {isEditingAddress ? (
                <textarea
                  value={address}
                  onChange={handleAddressChange}
                  placeholder="Enter your address"
                  rows={4}
                />
              ) : (
                <textarea
                  value={address || "No address set."}
                  readOnly
                  rows={4}
                  style={{ backgroundColor: '#f9f9f9' }}
                />
              )}
            </div>
            <button className='addressSectionbutton' onClick={handleAddressEditToggle}>
              {isEditingAddress ? "Done" : "Edit Address"}
            </button>
          </div>
          <button className='upload-promptbutton' onClick={toggleImageUploadPrompt}>Close</button>
        </div>
      )}

      {/* Delete Confirmation Prompt */}
      {isDeletePromptOpen && (
        <div className="delete-confirmation-prompt">
          <h3>Confirm Account Deletion</h3>
          <p>Please enter your email and password to confirm:</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button onClick={handleDeleteAccount}>Done</button>
          <button onClick={toggleDeletePrompt}>Cancel</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
