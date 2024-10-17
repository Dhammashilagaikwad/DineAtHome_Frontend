import React, { useState, useEffect, useRef } from "react";
import { Link,NavLink } from "react-router-dom";
import "../styles/AfterLoginNavbar.css";
import "../styles/SearchPage.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosService";
import { useNotification } from "../../components/NotificationContext";

const AfterLoginNavbar = () => {
  // const navigate=useNavigate();

  // const [isJoinUsDropdownOpen, setJoinUsDropdownOpen] = useState(false);
  // const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  // const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const { triggerNotification } = useNotification();

  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  //   const [isPanelVisible, setIsPanelVisible] = useState(false);
  //   const [isLoginForm, setIsLoginForm] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutUsDropdownOpen, setAboutUSDropdownOpen] = useState(false);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const searchRef = useRef(null);
  // const languageRef = useRef(null);
  const userRef = useRef(null);
  const aboutusRef = useRef(null);


  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
  };
  // const toggleLanguageDropdown = () => {
  //   setLanguageDropdownOpen(!isLanguageDropdownOpen);
  // };

  // const handleLanguageChange = (lang) => {
  //   setSelectedLanguage(lang);
  //   setLanguageDropdownOpen(false);
  // };

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
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
    // if (languageRef.current && !languageRef.current.contains(event.target)) {
    //   setLanguageDropdownOpen(false);
    // }
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
      // Make a request to the backend to clear the token
      const response = await axiosInstance.post("/api/user/logout", {
        withCredentials: true, // Ensure cookies are included in the request
      });

      if (response.status === 200) {
        localStorage.removeItem("token"); // Remove token
        localStorage.removeItem("username"); // Remove username (adjust the key if needed)
        // alert("Logged out successfully");
        triggerNotification("Logged out successfully", "green");
        // Redirect to the homepage or login page after successful logout
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // alert("Logout failed. Please try again.");
      triggerNotification("Logout failed. Please try again.", "red");
    }
  };

  return (
    <nav className="navbar2">
      <div className="userlogo">
        <NavLink to="/user/afterloginpage">
          <h3>DineAtHome</h3>
        </NavLink>{" "}
      </div>

      <div className={`nav-links1 ${isOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/user/afterloginpage" onClick={toggleMenu}>
            Home
          </NavLink>
        </li>
        <li>
        <li
          id="navs"
          onClick={(e) => {
            e.stopPropagation(); // Prevents event from bubbling to the parent toggleMenu
            toggleAboutUsDropdown();
          }}
          ref={aboutusRef}
        >
          <div
            className={`user-aboutdropdown ${isAboutUsDropdownOpen ? "show" : ""}`}
          >
            <NavLink to="#" onClick={(e) => e.preventDefault()} >
              About Us
            </NavLink>{" "}
            {/* Prevents link default action */}
            <div className="user-aboutdropdown-options">
              <NavLink to="/user/userourinfo" onClick={toggleMenu} >
                Behind the Kitchen
              </NavLink>
              <NavLink to="/user/userchefinfo" onClick={toggleMenu} >
                Meet The Chefs
              </NavLink>
            </div>
          </div>
        </li>
        </li>
        <li>
          <NavLink to="/user/usershop" onClick={toggleMenu}>
            Shop
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/user/userfaqs" onClick={toggleMenu}>
            FAQs
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/user/userchefsnearyou" onClick={toggleMenu}>
            Pre-Order
          </NavLink>
        </li>

        {/* <li
          id="navs1"
          onClick={(e) => {
            e.stopPropagation(); // Prevents event from bubbling to the parent toggleMenu
            toggleJoinUsDropdown();
          }}
          ref={joinUsRef}
        >
          <div className={`dropdown ${isJoinUsDropdownOpen ? "show" : ""}`}>
            <Link to="#" onClick={(e) => e.preventDefault()}>
              JOIN US
            </Link>{" "}
            <div className="dropdown-options">
              <Link id="joinus" to="/home" onClick={toggleMenu}>
                HomeChef
              </Link>
              <Link id="joinus" to="/delivery" onClick={toggleMenu}>
                Delivery Executive
              </Link>
            </div>
          </div>
        </li> */}

        <div className="icons1">
          {/* <li ref={languageRef}>
            <div
              className={`language-dropdown ${
                isLanguageDropdownOpen ? "show" : ""
              }`}
            >
              <i
                className="fa-solid fa-language"
                id="languageIcon"
                onClick={toggleLanguageDropdown}
              ></i>
              <div className="dropdown-options">
                <Link to="#" onClick={() => handleLanguageChange("en")}>
                  English
                </Link>
                <Link to="#" onClick={() => handleLanguageChange("hi")}>
                  Hindi
                </Link>
                <Link to="#" onClick={() => handleLanguageChange("mr")}>
                  Marathi
                </Link>
              </div>
            </div>
          </li> */}

          <li onClick={toggleUserDropdown} ref={userRef}>
            <NavLink
              id="navs-icons"
              className={`user-icon ${isUserDropdownOpen ? "show" : ""}`}
            >
              <i
                className="fa-solid fa-user"
                style={{ color: "blue", paddingTop: "0" }}
              ></i>
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

          {/* <li>
            <Link onClick={handleSearchIconClick} id="navs-icons">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
          </li> */}
          <li>
            <NavLink id="navs-icons" to="/user/usercart">
              <i style={{color:"black"}} className="fa-solid fa-cart-shopping"></i>
              {/* <span>Cart Items: {cartItems.length}</span> Example use of cartItems */}
            </NavLink>
          </li>
          <li>
            <NavLink
              id="navs-icons"
              to="/user/afterloginhowtoorder"
              onClick={toggleMenu}
            >
              <button className="howorder" style={{color:"black"}}>How To Order</button>
            </NavLink>
          </li>
        </div>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
      </div>

      <div
        ref={searchRef}
        className={`search-slider ${isSearchOpen ? "open" : ""}`}
      >
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
