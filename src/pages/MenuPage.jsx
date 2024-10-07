import React, { useState, useEffect } from "react";
import "../styles/MenuPage.css"; // Add custom styles here
import axiosInstance from "../utils/axiosService";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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


  const handleAddToCart = (dish) => {
    if (!isLoggedIn) {
      alert("Please log in to add items to your cart.");
      return;
    }
    // Add the dish to cart logic here
    console.log(`Added ${dish.name} to cart.`);
  };

  return (
    <div className="menu-page-container">
      <div className="menu-list-container">
        {menu.length > 0 ? (
          menu.map((dish) => (
            <div key={dish._id} className="menu-card">
              <img
                src={dish.foodPhoto}
                alt={dish.foodName}
                className="dish-image"
              />
              <h3>{dish.foodName}</h3>
              <p>{dish.foodDescription}</p>
              <p>Price: Rs {dish.amount}</p>
              {/* Display chef's name */}
              <p>Chef: {dish.chefId && dish.chefId.name ? dish.chefId.name : "Unknown"}</p>
              <button className="add-to-cart-btn"  onClick={() => handleAddToCart(dish)}>Add to Cart</button>
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
