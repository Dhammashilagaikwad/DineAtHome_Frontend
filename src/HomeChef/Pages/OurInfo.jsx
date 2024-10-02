import React, { useState } from 'react';
import '../Styles/OurInfo.css'; // Import the CSS file
import food from '../images/food11.jpg';
import mission from '../images/mission.png';
import vision from '../images/vision.png';
import mumbai from '../images/Mumbai.jpg';
import ourinfo from '../images/Cooking-rafiki.png';
import Navbar from '../Component/Navbar';

function OurInfo() {
  const [hoveredImage, setHoveredImage] = useState(null);

  const handleMouseOver = (image) => {
    setHoveredImage(image);
  };

  const handleMouseOut = () => {
    setHoveredImage(null);
  };

  return (
    <>
    <Navbar/>
      <div className="our-info-container">
        <div className="ourinfo-row">
          <div className="image-text">
            <img src={food} alt="Food" className="img-food" />
            <div className="overlay"></div>
            <div className="text-overlay">About us</div>
          </div>
        </div>

        {/*****************Mission and Vision************************/}
        <div className='mission-vision'>
          <div className="mission-vision-row">
            <div className="mission">
              <img src={mission} alt="Mission"/>
              <p>"Connecting home cooks with food lovers."</p>
            </div>
            <div className="vision">
              <img src={vision} alt="Vision"/>
              <p>"Empowering home cooks to thrive together."</p>
            </div>
          </div>
          <div className='our-info-image'>
            <img src={ourinfo} alt='our-info-image'></img>
          </div>
        </div>



        <div className="container2">
          <img src={mumbai} className="mumbai" alt="Mumbai" />
          <p className="dineathome">
            Dine At Home, is nestled in Mumbai and we aim to expand our reach to serve our customers across India and also to empower our team of home chefs by providing a platform to take up their passion for cooking, professionally.
            Our team is driven by foodies and curious minds from across the corporate sector whose common aim is to indulge the fellow foodies in lip-smacking home-cooked regional food!
          </p>
        </div>
      </div>
    </>
  );
}

export default OurInfo;
