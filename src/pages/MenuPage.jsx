import React, { useState, useEffect } from "react";
import "../styles/MenuPage.css"; // Add custom styles here
import axiosInstance from "../utils/axiosService";
import { useNotification } from "../components/NotificationContext";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [sortedMenu, setSortedMenu] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { triggerNotification } = useNotification();
  const baseURL = process.env.NODE_ENV === "development" 
  ? 'http://localhost:4000' // Localhost URL
  : 'https://dineathomebackend.vercel.app'; // Deployed URL


  useEffect(() => {
    // Scroll to the top when the page is loaded
    window.scrollTo(0, 0);

    // Fetch all items from the backend
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get("/addItem/getAllItem"); // Fetch items from the backend
        console.log("Fetched menu items:", response.data); // Log the fetched data
        setMenu(response.data); // Set the fetched items to the state
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

  const handleSort = (option) => {
    let newSortedMenu;;
    switch (option) {
      case "price-low-to-high":
        newSortedMenu = [...menu].sort((a, b) => a.amount - b.amount);
        break;
      case "price-high-to-low":
        newSortedMenu = [...menu].sort((a, b) => b.amount - a.amount);
        break;
      // case "main-course":
      //   newSortedMenu = menu.filter((item) => item.category === "Main Course");
      //   break;
      // case "dessert":
      //   newSortedMenu = menu.filter((item) => item.category === "Dessert");
      //   break;
      // case "salad":
      //   newSortedMenu = menu.filter((item) => item.category === "Salad");
      //   break;
      // case "bread":
      //   newSortedMenu = menu.filter((item) => item.category === "Bread");
        break;
      default: // For the "All" option or any unrecognized sort option
        newSortedMenu = menu;
    }
    setSortedMenu(newSortedMenu);
    setSortOption(option);
  };


  const handleAddToCart = (dish) => {
    if (!isLoggedIn) {
      // alert("Please log in to add items to your cart.");
      triggerNotification('Please log in to add items to your cart.','red')
      return;
    }
    // Add the dish to cart logic here
    console.log(`Added ${dish.name} to cart.`);
    triggerNotification("Item added successfully",'green');
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
          style={{padding:"3px"}}
        />
        <h3>Sort By</h3>
        <button onClick={() => handleSort("price-low-to-high")}>
          Price Low to High
        </button>
        <button onClick={() => handleSort("price-high-to-low")}>
          Price High to Low
        </button>
        {/* <h3>Categories</h3>
        <button onClick={() => handleSort("all")}>All</button> 
        <button onClick={() => handleSort("main-course")}>Main Course</button>
        <button onClick={() => handleSort("dessert")}>Dessert</button>
        <button onClick={() => handleSort("salad")}>Salad</button>
        <button onClick={() => handleSort("bread")}>Bread</button> */}
      </div>
      <div className="menu-list-container">
        {sortedMenu.length > 0 ? (
          sortedMenu.map((dish) => (
            <div key={dish._id} className="menu-card">
              {dish.foodPhoto ? (
        <img
        src={`${baseURL}${dish.foodPhoto}`} // Dynamically set image source
        alt={dish.foodName}
        className="dish-image"
      />
      ) : (
        <img
          src="/default-image.jpg" // Provide a fallback image
          alt="Default Image"
          className="dish-image"
        />
      )}
              {console.log("Food Photo Path:", dish.foodPhoto)}
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
      

      {/* <div className="sort-options"> */}
        {/* <h3>Sort By</h3> */}
        {/* <button onClick={() => handleSort("price-low-to-high")}> */}
          {/* Price Low to High */}
        {/* </button> */}
        {/* <button onClick={() => handleSort("price-high-to-low")}> */}
          {/* Price High to Low */}
        {/* </button> */}
        {/* <h3>Categories</h3>
        <button onClick={() => handleSort("all")}>All</button> 
        <button onClick={() => handleSort("main-course")}>Main Course</button>
        <button onClick={() => handleSort("dessert")}>Dessert</button>
        <button onClick={() => handleSort("salad")}>Salad</button>
        <button onClick={() => handleSort("bread")}>Bread</button> */}
      {/* </div> */}
    </div>
  );
};

export default MenuPage;
