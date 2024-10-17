import React, { useState, useEffect } from "react";
import "../styles/Ourinfo.css"; // Import the CSS file
import food from "../images/food11.jpg";
import mission from "../images/mission.png";
import vision from "../images/vision.png";
import mumbai from "../images/Mumbai.jpg";
import ourinfo from "../images/Cooking-rafiki.png";
import team from "../images/team.png";
import AfterLoginNavbar from "../components/AfterLoginNavbar";

function UserOurInfo() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the page is loaded
  }, []);
  const [hoveredImage, setHoveredImage] = useState(null);

  const handleMouseOver = (image) => {
    setHoveredImage(image);
  };

  const handleMouseOut = () => {
    setHoveredImage(null);
  };

  return (
    <>
      {/* <AfterLoginNavbar/> */}
      <div className="our-info-container">
        <div className="ourinfo-row">
          <div className="image-text">
            <img src={food} alt="Food" className="img-food" />
            <div className="overlay"></div>
            <div className="text-overlay">About us</div>
          </div>
        </div>

        {/*****************Mission and Vision************************/}
        <div className="mission-vision">
          <div className="mission-vision-row">
            <div className="mission">
              <img src={mission} alt="Mission" />
              <p>"Connecting home cooks with food lovers."</p>
            </div>
            <div className="vision">
              <img src={vision} alt="Vision" />
              <p>"Empowering home cooks to thrive together."</p>
            </div>
          </div>
          <div className="our-info-image">
            <img src={ourinfo} alt="our-info-image"></img>
          </div>
        </div>

        {/* <div className="container2">
          <img src={mumbai} className="mumbai" alt="Mumbai" />
          <p className="dineathome">
            Dine At Home, is nestled in Mumbai and we aim to expand our reach to serve our customers across India and also to empower our team of home chefs by providing a platform to take up their passion for cooking, professionally.
            Our team is driven by foodies and curious minds from across the corporate sector whose common aim is to indulge the fellow foodies in lip-smacking home-cooked regional food!
          </p>
        </div> */}

        <div className="team-heading">OUR TEAM</div>
        <br />
        <div className="team-content">
          <div className="team-details">
            <div className="left-team-content">
              <img src={team} alt="team"></img>
            </div>
            <div className="right-team-content">
              <p>
                {/* Our project team is composed of highly skilled professionals
                specializing in software development, design, and project
                management. We are collaboratively working to develop an
                innovative food delivery platform that seamlessly integrates
                customer satisfaction with technological efficiency.<br/> */}
                <br />
                <span>
                  {" "}
                  <a
                    href="https://www.linkedin.com/in/harsha-bhondwe-java/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Harsha Bhondwe{" "}
                  </a>
                </span>{" "}
                – Team Leader, responsible for overseeing project management,
                team coordination, and overall project strategy. Harsha also
                leads the UI design and development, working closely with the
                team to ensure a cohesive user experience.
                <br />
                <br />
                <span>
                  {" "}
                  <a
                    href="https://www.linkedin.com/in/dhammashila-gaikwad-20250324a/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Dhammashila Gaikwad{" "}
                  </a>
                </span>{" "}
                – Co-Leader, overseeing the backend technologies and platform
                functionality. Dhammashila is instrumental in ensuring the
                technical infrastructure operates efficiently and meets project
                requirements.
                <br /> <br />{" "}
                <span>
                  {" "}
                  <a
                    href="https://www.linkedin.com/in/shivam-atale-ai-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Shivam Atale{" "}
                  </a>
                </span>{" "}
                – Backend Developer, collaborating with the Co-Leader to manage
                and optimize backend operations, ensuring a stable and scalable
                platform.
                <br />
                <br />{" "}
                <span>
                  {" "}
                  <a
                    href="https://www.linkedin.com/in/satyam-gupta-webd/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Satyam Gupta
                  </a>
                </span>{" "}
                – UI/UX Developer, responsible for managing the platform’s
                interface design and functionality to create an intuitive and
                user-friendly experience.
              </p>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserOurInfo;
