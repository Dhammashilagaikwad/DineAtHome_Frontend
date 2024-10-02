import React, { useState, useEffect } from "react";
import "../styles/Shop.css";
import axios from 'axios';
import food from "../images/picklepapad.jpeg";
import AfterLoginNavbar from "../components/AfterLoginNavbar";
import { useNavigate } from 'react-router-dom';

function UserShop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const navigate = useNavigate(); // Define navigate

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

  // Add function to handle adding to cart
  const addToCart = async (product) => {
    const cartItem = {
      itemId: product._id,
      quantity: 1,
      // Include other product details as needed
      itemname: product.itemname,
      price: product.price,
      image: product.image,
      chef: product.chef?.name || 'Unknown'
    };

    if (!product.price) {
      console.error('Product is missing price:', product);
      alert('Unable to add this item to cart as price is missing.');
      return;
  }

    console.log(cartItem);
    try {

      // Assuming you store the user token in local storage
      const token = localStorage.getItem('token');
      console.log('Token:', token); 
      if (!token) {
        alert('You need to log in first.');
        return;
      }

      const response = await axios.post('http://localhost:4000/api/cart/add', cartItem, {
        headers: {
          'Authorization': `Bearer ${token}` // Add token to authorization header
        },
        withCredentials: true
        
      });

      // Update local storage cart
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      const itemIndex = existingCart.findIndex(item => item.itemId === cartItem.itemId);
      if (itemIndex > -1) {
        existingCart[itemIndex].quantity += 1; // Increase quantity if it already exists
      } else {
        existingCart.push(cartItem); // Add new item to cart
      }

      localStorage.setItem('cart', JSON.stringify(existingCart));
      setCartMessage(response.data.message);
      alert('Item added to cart successfully!');
      navigate('/usercart'); 
    } catch (error) {
      console.error("There was an error adding the item to the cart!", error.response ? error.response.data : error);
      alert('Failed to add item to cart. ' + (error.response?.data.message || ''));
    }


  };


  return (
    <>
      <AfterLoginNavbar />
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

export default UserShop;

