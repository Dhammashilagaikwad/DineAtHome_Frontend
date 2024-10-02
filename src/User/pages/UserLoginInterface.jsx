// import flyingfood from "../images/different-vegetables-falling-into-frying-pan-isolated-mix-of-sliced-flying-food-ai-generative-free-png.png";
import food1 from "../images/47c27cd47bf99b2fb4044c3c0d7d8e0357259cfb-1920x891.png";
import food3 from "../images/4479.jpg_wh860__1_-removebg.png";
// import food4 from "../images/back2.png";
// import food2 from "../images/creative-mockup-flying-various-types-260nw-1740389957-removebg-preview.png";
import "../styles/UserInterface.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import gharwala from "../images/gharwala_khana.jpg";
import veges from "../images/vegetables.jpg";
import chef from "../images/besthomechef.jpg";
import festive from "../images/festivefood.jpg";
// import freshfood from "../images/freshpreparedfood.jpg";
import preorder from "../images/preorder.jpg";
// import check from "../images/check.png";
import baker from "../images/Baker-cuate.png";
import lunch from "../images/Lunch time-pana.png";
// import order from "../images/Order food-pana.png";
import takeaway from "../images/Take Away-cuate.png";
import { useRef,useEffect,useState } from "react";
import HomechefPopup from '../../pages/HomechefPopup';
import Popup from "../../pages/Popup";

function Userinterface() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        setUsername(storedUsername);
    }
}, []);


  const handleStartOrderClick = () => {
    navigate("/userchefsnearyou");
  };

  const backgroundRef = useRef(null);
  const flyingFoodRef = useRef(null);
  const taglineRef = useRef(null);
  const tagline1Ref = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Callback function for the Intersection Observer
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    };

    // Create an Intersection Observer instance
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1 // Adjust this as needed
    });

    // Observe the elements
    if (backgroundRef.current) observer.observe(backgroundRef.current);
    if (flyingFoodRef.current) observer.observe(flyingFoodRef.current);
    if (taglineRef.current) observer.observe(taglineRef.current);
    if (tagline1Ref.current) observer.observe(tagline1Ref.current);
    if (buttonRef.current) observer.observe(buttonRef.current);

    // Clean up the observer on component unmount
    return () => {
      if (backgroundRef.current) observer.unobserve(backgroundRef.current);
      if (flyingFoodRef.current) observer.unobserve(flyingFoodRef.current);
      if (taglineRef.current) observer.unobserve(taglineRef.current);
      if (tagline1Ref.current) observer.unobserve(tagline1Ref.current);
      if (buttonRef.current) observer.unobserve(buttonRef.current);
    };
  }, []);

  const explorePointsRef = useRef(null);

  useEffect(() => {
    // Callback function for the Intersection Observer
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    };

    // Create an Intersection Observer instance
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1 // Adjust this as needed
    });

    // Observe the elements
    if (explorePointsRef.current) observer.observe(explorePointsRef.current);

    // Clean up the observer on component unmount
    return () => {
      if (explorePointsRef.current) observer.unobserve(explorePointsRef.current);
    };
  }, []);

  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState('');
  const [showHomechefPopup, setShowHomechefPopup] = useState(false); // State for Homechef Popup

  const handleOpen = (content) => {
    setPopupContent(content);
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
    setShowHomechefPopup(false); 
  };

  const handleOpenHomechefPopup = () => {
    setShowHomechefPopup(true);
    setShowPopup(false); 
  };

  return (
    <>
       <div className="user-container">
      <div className="left-image-section">
        <img src={food1} alt="background-food" ref={backgroundRef} />
        <img src={food3} alt="flying-food" ref={flyingFoodRef} />
      </div>
      <div className="tagline-container">
        <h1 className="food-tagline" ref={taglineRef}>
          FOOD THAT FEELS<br /> LIKE A HUG FROM MOM..
        </h1>
        <h3 className="food-tagline1" ref={tagline1Ref}>
          {username ? (
                <h2>Welcome, {username} to Dine At Home!!</h2>
            ) : (
                <h2>Welcome!</h2>
            )}

        </h3>
        <button className="buttonorder" ref={buttonRef} onClick={handleStartOrderClick}>
          START ORDER
        </button>
        <Link to="/usercontactus">
          <button className="buttonorder">CONTACT US</button>
        </Link>
      </div>
    </div>


      
    <div className="explore-web">
      <h2 id="head-explore">EXPLORE DINEATHOME</h2>
      <ul className="explore-points" ref={explorePointsRef}>
        <li>
          <img src={gharwala} className="circle-image" alt="gharwala khana" onClick={() => handleOpen('home-cooked')}/>
          <p className="explore-text">Gharwala Taste<br /> Har-roz</p>
        </li>
        <li>
          <img src={veges} className="circle-image" alt="veges" onClick={() => handleOpen('fresh-ingredients')}/>
          <p className="explore-text">Made with fresh &<br /> pure ingredients</p>
        </li>
        <li>
          <img src={chef} className="circle-image" alt="chef" onClick={handleOpenHomechefPopup}/>
          <p className="explore-text">Cooked by the<br /> best home chef</p>
        </li>
        <li>
          <img src={festive} className="circle-image" alt="festive" />
          <p className="explore-text">Festive / seasonal food</p>
        </li>
        {/* <li>
          <img src={freshfood} className="circle-image" alt="freshfood" />
          <p className="explore-text">Freshly prepared<br /> everyday</p>
        </li> */}
        {/* Had to add seasonal offers */}
        <li>
          <img src={preorder} className="circle-image" alt="preorder" />
          <p className="explore-text">Pre-orders available</p>
        </li>
        {/* <Popup show={showPopup} handleClose={handleClose} content={popupContent} /> */}
      </ul>
    </div>

        <div className="we-are">
        <h5>DineAtHome is a reliable and convenient Home food delivery service that operates in Mumbai. DineAtHome, you can enjoy a delicious and healthy meal delivered straight to your doorstep without having to leave your house.</h5>
        <img src={baker} alt="Baker"></img>
        <img src={takeaway} alt="Take away"></img>
        <img src={lunch} alt="Lunch"></img>
        {/* <img src={order} alt="Order"></img> */}
        <p>The service is designed to cater to busy individuals who don’t have the time to cook or those who want to enjoy a home-cooked meal without having to prepare it themselves.</p>
      </div>
      <Popup show={showPopup} handleClose={handleClose} content={popupContent} />
      <HomechefPopup isOpen={showHomechefPopup} onClose={handleClose} /> 
    </>
  );
}

export default Userinterface;
