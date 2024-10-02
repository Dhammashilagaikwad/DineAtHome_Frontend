import React from 'react'
import NotificationR from '../Component/NotificationR';
import NotificationP from '../Component/NotificationP';
import Navbar from '../Component/Navbar'

const Notification = () => {
  return (
    <div>
      <Navbar/>
      <br /><br /><br /><br /><br />
      <NotificationR type = "Request" foodName="Tawa Pulao" quantity="Qty: 1" priceRange="PR: ₹100 - ₹250" date="20/09/2024" decline="Decline" accept="Accept" />
      <NotificationP type = "PreOrder"foodName="Chhole" quantity="Qty: 2" price="250" date="22/09/2024"/>
      <NotificationR type = "Request" foodName="Fried rice" quantity="Qty: 4" priceRange="PR: ₹150 - ₹250" date="22/09/2024" decline="Decline" accept="Accept" />
    </div>
  );
};

export default Notification;
