import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/AfterLoginNavbar.css";
import "../styles/SearchPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AfterLoginNavbar = () => {

  // const navigate=useNavigate();

  // const [isJoinUsDropdownOpen, setJoinUsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [isUserDropdownOpen,setUserDropdownOpen]=useState(false);
//   const [isPanelVisible, setIsPanelVisible] = useState(false);
//   const [isLoginForm, setIsLoginForm] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const searchRef = useRef(null);
  const languageRef = useRef(null);
  const userRef=useRef(null);

  const toggleUserDropdown=()=>{
    setUserDropdownOpen(!isUserDropdownOpen);
  }
  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setLanguageDropdownOpen(false);
  };

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
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
    if (languageRef.current && !languageRef.current.contains(event.target)) {
      setLanguageDropdownOpen(false);
    }
    if (userRef.current && !userRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
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
      const response = await axios.post("http://localhost:4000/api/user/logout", {
        withCredentials: true, // Ensure cookies are included in the request
      });

      if (response.status === 200) {
        
        localStorage.removeItem("token"); // Remove token
        localStorage.removeItem("username"); // Remove username (adjust the key if needed)
        alert("Logged out successfully");
        // Redirect to the homepage or login page after successful logout
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };


  return (
    <nav className="navbar2">
      <div className="userlogo">
        <h3>DineAtHome</h3>
      </div>

      <div className={`nav-links1 ${isOpen ? "open" : ""}`}>
        <li>
          <Link to="/afterloginpage" onClick={toggleMenu}>
            HOME
          </Link>
        </li>
        <li>
          <Link to="/userourinfo" onClick={toggleMenu}>
            OUR INFO
          </Link>
        </li>
        <li>
          <Link to="/usershop" onClick={toggleMenu}>
            SHOP
          </Link>
        </li>
        <li>
          <Link to="/userfaqs" onClick={toggleMenu}>
            FAQs
          </Link>
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
          <li ref={languageRef}>
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
          </li>

          <li onClick={toggleUserDropdown}
          ref={userRef}>
            <Link
              id="navs-icons"
              className={`user-icon ${isUserDropdownOpen ? "show":""}`}>
              <i className="fa-solid fa-user" style={{color:"orange",paddingTop:"0"}}></i>
              <div className="userdropdown-options">
              <Link id="editprofile" to="/editprofile">
                Profile
              </Link>
              <Link id="logout" to="/" onClick={handleLogout}>
                Logout
              </Link>
            </div>
            </Link>
          </li>

          <li>
            <Link onClick={handleSearchIconClick} id="navs-icons">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
          </li>
          <li>
            <Link id="navs-icons" to="/usercart">
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Cart Items: {cartItems.length}</span> {/* Example use of cartItems */}
            </Link>
          </li>
          <li>
            <Link id="navs-icons" to='/afterloginhowtoorder' onClick={toggleMenu}>
            <button className="howorder">How To Order</button>
            </Link>
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

