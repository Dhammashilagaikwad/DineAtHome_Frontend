import React, { useState, useEffect } from "react"; 
import "../styles/MenuPage.css"; 
import axiosInstance from "../../utils/axiosService"; 
import { jwtDecode } from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom'; 
import { useNotification } from "../../components/NotificationContext";

const MenuPage = () => {
  const [menu, setMenu] = useState([]); 
  const [sortedMenu, setSortedMenu] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();
  const { triggerNotification } = useNotification();

  const baseURL = process.env.NODE_ENV === "development" 
    ? 'http://localhost:4000' 
    : 'https://dineathomebackend.vercel.app';

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get("/addItem/getAllItem"); 
        setMenu(response.data); 
        setSortedMenu(response.data); 
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = menu.filter((item) =>
      item.foodName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSortedMenu(filtered);
  };

  const handleAddToCart = async (itemId, price) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Token not found. Please log in again.");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      if (!userId || !itemId) {
        alert("User ID or Item ID is missing.");
        return;
      }

      const response = await axiosInstance.post("/api/menuCart/addToMenuCart", 
        { itemId, userId, price }, 
        { headers: { Authorization: `Bearer ${token}` } });

      if (response.status === 200) {
        setMessage("Item added to cart successfully!");
        triggerNotification('Item added to the cart successfully!', 'green');
        navigate('/user/usercart');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) { 
        alert("Session expired. Please log in again.");
        navigate('/login');
      } else {
        console.error("Error adding item to cart:", error);
        setMessage("Failed to add item to cart.");
        triggerNotification('Failed to add item to cart.', 'red');
      }
    }
  };

  const handleSort = (option) => {
    let newSortedMenu;
    switch (option) {
      case "price-low-to-high":
        newSortedMenu = [...menu].sort((a, b) => a.amount - b.amount);
        break;
      case "price-high-to-low":
        newSortedMenu = [...menu].sort((a, b) => b.amount - a.amount);
        break;
      default:
        newSortedMenu = menu;
    }
    setSortedMenu(newSortedMenu);
  };

  return (
    <div className="menu-page-container">
      <div className="sort-options">
        <h3>Search</h3>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />

        <h3>Sort By</h3>
        <button onClick={() => handleSort("price-low-to-high")}>
          Price Low to High
        </button>
        <button onClick={() => handleSort("price-high-to-low")}>
          Price High to Low
        </button>
      </div>

      {message && <p className="cart-message">{message}</p>} 

      <div className="menu-list-container">
        {sortedMenu.length > 0 ? (
          sortedMenu.map((dish) => (
            <div key={dish._id} className="menu-card">
              <img
                src={`${baseURL}${dish.foodPhoto}`} 
                alt={dish.foodName}
                className="dish-image"
              />
              <h3>{dish.foodName}</h3>
              <p>{dish.foodDescription}</p>
              <p>Price: Rs{dish.amount}</p>
              <p>Chef: {dish.chefId && dish.chefId.name ? dish.chefId.name : "Unknown"}</p>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(dish._id, dish.amount)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No menu items found.</p>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
