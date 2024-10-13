// SearchBox.js
import React from "react";
import { useState,useEffect,useRef } from 'react';
import "../styles/ThirdPg.css";
import '../styles/SearchPage.css'
import shopImage from "../images/ForShop3.jpeg"
import { useNavigate } from "react-router-dom";

const ThirdPg = () => {
  const navigate = useNavigate();

  const handleShop=()=>{
    navigate('/shop');
  }
  const searchRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
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
  }
  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
    // setIsOpen(false); 
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* <div className="search-containerForThirdPg">
        <h1 className="search-titleForThirdPg">Looking for something?</h1>
        <p className="search-subtitleForThirdPg">
          Browse over 450+ easy and fail-proof recipes that deliver{" "}
          <span className="highlightForThirdPg">authentic flavors</span> using{" "}
          <span className="highlightForThirdPg">modern</span> and{" "}
          <span className="highlightForThirdPg">innovative</span> techniques.
        </p>
        <div className="search-bar-containerForThirdPg" onClick={handleSearchIconClick}>
          <input
            type="text"
            className="search-inputForThirdPg"
            placeholder="search..."
          />
          <button className="search-buttonForThirdPg">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div> */}


      <div className="shopImageAndPraContainerForThirdPgMain">
        <div className="shopImageAndPraContainerForThirdPg">

          <h1 className="text-3xl font-bold p-4">Shop</h1>

          <div className="shopImagePraBtbCotainer">


            <div className="shopImageContainer">
              <img className="shopImage" src= {shopImage} alt="" />
            </div>

            <div className="shopPraAndBtnContainer">
              <p>Discover a variety of authentic dry snacks, papads, pickles, and masalas crafted with love by our talented homechefs! 
                Treat yourself to homemade flavors, prepared with traditional recipes and the finest ingredients. 
                Shop now on our website and enjoy the taste of home, delivered right to your doorstep!</p>
              <button className="shpNowBtn" onClick={handleShop}>Shop Now</button>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default ThirdPg;
