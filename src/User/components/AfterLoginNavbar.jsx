import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/AfterLoginNavbar.css";
import "../styles/SearchPage.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosService";
import { useNotification } from "../../components/NotificationContext";

const AfterLoginNavbar = () => {
  const { triggerNotification } = useNotification();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutUsDropdownOpen, setAboutUSDropdownOpen] = useState(false);

  const searchRef = useRef(null);
  const userRef = useRef(null);
  const aboutusRef = useRef(null);

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleAboutUsDropdown = () => {
    setAboutUSDropdownOpen(!isAboutUsDropdownOpen);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    const searchResults = [
      "Apple",
      "Banana",
      "Orange",
      "Mango",
      "Grapes",
    ].filter((item) => item.toLowerCase().includes(value.toLowerCase()));
    setItems(searchResults);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchOpen(false);
    }
    if (userRef.current && !userRef.current.contains(event.target)) {
      setUserDropdownOpen(false);
    }
    if (aboutusRef.current && !aboutusRef.current.contains(event.target)) {
      setAboutUSDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/api/user/logout", {
        withCredentials: true,
      });

      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        triggerNotification("Logged out successfully", "green");
        navigate("/");
      }
    } catch (error) {
      triggerNotification("Logout failed. Please try again.", "red");
    }
  };

  return (
    <nav className="navbar2">
      <div className="userlogo">
        <NavLink to="/user/afterloginpage">
          <h3>DineAtHome</h3>
        </NavLink>
      </div>

      <div className={`nav-links1 ${isOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/user/afterloginpage">Home</NavLink>
        </li>
        <li
          id="navs"
          onClick={(e) => {
            e.stopPropagation();
            toggleAboutUsDropdown();
          }}
          ref={aboutusRef}
        >
          <div className={`user-aboutdropdown ${isAboutUsDropdownOpen ? "show" : ""}`}>
            <NavLink to="#" onClick={(e) => e.preventDefault()}>
              About Us
            </NavLink>
            <div className="user-aboutdropdown-options">
              <NavLink to="/user/userourinfo" onClick={() => setIsOpen(false)}>
                Behind the Kitchen
              </NavLink>
              <NavLink to="/user/userchefinfo" onClick={() => setIsOpen(false)}>
                Meet The Chefs
              </NavLink>
            </div>
          </div>
        </li>
        <li>
          <NavLink to="/user/usershop" onClick={() => setIsOpen(false)}>
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/userchefsnearyou" onClick={() => setIsOpen(false)}>
            Pre-Order
          </NavLink>
        </li>
      </div>

      <div className="icons1">
        <li onClick={(e) => { e.stopPropagation(); toggleUserDropdown(); }} ref={userRef}>
          <NavLink id="navs-icons" className={`user-icon ${isUserDropdownOpen ? "show" : ""}`}>
            <i className="fa-solid fa-user" style={{ color: "blue" }}></i>
            <div className="userdropdown-options">
              <NavLink id="editprofile" to="/user/editprofile">
                Profile
              </NavLink>
              <NavLink id="logout" to="/" onClick={handleLogout}>
                Logout
              </NavLink>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink id="navs-icons" to="/user/usercart">
            <i className="fa-solid fa-cart-shopping" style={{ color: "black" }}></i>
          </NavLink>
        </li>
      </div>

      <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
      </div>

      <div ref={searchRef} className={`search-slider ${isSearchOpen ? "open" : ""}`}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for items..."
        />
        <div className="search-results">
          {items.map((item, index) => (
            <div key={index} className="search-item">
              {item}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default AfterLoginNavbar;
