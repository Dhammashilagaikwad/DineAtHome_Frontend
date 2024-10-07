
import React, { useState, useEffect,useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import '../styles/SearchPage.css'

const Navbar = () => {
  const navigate=useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isJoinUsDropdownOpen, setJoinUsDropdownOpen] = useState(false);
  // const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [isAboutUsDropdownOpen,setAboutUSDropdownOpen]=useState(false);
  // const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  // const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const searchRef = useRef(null);
  const joinUsRef = useRef(null);
  // const languageRef = useRef(null);
  const aboutusRef=useRef(null);
  const panelRef = useRef(null);

  const toggleJoinUsDropdown = () => {
    setJoinUsDropdownOpen(!isJoinUsDropdownOpen);
  };
  // const toggleLanguageDropdown = () => {
  //   setLanguageDropdownOpen(!isLanguageDropdownOpen);
  // };
  const toggleAboutUsDropdown = () =>{
    setAboutUSDropdownOpen(!isAboutUsDropdownOpen);
  }

  const handleScroll = () => {
    if (window.scrollY > 45) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    // if (languageRef.current && !languageRef.current.contains(event.target)) {
    //   setLanguageDropdownOpen(false);
    // }
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
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <h3>DineAtHome</h3>
        {/* <div className="mumbaiLocation">
        <i
          className="fa-solid fa-location-dot minilocation"

          onClick={toggleCityList}
        ></i>
        <p id="Mumbai" onClick={toggleCityList}>{selectedCity}</p>
        <i class="fa-regular fa-square-caret-down mumbaiNearminilocation"  onClick={toggleCityList}></i>
      </div> */}
        </div>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" exact activeClassName="active" onClick={toggleMenu}>Home</NavLink>
        </li>
        <li id="navs"
          onClick={(e) => {
            e.stopPropagation(); // Prevents event from bubbling to the parent toggleMenu
            toggleAboutUsDropdown();
          }}
          ref={aboutusRef}>
          {/* <NavLink to="/faqs" activeClassName="active" onClick={toggleMenu}>FQAs</NavLink> */}
          <div className={`aboutdropdown ${isAboutUsDropdownOpen ? "show" : ""}`}>
            <NavLink to="#" onClick={(e) => e.preventDefault()}>
              About Us
            </NavLink>{" "}
            {/* Prevents link default action */}
            <div className="aboutdropdown-options">
              <NavLink to="/ourinfo" onClick={toggleMenu}>
                Behind the Kitchen
              </NavLink>
              <NavLink to="/ourchefsinfo" onClick={toggleMenu}>
                Meet The Chefs
              </NavLink>
            </div>
          </div>
        </li>
        <li>
          <NavLink to="/shop" activeClassName="active" onClick={toggleMenu}>Shop</NavLink>
        </li>
        <li>
          <NavLink to="/faqs" activeClassName="active" onClick={toggleMenu}>Faqs</NavLink>
        </li>
        <li id="navs"
          onClick={(e) => {
            e.stopPropagation(); // Prevents event from bubbling to the parent toggleMenu
            toggleJoinUsDropdown();
          }}
          ref={joinUsRef}>
            <div className={`dropdown ${isJoinUsDropdownOpen ? "show" : ""}`}>
            <NavLink to="#" onClick={(e) => e.preventDefault()}>
              Join Us
            </NavLink>{" "}
            {/* Prevents link default action */}
            <div className="dropdown-options">
              <NavLink id="joinus" to="/home" onClick={toggleMenu}>
                HomeChef
              </NavLink>
              <NavLink id="joinus" to="/delivery" onClick={toggleMenu}>
                Delivery Executive
              </NavLink>
            </div>
          </div>
          {/* <NavLink to="/ourInfo" activeClassName="active" onClick={toggleMenu}>Our Info</NavLink> */}
        </li>
      </div>

      <div className="profile">
          <li>
            <NavLink onClick={handleSearchIconClick} id="navs-icons">
              <i className="fa-solid fa-magnifying-glass"></i>
            </NavLink>
          </li>
          <li>
            <NavLink id="navs-icons" to="/cart" onClick={toggleMenu}>
              <i className="fa-solid fa-cart-shopping"></i>
            </NavLink>
          </li>
        <li>
          <button id='navs-icons' onClick={() => navigate('/login')}>Log in</button>
        </li>
        <li>
          <button id='navs-icons' onClick={() => navigate('/signup')}>Sign up</button>
        </li>
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

export default Navbar;
