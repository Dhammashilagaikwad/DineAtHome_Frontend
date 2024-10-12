import React from 'react';
import "../styles/FooterT.css";

export default function FooterT() {
  return (
    <div className="FooterMainBox">
      <div className="FooterBox">
        <div className="Footerr">
          <div className="FooterrOne">
            <div className="LogoImage">DineAtHome</div>
          </div>

          <div className="FooterrTwo">
            <strong><p>About Us</p></strong>
            <p>Behind the Kitchen</p>
            <p>Meet Our Chefs</p>
            {/* <p>Content 3</p> */}
          </div>

          <div className="FooterrThree">
            <strong><p>Join Us</p></strong>
            <p>HomeChef</p>
            <p>Delivery Partner</p>
            {/* <p>Content 6</p> */}
            <strong><p>Shop</p></strong>
            <strong><p>FAQs</p></strong>
            {/* <p>Content 7</p> */}
            {/* <p>Content 8</p> */}
            {/* <p>Content 9</p> */}
          </div>

          <div className="FooterrFour">
            <p>DINE AT HOME</p>
            {/* <p>34/265, Anand Nagar,</p> */}
            {/* <p>Vakola, Santacruz East,</p> */}
            <p>A platform developed by a group of friends.</p>
            <strong><p>DineAtHome.com</p></strong>
          </div>
        </div>

<hr />
        <div className="rightsReserved">
          <p>© 2024 All Rights Reserved DineAtHome.</p>
          {/* <p>Ecom Ventures Pvt Ltd.</p> */}
        </div>
      </div>
    </div>
  );
}
