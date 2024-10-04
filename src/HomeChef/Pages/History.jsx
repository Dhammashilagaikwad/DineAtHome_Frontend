import React from "react";
import "../Styles/History.css";
import HistoryC from "../Component/HistoryC";
import Navbar from '../Component/Navbar'

const History = () => {
  return (
    <>
      <Navbar/>
      <HistoryC customerName = "CustomerName1" customerInfo = "Name of 1st item here" itemPrice = '708' orderDate = "20/05/1982"/>
      <HistoryC customerName = "CustomerName2 " customerInfo = "Name of 2nd item here" itemPrice = '122' orderDate = "20/05/2000"/>
      <HistoryC customerName = "CustomerName3" customerInfo = "Name of 3rd item here" itemPrice = '109' orderDate = "20/05/2005"/>
      <HistoryC customerName = "CustomerName4" customerInfo = "Name of 4th item here" itemPrice = '254' orderDate = "20/05/1975"/>

    </>
  );
};

export default History;
