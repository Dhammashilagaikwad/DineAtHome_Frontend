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
            <strong><p>Heading 1</p></strong>
            <p>Content 1</p>
            <p>Content 2</p>
            <p>Content 3</p>
          </div>

          <div className="FooterrThree">
            <strong><p>Heading 2</p></strong>
            <p>Content 4</p>
            <p>Content 5</p>
            <p>Content 6</p>
            <strong><p>Heading 3</p></strong>
            <p>Content 7</p>
            <p>Content 8</p>
            <p>Content 9</p>
          </div>

          <div className="FooterrFour">
            <p>PATILKAKI ECOM VENTURES PVT LTD</p>
            <p>34/265, Anand Nagar,</p>
            <p>Vakola, Santacruz East,</p>
            <strong><p>+918591336124</p></strong>
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
