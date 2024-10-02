import React, { useState, useRef } from 'react';
import "../Styles/Shop.css";
import bgPicForHomeinitF from "../images/bgforShopOfchef.jpg"
import FoodCardForShop from "../Component/FoodCardForShop";
import DutyToggle from '../Component/DutyToggle';
import Navbar from '../Component/Navbar';
import MainProfileEdit from '../Component/MainProfileEdit';
import axios from 'axios';

const HomeChefShop = () => {
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    itemname: '',
    description: '',
    price: '',
    image: null, // Image file for upload
  });
  
  const [nextId, setNextId] = useState(0);
  const lastCardRef = useRef(null); // Ref to the last added card

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
       const response = await axios.post('/api/shop/additems', data, {
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
    setCards((prevCards) => {
      const newCards = [...prevCards, nextId];
      setNextId(nextId + 1); // Increment the ID for the next card
      return newCards;
    });
  };

  React.useEffect(() => {
    if (lastCardRef.current) {
      lastCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [cards]); // Scroll into view when cards state changes

  return (
    <div>
      <Navbar/>
      <div className="bgPicForHome">
        <img className='bgPicForHomeinitForShop' src={bgPicForHomeinitF} alt="" />

        <div>
          <DutyToggle />
        </div>

        {/* <div>
          <MainProfileEdit />
        </div> */}

        <div className="addItemBtBOx">
          <button className='addItemBt' onClick={handleAddCard}>Add Item</button>
        </div>

        <div className="card-container">
          {cards.map((item, index) => (
            <div key={item._id} ref={index === cards.length - 1 ? lastCardRef : null}>
              <FoodCardForShop item={item} />
            </div>
          ))}
        </div>


      </div>


    </div>
  );
};

export default HomeChefShop;
