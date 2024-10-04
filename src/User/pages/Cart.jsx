import React, { useEffect, useState } from 'react';
import CartC from '../components/CartC';
import AfterLoginNavbar from '../components/AfterLoginNavbar';
import axios from 'axios';
import '../styles/Cart.css';

export default function UserCart() {
  const [cartItems, setCartItems] = useState([]);
  const [tip, setTip] = useState(20);
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0]; // Today's date in YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(formattedToday); // Default to today
  const [selectedTime, setSelectedTime] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isAddressEditing, setIsAddressEditing] = useState(false);
  const [chefs, setChefs] = useState({});
  const [deliveryCharges, setDeliveryCharges] = useState(40);
  const [taxRate] = useState(0.10); // 10% tax rate

  // Fetch cart items from local storage or server
  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to log in first.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/api/cart/getallitems', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const serverCartItems = response.data.cart.items || [];

        // Initialize quantities to 1 for each item
        const initializedCartItems = serverCartItems.map(item => ({
          ...item,
          quantity: 1 // Set default quantity to 1
        }));

        // Update local storage to reflect server items
        localStorage.setItem('cart', JSON.stringify(initializedCartItems));

        // Update state with initialized items
        setCartItems(initializedCartItems);
      } catch (error) {
        console.error("There was an error fetching the cart items!", error.response ? error.response.data : error);
      }
    };

    // Function to fetch chef names
    const fetchChefs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/chefs');
        const chefsData = response.data.reduce((acc, chef) => {
          acc[chef._id] = chef.name; // Assuming chef object has _id and name properties
          return acc;
        }, {});
        setChefs(chefsData);
      } catch (error) {
        console.error("Error fetching chef data", error);
      }
    };

    fetchCartItems();
    fetchChefs(); // Call this to fetch chef names
  }, []);

  // Handle deletion of item from cart
  const handleDelete = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      console.log(`Attempting to delete item with ID: ${itemId}`); // Debugging log

      // Make the DELETE request to the server
      const response = await axios.delete(`http://localhost:4000/api/cart/removeItem/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Server response after delete:', response.data); // Debugging log

      // If successful, remove the item from the local state
      const updatedCart = cartItems.filter(item => item.item._id !== itemId);
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));

    } catch (error) {
      console.error("There was an error removing the item from the cart!", error.response ? error.response.data : error);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (itemId, change) => {
    const updatedCart = cartItems.map(item => {
      if (item.item._id === itemId) {
        const newQuantity = item.quantity + change;
        // Ensure quantity can't go below 1
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });

    // Update state and localStorage
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const timeOptions = [
    '8 AM - 9 AM',
    '9 AM - 10 AM',
    '10 AM - 11 AM',
    '11 AM - 12 PM',
    '12 PM - 1 PM',
    '1 PM - 2 PM',
    '2 PM - 3 PM',
    '3 PM - 4 PM',
    '4 PM - 5 PM',
    '5 PM - 6 PM',
    '6 PM - 7 PM',
    '7 PM - 8 PM',
    '8 PM - 9 PM'
  ];

  const increaseTip = () => {
    if (tip < 50) {
      setTip(tip + 10);
    }
  };

  const decreaseTip = () => {
    if (tip > 0) {
      setTip(tip - 10);
    }
  };

  // Calculate dish charges dynamically based on cart items
  const dishCharges = cartItems.reduce((total, item) => total + item.item.price * item.quantity, 0);

  // Calculate tax based on dish charges
  const taxCharges = dishCharges * taxRate;

  // Calculate total amount
  const totalAmount = dishCharges + deliveryCharges + tip + taxCharges;

  const handleAddressButtonClick = () => {
    setIsAddressEditing(!isAddressEditing); // Toggle editing state
  };

  const minDate = formattedToday;
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 7);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <>
      <AfterLoginNavbar />
      <div>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <CartC 
              key={item.item._id} 
              foodName={item.item.itemname} 
              foodName2={chefs[item.item.chef] || "Unknown Chef"} 
              rate={`Rs. ${item.item.price * item.quantity}`} // Calculate total price for that quantity
              qty={`Quantity: ${item.quantity}`} // Display user's selected quantity
              imageSrc={item.item.image} 
              onDelete={() => handleDelete(item.item._id)} 
              onQuantityChange={(change) => handleQuantityChange(item.item._id, change)} 
            />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <div className="belowCartMain">
        <div className="belowCart">
          <div className="deliveryDateForCart">
            <label htmlFor="deliveryDate">Delivery Date:</label>
            <input
              type="date"
              id="deliveryDate"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={minDate}
              max={maxDateString}
            />
          </div>
          <div className="deliveryTimeForCart">
            <label htmlFor="deliveryTime">Select Time:</label>
            <select
              id="deliveryTime"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="" disabled>Select Time</option>
              {timeOptions.map((time, index) => (
                <option key={index} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <div className="deliveryAddressForCart">
            <p className='deliveryAddressForCartp'>Address: {deliveryAddress || "No Address Set"}</p>
            {deliveryAddress ? (
              <button onClick={handleAddressButtonClick}>
                {isAddressEditing ? "Save Address" : "Change Address"}
              </button>
            ) : (
              <button onClick={handleAddressButtonClick}>
                Add Address
              </button>
            )}
          </div>

          {isAddressEditing && (
            <textarea className='deliveryAddressForCartTextArea'
              rows="4"
              cols="30"
              placeholder="Enter your address..."
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              style={{ resize: 'vertical', overflowY: 'scroll' }}
            />
          )}
        </div>
      </div>
      <hr />

      <div className="chargesContainermain">
        <div className="chargesContainer">
          <div className="dishChargesBox">
            <p>Dish Charges</p>
            <p>₹ {dishCharges.toFixed(2)}</p> {/* Display dish charges in fixed format */}
          </div>

          <div className="deliveryAndPackagingChargesBox">
            <p>Delivery & Packaging Charges</p>
            <p>₹ {deliveryCharges}</p>
          </div>

          <div className="tipTORiderBox">
            <p>Tip to Rider</p>
            <div className='incAndDesTip'>
              <button className='tipIncBtn' onClick={increaseTip} disabled={tip >= 50}>
                +
              </button>
              <p>₹ {tip}</p>
              <button className='tipDecBtn' onClick={decreaseTip} disabled={tip <= 0}>
                -
              </button>
            </div>
          </div>

          <div className="taxChargesBox">
            <p>Tax (10%)</p>
            <p>₹ {taxCharges.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="totalAmountForCart">
        <h3>Total Amount: ₹ {totalAmount.toFixed(2)}</h3>
      </div>
    </>
  );
}
