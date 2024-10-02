import "../styles/contactUs.css";
import ContactForm from "../components/ContactForm";
import chef from "../images/chef2-removebg-preview.png";
import React from "react";
import food from "../images/food11.jpg";
import AfterLoginNavbar from "../components/AfterLoginNavbar";

function UserContactUs() {
  return (
    <>
    <AfterLoginNavbar></AfterLoginNavbar>
    <div className="contactUs">
      <div className="contactUs-ourinfo_row">
        <div className="image_text">
          <img src={food} alt="Food" className="imgFood" />
          <div className="overlay"></div>
          <div className="text_overlay">CONTACT US</div>
        </div>
      </div>
      <div className="contactForm">
      <img src={chef} alt="chef" className="chef" />
      <ContactForm />
      </div>
    </div>
    </>
  );
}

export default UserContactUs;
