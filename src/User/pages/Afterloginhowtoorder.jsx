import check from "../images/check.png";
import order from "../images/Order food-pana.png";
import food2 from "../images/creative-mockup-flying-various-types-260nw-1740389957-removebg-preview.png";
import "../styles/UserInterface.css";
import AfterLoginNavbar from '../components/AfterLoginNavbar.jsx'

export default function Afterloginhowtoorder(){
    return(
        <>
        <AfterLoginNavbar/>
        <div className="how-to-order">
        <img src={food2} id="howback" alt="background-food" />
       
        <div className="content4">
        <h2 id="how">HOW TO ORDER</h2>
          <div className="left-part">
            <ul>
              <li id="points1">
                <img src={check} alt="smile" id="smallicons" />
                <p>
                  Type DineAtHome On Browser and Allow the webpage To
                  Detect Your Current Location.
                </p>
              </li>
              <li id="points1">
                <img src={check} alt="smile" id="smallicons" />
                <p>
                  Browse Through the Available Home Chefs In Your Area, the
                  Kitchen Which Shows First Is Closest To You.
                </p>
              </li>
              <li id="points1">
                <img src={check} alt="smile" id="smallicons" />
                <p>
                  Before Adding Items to Cart, Do the Login using email and then <br></br>Add The Items to Your Cart And Proceed To Checkout (have to
                  order 120mins before for chef to prepare food).
                </p>
              </li>
              <li id="points1">
                <img src={check} alt="smile" id="smallicons" />
                <p>
                  Enter Your Delivery Address and Select a Delivery Time Slot.
                </p>
              </li>
              <li id="points1">
                <img src={check} alt="smile" id="smallicons" />
                <p>
                  Register Your Phone Through OTP Validation. <br></br>
                  Select Pay Online To Place Order.
                </p>
              </li>
              <li id="points1">
                <img src={check} alt="smile" id="smallicons" />
                <p>Food prepared at home kitchens will get delivered.</p>
              </li>
            </ul>
          </div>
          
        </div>
        <div className="right-part">
            <img src={order} id="order"></img>
          </div>
      </div>
        </>
    )
}
