

import React, { useState } from 'react';
import CartC from '../components/CartC';
import image1 from "../assets/bhindi-fry.webp";
import image2 from "../assets/Easy-Aloo.jpg";
import image3 from "../assets/Chilli-Paneer.jpg";
import "../styles/Cart.css";

export default function Cart() {
  const [tip, setTip] = useState(20);
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0]; // Today's date in YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(formattedToday); // Default to today
  const [selectedTime, setSelectedTime] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isAddressEditing, setIsAddressEditing] = useState(false);

  const timeOptions = [
    '8 AM - 9 AM',
    '9 AM - 10 AM',
    '10 AM - 11 AM',
    '11 AM - 12 PM',
    '12 PM - 1 AM',
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

  const dishCharges = 200;
  const deliveryCharges = 40;
  const taxCharges = 20;
  const totalAmount = dishCharges + deliveryCharges + tip + taxCharges;

  const handleAddressButtonClick = () => {
    if (isAddressEditing) {
      setIsAddressEditing(false); // Save address logic can be added here
    } else {
      setIsAddressEditing(true); // Start editing the address
    }
  };

  const handleAddAddress = () => {
    // Logic for adding a second address can be implemented here
    console.log("Add second address logic here");
  };

  // Calculate min and max dates
  const minDate = formattedToday; // Today's date
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 7); // 7 days from today
  const maxDateString = maxDate.toISOString().split('T')[0]; // Date in YYYY-MM-DD

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div>
        <CartC foodName="BHINDI FRY" foodName2="BHINDI, DAHI, MASALA'S" rate="Rs. 80" qty="Quantity:" imageSrc={image1} />
        {/* <CartC foodName="AALU MATAR" foodName2="BHINDI, DAHI, MASALA'S" rate="Rs. 150" qty="Quantity:" imageSrc={image2} />
        <CartC foodName="CHILLI PANEER" foodName2="BHINDI, DAHI, MASALA'S" rate="Rs. 200" qty="Quantity:" imageSrc={image3} />
        <CartC foodName="CHBNM, PANEER" foodName2="BHINDI, DAHI, MASALA'S" rate="Rs. 200" qty="Quantity:" imageSrc={image3} /> */}
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
              <>
                <button onClick={handleAddressButtonClick}>
                  {isAddressEditing ? "Save Address" : "Change Address"}
                </button>
              </>
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
            <p>₹ {dishCharges}</p>
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
            <p>Taxes</p>
            <p>₹ {taxCharges}</p>
          </div>

          <div className="TotalAmountBox">
            <p>Total Amount Payable</p>
            <p>₹ {totalAmount}</p>
          </div>

          <div className="placeOrderForCartBox">
            <button className='placeOrderForCart'>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}


