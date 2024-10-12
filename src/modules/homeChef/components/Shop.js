import React, { useState, useRef, useEffect } from 'react';
import "../styles/shop.css";
import FoodCardForShop from "./FoodCardForShop";
import Navbar from './Navbar';
import axiosInstance from '../../../utils/axiosService';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

const ChefShop = () => {
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    itemname: '',
    description: '',
    price: '',
    image: null, // Image file for upload
  });
  const [nextId, setNextId] = useState(0);
  const lastCardRef = useRef(null); // Ref to the last added card
  const [chefId, setChefId] = useState(null); // Store chefId

  // Decode token to get chefId when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setChefId(decodedToken.id); // Extract chefId from token
    } else {
      console.error('No token found');
    }
  }, []);

  // Fetch shop items when the component mounts and chefId is available
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get(`api/shop/items/chef/${chefId}`);
        setCards(response.data); // Assuming response.data is an array of shop items
      } catch (error) {
        console.error('Error fetching items:', error);
        alert('Failed to fetch items. Please try again later.'); // User feedback
      }
    };

    // Ensure chefId is available before making the call
    if (chefId) {
      fetchItems();
    }
  }, [chefId]); // Fetch items when chefId changes or component mounts

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image input change
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0], // Set the selected file
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to hold form data including image
    const data = new FormData();
    data.append('itemname', formData.itemname);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('image', formData.image); // Append the image file

    try {
      // Make POST request to the backend
      const response = await axiosInstance.post('/api/shop/additems', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Add the new item to the cards list
      setCards((prevCards) => [...prevCards, response.data.item]);
      setNextId(nextId + 1); // Increment the ID for the next card

      // Clear the form
      setFormData({
        itemname: '',
        description: '',
        price: '',
        image: null,
      });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleAddCard = () => {
    setCards((prevCards) => [
        ...prevCards,
        {
            id: nextId,
            itemname: '',
            description: '',
            price: '',
            image: null,
            quantity: '0',
            unit: 'kilogram',
        },
    ]);
    setNextId(nextId + 1); // Increment the ID for the next card
};

  useEffect(() => {
    if (lastCardRef.current) {
      lastCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [cards]); // Scroll into view when cards state changes

  return (
    <div>
      <Navbar />
      <div className="bgPicForHome">
        <img className='bgPicForHomeinitForShop' src='' alt="" />

        <div className="addItemBtBoxForShop">
          <button className='addItemBtForShop' onClick={handleAddCard}>Add Item</button>
        </div>

        <div className="card-container">
          {cards.length > 0 ? (
            cards.map((item, index) => (
              <div key={item._id} ref={index === cards.length - 1 ? lastCardRef : null}>
                <FoodCardForShop 
                  id={item._id}  // Pass the unique ID
                  itemname={item.itemname} 
                  description={item.description} 
                  price={item.price} 
                  image={item.image } 
                  quantity={item.quantity} 
                  unit={item.unit} 
                />
              </div>
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default ChefShop;
