import React, { useState, useEffect } from "react";
import "../styles/Shop.css";
import axios from 'axios';
import food from "../images/picklepapad.jpeg";

function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/shop/items');
        setProducts(response.data); // Store all products
        setFilteredProducts(response.data); // Set filteredProducts to the fetched data
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 790);
    };
    handleResize(); // Check on component mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = products.filter((product) =>
      product.itemname.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Handle sorting
  const handleSort = (order) => {
    setSortOrder(order);
    const sortedProducts = [...filteredProducts].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sortedProducts);
  };

// Example of how you can check login status (you may have a different way to track login)
 // Function to check if user is logged in
 const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  console.log("Token:", token); // Debugging line to check if token is present
  if (!token) {
    return false;
  }

  // Optionally, you can decode the token and check its expiration
  const payload = JSON.parse(atob(token.split('.')[1]));
  const currentTime = Date.now() / 1000; // Get current time in seconds

  // Check if token is expired
  return payload.exp > currentTime;
 
};

console.log("islogin", isLoggedIn());

  // Add function to handle adding to cart
  const addToCart = (product) => {
    console.log("Add to Cart clicked for:", product.itemname);
    if (!isLoggedIn()) {
      alert('Please log in to add items to your cart');
      return;
    }

      // Add the product to the cart logic here (e.g., API call)
      console.log(`Product added to cart: ${product.itemname}`);
  };


  return (
    <>
      <div className="shop-container">
        <div className="shop-row">
          <div className="imagee-text">
            <img src={food} alt="Food" className="imgFood" />
            <div className="overlayy"></div>
            <div className="text-overlayy">
              “A Burst of Flavor, A Spoonful of Joy!”
            </div>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="sidebar">
            <h3>Search</h3>
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />

            {/* Dropdown for mobile view */}
            {isMobile ? (
              <div className="dropdown">
                <label htmlFor="sort">Sort By</label>
                <select
                  id="sort"
                  value={sortOrder}
                  onChange={(e) => handleSort(e.target.value)}
                  className="sort-dropdown"
                >
                  <option value="asc">Price Low to High</option>
                  <option value="desc">Price High to Low</option>
                </select>
              </div>
            ) : (
              <>
                <h3>Sort By</h3>
                <button onClick={() => handleSort("asc")} className="sort-button">Price Low to High</button>
                <button onClick={() => handleSort("desc")} className="sort-button">Price High to Low</button>
              </>
            )}
          </div>

         
          <div className="product-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product._id} className="card">
                  <img src={product.image} alt={product.itemname} />
                  {/* <img
                    src={product.image}
                    alt={product.itemname}
                    className="card-image"
                  /> */}
                    <h3>{product.itemname}</h3>
                    <p>Chef: {product.chef?.name || 'Unknown'}</p>  {/* Chef's name */}
                    <p>Quantity: {product.quantity} {product.unit || ''}</p> {/* Quantity with Unit */}
                  
                  <p>Price: ₹{product.price}</p>
                 
                  <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;


