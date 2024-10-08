import React, { useState, useEffect } from "react"; // Import useEffect here
import "../styles/MenuPage.css"; // Add custom styles here
import axiosInstance from "../../utils/axiosService"; // Ensure this path is correct
import {jwtDecode} from 'jwt-decode'; // Correct import
import { useNavigate } from 'react-router-dom'; 
const MenuPage = () => {
  const [menu, setMenu] = useState([]); // Initialize with an empty array
  const [sortOption, setSortOption] = useState("");
  const [message, setMessage] = useState(""); // State for showing success/error message
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top when the page is loaded
    window.scrollTo(0, 0);

    // Fetch all items from the backend
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get("/addItem/getAllItem"); // Fetch items from the backend
        setMenu(response.data); // Set the fetched items to the state
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchItems();
  }, []);


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
  
      const response = await axiosInstance.post("/api/menuCart/addToMenuCart", { itemId, userId, price }, 
        { headers: { Authorization: `Bearer ${token}` } });
  
      if (response.status === 200) {
        setMessage("Item added to cart successfully!");
        alert("Item added to the cart successfully!");
        navigate('/user/usercart');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) { // Unauthorized error
        alert("Session expired. Please log in again.");
        // Redirect to login page or refresh token logic
        navigate('/login');
      } else {
        console.error("Error adding item to cart:", error);
        setMessage("Failed to add item to cart.");
      }
    }
  };
  

  const handleSort = (option) => {
    let sortedMenu;
    switch (option) {
      case "price-low-to-high":
        sortedMenu = [...menu].sort((a, b) => a.amount - b.amount);
        break;
      case "price-high-to-low":
        sortedMenu = [...menu].sort((a, b) => b.amount - a.amount);
        break;
      case "main-course":
        sortedMenu = menu.filter((item) => item.category === "Main Course");
        break;
      case "dessert":
        sortedMenu = menu.filter((item) => item.category === "Dessert");
        break;
      case "salad":
        sortedMenu = menu.filter((item) => item.category === "Salad");
        break;
      case "bread":
        sortedMenu = menu.filter((item) => item.category === "Bread");
        break;
      default:
        sortedMenu = menu;
    }
    setMenu(sortedMenu);
    setSortOption(option);
  };

  return (
    <div className="menu-page-container">
       {message && <p className="cart-message">{message}</p>} {/* Display success/error message */}
      <div className="menu-list-container">
        {menu.length > 0 ? (
          menu.map((dish) => (
            <div key={dish._id} className="menu-card">
              <img
  src={`http://localhost:4000${dish.foodPhoto}`} // Append your backend URL
  alt={dish.foodName}
  className="dish-image"
/>

              <h3>{dish.foodName}</h3>
              <p>{dish.foodDescription}</p>
              <p>Price: ${dish.amount}</p>
              {/* Display chef's name */}
              <p>Chef: {dish.chefId && dish.chefId.name ? dish.chefId.name : "Unknown"}</p>
              <button className="add-to-cart-btn"  onClick={() => handleAddToCart(dish._id)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No menu items found.</p>
        )}
      </div>

      <div className="sort-options">
        <h3>Sort By</h3>
        <button onClick={() => handleSort("price-low-to-high")}>
          Price Low to High
        </button>
        <button onClick={() => handleSort("price-high-to-low")}>
          Price High to Low
        </button>
        <h3>Categories</h3>
        <button onClick={() => handleSort("main-course")}>Main Course</button>
        <button onClick={() => handleSort("dessert")}>Dessert</button>
        <button onClick={() => handleSort("salad")}>Salad</button>
        <button onClick={() => handleSort("bread")}>Bread</button>
      </div>
    </div>
  );
};

export default MenuPage;
