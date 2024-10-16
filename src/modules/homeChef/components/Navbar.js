import React, { useState, useEffect } from "react";
import { SiCodechef } from "react-icons/si";
import { IoIosNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirecting after logout
import axiosInstance from '../../../utils/axiosService'; // Import the centralized axios instance
import { jwtDecode } from "jwt-decode"; // Make sure jwt-decode is correctly imported

const Navbar = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [isUserProfile, setIsUserProfile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Retrieve the token and decode it to get chefId
  const token = localStorage.getItem('token'); 
  const chefId = token ? jwtDecode(token).id : null; // Decode token to get chefId

  // Function to update the chef's online/offline status in the backend
  const updateStatus = async (status) => {
    try {
      const response = await axiosInstance.put(`/api/chefs/status/${chefId}`, { isActive: status });
      console.log(`Status updated to ${status ? "Online" : "Offline"}`);
    } catch (error) {
        console.error('Error updating status:', error);
    }
};

  // Toggle online/offline status
  const toggleOnlineStatus = async () => {
    const newStatus = !isOnline; // Toggle status
    setIsOnline(newStatus); // Update local state
    await updateStatus(newStatus); // Call function to update the status in the backend
};


  // Function to handle logout
  const handleLogout = async () => {
    try {
      await axiosInstance.post('/api/chefs/logout'); // Backend logout request
      const tokenKey = 'token';
      const tokenBefore = localStorage.getItem(tokenKey);
      
      if (tokenBefore) {
        console.log("Token before logout:", tokenBefore);  // Check token before removal
        localStorage.removeItem(tokenKey);  // Remove token from localStorage
        console.log("Token removed successfully.");
      } else {
        console.log("No token found in localStorage before logout.");
      }
  
      // Ensure this happens after token removal
      const tokenAfter = localStorage.getItem(tokenKey);  // Check if token is removed
      console.log("Token after logout (should be null):", tokenAfter);  // Should be null after removal
  
      navigate('/login');  // Redirect to login page
    } catch (error) {
      console.error('Logout error:', error);  // Handle any errors
    }
  };
  

  // Optional: Use effect to initialize online status from the backend or local storage
  useEffect(() => {
    const fetchInitialStatus = async () => {
      try {
        // Optionally, fetch the current status from the backend if needed
        const response = await axiosInstance.get(`/api/chefs/status/${chefId}`);
        setIsOnline(response.data.isActive); // Assuming the backend returns an isActive field
      } catch (error) {
        console.error('Error fetching initial status:', error);
      }
    };
    
    if (chefId) {
      fetchInitialStatus(); // Fetch initial status on component mount
    }
  }, [chefId]);

  return (
    <>
      <div className="flex justify-between items-center px-5 py-3 shadow-md bg-blue-100 rounded-md">
        <div className="flex items-center">
          <div className="flex gap-2 text-2xl md:text-3xl">
            <SiCodechef />
            <Link to='/home-shefs/dashboard'>
              <h1 className="font-semibold text-lg md:text-2xl text-blue-800">
                Chef's Dashboard
              </h1>
            </Link>
          </div>
        </div>
        <div className="md:flex hidden gap-4 items-center text-blue-800 text-xl">
          <div>
            {/* <label className="relative flex justify-between items-center group p-2">
              <p className="text-base">{isOnline ? "Online" : "Offline"}</p>
              <input
                type="checkbox"
                checked={isOnline}
                onChange={toggleOnlineStatus} // Call toggle function
                className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md cursor-pointer"
              />
              <span className="w-12 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-red-400 rounded-full duration-300 ease-in-out peer-checked:bg-green-600 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
            </label> */}
          </div>
          <Link className="cursor-pointer" to="/home-shefs/dashboard/prenotification">
            <IoIosNotifications />
          </Link>
          <div className="relative cursor-pointer">
            <FaUserCircle onClick={() => setIsUserProfile(!isUserProfile)} />
            {isUserProfile ? (
              <div className="absolute top-[40px] right-0">
                <div className="bg-white shadow-xl px-1 py-2 text-base">
                  <Link to='/home-shefs/dashboard/profile'>
                    <p className="cursor-pointer px-4 hover:shadow-md hover:bg-blue-200 mb-1">
                      Profile
                    </p>
                  </Link>
                  <p className="cursor-pointer px-4 hover:shadow-md hover:bg-blue-200" onClick={handleLogout}>
                    Logout
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <button 
          className="md:hidden text-2xl" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✖' : '☰'} 
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="flex flex-row items-center bg-blue-100 p-4 md:hidden rounded-md">
          {/* <label className="relative flex justify-between items-center group p-2 w-full">
            <p className="text-base">{isOnline ? "Online" : "Offline"}</p>
            <input
              type="checkbox"
              checked={isOnline}
              onChange={toggleOnlineStatus} // Call toggle function
              className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md cursor-pointer"
            />
            <span className="w-12 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-red-400 rounded-full duration-300 ease-in-out peer-checked:bg-green-600 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
          </label> */}
          <Link className="cursor-pointer" to="/home-shefs/dashboard/prenotification">
            <IoIosNotifications className="text-2xl" />
          </Link>
          <div className="relative cursor-pointer">
            <FaUserCircle onClick={() => setIsUserProfile(!isUserProfile)} className="text-2xl" />
            {isUserProfile && (
              <div className="absolute top-[40px] right-0">
                <div className="bg-white shadow-xl px-1 py-2 text-base">
                  <Link to='/home-shefs/dashboard/profile'>
                    <p className="cursor-pointer px-4 hover:shadow-md hover:bg-blue-200 mb-1">
                      Profile
                    </p>
                  </Link>
                  <p className="cursor-pointer px-4 hover:shadow-md hover:bg-blue-200" onClick={handleLogout}>
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
