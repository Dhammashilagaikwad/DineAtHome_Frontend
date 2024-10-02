import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import "../styles/SearchPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate=useNavigate();

  const [isJoinUsDropdownOpen, setJoinUsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [isAboutUsDropdownOpen,setAboutUSDropdownOpen]=useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const searchRef = useRef(null);
  const joinUsRef = useRef(null);
  const languageRef = useRef(null);
  const aboutusRef=useRef(null);
  const panelRef = useRef(null);

  const toggleJoinUsDropdown = () => {
    setJoinUsDropdownOpen(!isJoinUsDropdownOpen);
  };
  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!isLanguageDropdownOpen);
  };
  const toggleAboutUsDropdown = () =>{
    setAboutUSDropdownOpen(!isAboutUsDropdownOpen);
  }

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setLanguageDropdownOpen(false);
    setIsOpen(false)
  };

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsOpen(false); 
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
    if (joinUsRef.current && !joinUsRef.current.contains(event.target)) {
      setJoinUsDropdownOpen(false);
    }
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchOpen(false);
    }
    if (languageRef.current && !languageRef.current.contains(event.target)) {
      setLanguageDropdownOpen(false);
    }
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      setIsPanelVisible(false);
    }
    if(aboutusRef.current && !aboutusRef.current.contains(event.target)){
      setAboutUSDropdownOpen(false);
    }
    // if (!document.querySelector('.nav-links').contains(event.target)) {
    //   setIsOpen(false); // Close the menu when clicking outside of it
    // }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLoginClick = () => {
    setIsLoginForm(true);
    setIsPanelVisible(true);
  };

  const handleSignUpClick = () => {
    setIsLoginForm(false);
    setIsPanelVisible(true);
  };

  const handleUserIconClick = () => {
    setIsPanelVisible(!isPanelVisible);
  };
  const [isForgetPassword, setIsForgetPassword] = useState(false); // New state for Forget Password

  const handleForgotPasswordClick = () => {
    setIsForgetPassword(true); // Show Forget Password form
  };

  const handleBackToLogin = () => {
    setIsForgetPassword(false); // Go back to the login form
  };

  
  const handleLoginButton = async (e) => {
    e.preventDefault();
    
    const email = e.target[0].value;
    const password = e.target[1].value;

    console.log("Email:", email); // Log email for debugging
    console.log("Password:", password); // Log password for debugging

    try {
        const response = await axios.post("http://localhost:4000/api/login", {
            email,
            password,
        });

        console.log("Response:", response.data); // Log the entire response

        if (response.data && response.data.token) { // Check for token
            // Store the token in localStorage
            localStorage.setItem("token", response.data.token); 
            // Store the username in localStorage
            localStorage.setItem("username", response.data.username); 

            if (response.data.role === "chef") {
                console.log("Chef logged in");
                alert("Chef logged in");
                navigate("/homechefhome");
            } else if (response.data.role === "user") {
                console.log("User logged in");
                navigate("/afterloginpage");
            }
        } else {
            console.error("Token not found in response");
        }
    } catch (error) {
        console.error("Error logging in:", error.response ? error.response.data : error);
        alert("Invalid email or password.");
    }
};



 

  const handleSignupButton = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      // Send form data to the backend
      const response = await axios.post("http://localhost:4000/api/user/signup", { username, email, password });
      

      if (response.data.status) {
        // Signup successful, you can navigate the user or show a success message
        alert("Signup successful!, Please Login!");
        // navigate("/afterloginpage"); // Navigate to the desired page after successful signup
      } else {
        // Handle error from backend
        alert(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error('Signup error: ', error);
      const errorMessage = error.response?.data?.message || 'Something went wrong, please try again';
      alert(`Signup failed: ${errorMessage}`);
    }
  }


  
  // const [citySearch, setCitySearch] = useState("");

  // const handleCitySearch = (e) => {
  // setCitySearch(e.target.value);
  // };

  // const filteredCities = cities.filter((city) =>
  //   city.toLowerCase().includes(citySearch.toLowerCase())
  // );

  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [showCityList, setShowCityList] = useState(false);
  
  const cities = [
    "Colaba","Bandra","Andheri","Juhu","Churchgate","Dadar","Kurla","Goregaon","Malad",
    "Powai","Lower Parel","Vashi","Borivali","Khar","Santacruz","Marine Drive","Versova",
    "Matunga","Mahim","Worli","Sion","Parel","Ghatkopar","Mulund","Kandivali","Dahisar",
    "Bhayandar","Jogeshwari","Oshiwara","Saki Naka","Mahalaxmi","Chor Bazaar","Malabar Hill",
    "Wadala","Marine Drive","Ballard Estate","Kala Ghoda","Fort","Crawford Market","Byculla",
    "Mazgaon","Bhandup","Charni Road","Grant Road","Mumbai Central","Elphinstone Road","Vile Parle",
];
  const handleCityChange = (city) => {
    setSelectedCity(city);
    setShowCityList(false); // Close the dropdown after selection
  };

  const toggleCityList = () => {
    setShowCityList(!showCityList); // Toggle the city list display
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h3>DineAtHome</h3>

        <div className="mumbaiLocation">
        <i
          className="fa-solid fa-location-dot minilocation"

          onClick={toggleCityList}
        ></i>
        <p id="Mumbai" onClick={toggleCityList}>{selectedCity}</p>
        <i class="fa-regular fa-square-caret-down mumbaiNearminilocation"  onClick={toggleCityList}></i>
      </div>

        </div>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={toggleMenu}>
            HOME
          </Link>
        </li>
        <li
          id="navs"
          onClick={(e) => {
            e.stopPropagation(); // Prevents event from bubbling to the parent toggleMenu
            toggleAboutUsDropdown();
          }}
          ref={aboutusRef}
        >
          <div className={`aboutdropdown ${isAboutUsDropdownOpen ? "show" : ""}`}>
            <Link to="#" onClick={(e) => e.preventDefault()}>
              OUR INFO
            </Link>{" "}
            {/* Prevents link default action */}
            <div className="aboutdropdown-options">
              <Link to="/ourinfo" onClick={toggleMenu}>
                About Us
              </Link>
              <Link to="/ourchefsinfo" onClick={toggleMenu}>
                Our Chefs
              </Link>
            </div>
          </div>
        </li>
        <li>
          <Link to="/shop" onClick={toggleMenu}>
            SHOP
          </Link>
        </li>
        <li>
          <Link to="/faqs" onClick={toggleMenu}>
            FAQs
          </Link>
        </li>

        <li
          id="navs"
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
            {/* Prevents link default action */}
            <div className="dropdown-options">
              <Link id="joinus" to="/home" onClick={toggleMenu}>
                HomeChef
              </Link>
              <Link id="joinus" to="/delivery" onClick={toggleMenu}>
                Delivery Executive
              </Link>
            </div>
          </div>
        </li>

      <div className="icons">
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
          <li>
            <Link
              id="navs-icons"
              className="user-icon"
              onClick={handleUserIconClick}
            >
              <i className="fa-solid fa-user"></i>
            </Link>
            <div
              className={`slide-panel ${isPanelVisible ? "visible" : ""}`}
              ref={panelRef}
            >
              <button className="slide-panel-button" onClick={handleLoginClick}>
                Login
              </button>
              <button
                className="slide-panel-button"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
              <div className="form-container">
                {isForgetPassword ? (
                  <ForgetPasswordForm onBackToLogin={handleBackToLogin} />
                ) : isLoginForm ? (
                  <div className="login-form">
                    <h3>Login</h3>
                    <form  onSubmit={handleLoginButton}>
                      <input type="email" placeholder="Email" name="email" required />
                      <input type="password" name="password" placeholder="Password" required />
                      <button type="submit" style={{ marginBottom: "5px" }}>
                        Login
                      </button>
                      <button type="button" onClick={handleForgotPasswordClick}>
                        Forgot Password
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="signup-form">
                    <h3>Sign Up</h3>
                    <form onSubmit={handleSignupButton}>
                      <input type="text" placeholder="Name" name="username" required />
                      <input
                        type="email" name="email"
                        placeholder="Email"
                        required
                      />
                      <input type="password" placeholder="Password" name="password" required />
                      <button type="submit">Sign Up</button>
                      <p
                        style={{
                          fontSize: "12px",
                          fontFamily: "Arial",
                          marginTop: "10px",
                        }}
                      >
                        *Sign up for Homechef is at Join Us Page
                      </p>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </li>
          <li>
            <Link onClick={handleSearchIconClick} id="navs-icons">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
          </li>
          <li>
            <Link id="navs-icons" to="/cart" onClick={toggleMenu}>
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </li>
          <li>
            <Link id="navs-icons" to='/howtoorder' onClick={toggleMenu}>
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

        {showCityList && (
        <div className="city-popup">
          <input type="text" placeholder="Enter your city" className="city-input" />
          <ul className="city-list">
            {cities.map((city, index) => (
              <li key={index} onClick={() => handleCityChange(city)}>
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

function ForgetPasswordForm({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailVerification = async () => {
    try {
        const response = await axios.post("http://localhost:4000/email/email-Verification", { email });
        
        if (response.data.status) {
            alert("Email already exists. Sending OTP...");
            // Proceed to send the OTP
            handleSendOtp(); // Call your send OTP function here
        } else {
            alert("Email does not exist.");
        }
    } catch (error) {
        console.error("Error verifying email:", error);
        alert("An error occurred during email verification.");
    }
};

const handleSendOtp = async () => {
  try {
    const response = await axios.post("http://localhost:4000/email/forgot-password", {
      email,
    });

    console.log(response.data); // Log to inspect the structure

    if (response.data ) {
      setIsOtpSent(true);
      alert("OTP sent successfully!");
    } else  {
      alert("Failed to send OTP");
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    alert("An error occurred while sending OTP");
  }
};

const handleVerifyOtp = async () => {
  try {
    console.log('Email:', email); // Log email
      console.log('OTP:', otp); // Log OTP being verified

    const response = await axios.post("http://localhost:4000/email/otp-verification", {
      email, // same phoneNumber used to send the OTP
      otp:otp.toString(),
    });
    console.log('OTP Verification Response:', response.data); 
    if (response.data.status ) {
      setIsOtpVerified(true);
      alert("OTP verified successfully!");
    } else {
      alert("Invalid OTP, please try again");
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    alert("An error occurred while verifying OTP");
  }
};

const handleSubmitNewPassword = async () => {
  try {
    const response = await axios.post("http://localhost:4000/email/reset-password",  {
      email, // or email
      newPassword,
    });
    
    if (response.data.status) {
      setSuccessMessage("Password changed successfully!");
      alert("Password changed successfully!");
      setTimeout(() => {
        onBackToLogin(); // Navigate back to login form after success
      }, 2000);
    } else {
      alert("Failed to reset password, please try again");
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    alert("An error occurred while resetting password");
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
          <button
            type="button"
            onClick={handleEmailVerification}
            style={{ marginTop: "5px" }}
          >
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
          <button
            type="button"
            onClick={handleVerifyOtp}
            style={{ marginTop: "5px" }}
          >
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
          <button
            type="button"
            onClick={handleSubmitNewPassword}
            style={{ marginTop: "5px" }}
          >
            Submit
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={onBackToLogin}
        style={{ marginTop: "5px" }}
      >
        Back to Login
      </button>
    </div>
  );
}


export default Navbar;
