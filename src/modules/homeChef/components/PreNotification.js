import React from 'react'
import NotificationR from "./NotificationR.js";
import NotificationP from "./NotificationP.js";
import Navbar from './Navbar.js';

export default function PreNotification() {
  return (
    <div>
<Navbar/>
<div>
          <NotificationP
            type="Pre-Order"
            foodName="Pizza"
            date="2024-10-07"
            quantity="2"
            // price="400"
            decline="Decline"
            accept="Accept"
          />
          {/* <NotificationR
            type="Rquest"
            foodName="Pizza"
            date="2024-10-07"
            quantity="2"
            // priceRange="120- 220"
            decline="Decline"
            accept="Accept"
          /> */}
          <NotificationP
            type="Pre-Order"
            foodName="Pasta"
            date="2024-10-06"
            quantity="1"
            // price="200"
            decline="Decline"
            accept="Accept"
          />
        </div>


      
    </div>
  )
}
