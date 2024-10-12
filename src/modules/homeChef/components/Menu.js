import Navbar from "./Navbar";
import React, { useState, useRef, useEffect } from "react";
import FoodCard from "./FoodCard";
import axiosInstance from '../../../utils/axiosService'; // Import your axios instance
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode for token decoding
import "../styles/Menu.css";

function Menu() {
  const [cards, setCards] = useState([]);
  const lastCardRef = useRef(null);
  
  // Get chef ID from token
  const token = localStorage.getItem('token');
  const chefId = token ? jwtDecode(token).id : null;

  useEffect(() => {
    // Fetch items added by the chef
    const fetchItems = async () => {
      if (chefId) {
        try {
          const response = await axiosInstance.get(`/addItem/getitembychefid/${chefId}`);
          setCards(response.data); // Store the full item details in state
        } catch (error) {
          console.error('Error fetching items:', error);
          alert('Failed to fetch items.');
        }
      }
    };

    fetchItems();
  }, [chefId]); // Run when chefId changes

  const handleAddCard = () => {
    // Add a new card with isNew property to distinguish it from existing cards
    const newCard = { foodName: '', foodDescription: '', amount: 0, isNew: true }; // New card initialization
    setCards((prevCards) => [...prevCards, newCard]); // Add new card to state
  };
  

  useEffect(() => {
    if (lastCardRef.current) {
      lastCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [cards]); // Scroll into view when cards state changes

  return (
    <>
      <Navbar />
      <div className="menu-page">
        <div className="addItemBtBOx">
          <button className="addItemBt" onClick={handleAddCard}>
            Add Item
          </button>
        </div>

        <div className="card-container-menu">
          {cards.map((item, index) => (
            <div key={item._id || index} ref={index === cards.length - 1 ? lastCardRef : null}>
              <FoodCard 
                id={item._id} 
                initialFoodData={item} 
                isNew={item.isNew} 
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Menu;
