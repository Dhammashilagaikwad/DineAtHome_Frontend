import React, { useState, useEffect, useRef } from "react";
import SecondPg from '../components/SecondPg';
import ThirdPg from '../components/ThirdPg';
import FourthPg from "../components/FourthPg";
import '../styles/FeatureSection.css'
import { useNavigate } from "react-router-dom";

export default function Design() {
  const sentences = ["WELCOME TO DINEATHOME!", "FRESHLY CRAFTED, ONLY WHEN YOU ASK."];
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [letterIndex, setLetterIndex] = useState(0);
  const speed = 100;

  useEffect(() => {
    const handleTyping = () => {
      const currentSentence = sentences[currentSentenceIndex];

      if (!isDeleting) {
        if (letterIndex < currentSentence.length) {
          setDisplayedText((prev) => prev + currentSentence[letterIndex]);
          setLetterIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 500);
        }
      } else {
        if (letterIndex > 0) {
          setDisplayedText((prev) => prev.slice(0, -1));
          setLetterIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentSentenceIndex((prev) => (prev + 1) % sentences.length);
        }
      }
    };

    const interval = setInterval(handleTyping, speed);
    return () => clearInterval(interval);
  }, [letterIndex, isDeleting, currentSentenceIndex, sentences]);


  const features = [
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/5044/5044740.png',
      title: 'Gharwala Khana Har-roz',
      // description: 'Order your first food and get up-to 70% Discount.'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/2770/2770013.png',
      title: 'Made with Fresh ingredients',
      // description: 'We serve the food quicker when our customers wait at the table.'
    },
    {
      icon: 'https://cdn2.iconfinder.com/data/icons/professions-vivid-vol-1/256/Chef_Female-1024.png',
      title: 'Cooked by the best homechef',
      // description: 'We provide 100% Fresh and Authentic Foods to you.'
    },
    {
      icon: 'https://cdn4.iconfinder.com/data/icons/happy-new-year-2028/64/Food-party-new-year-celebration-festival-beverage-512.png',
      title: 'Festive/Seasonal Food',
      // description: 'We guarantee the best quality in every meal we prepare.'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/613/613584.png',
      title:'Pre Orders Available',
      // description: 'We use only organic and healthy ingredients in our recipes.'
    }
  ];

  const navigate = useNavigate();

  const handleStartOrderClick = () => {
    navigate("/menu-page");
  };

  const handleContactUsClick=()=>{
    navigate("/contact-us");
  }

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the page is loaded
}, []);

  return (
    <>
      <div className="w-full min-h-screen flex-col bg-stone-100 sm:w-full xl:flex-row" >
        <div className="flex flex-wrap min-h-screen items-center">
          {/* First section with text and image */}
          <div className="bg-stone-100 m-0 p-0 w-full sm:w-1/2 flex flex-col justify-center sm:justify-start items-center sm:items-start">
            <div className="sm:ml-20 text-center sm:text-left">
              <img
                className="w-auto h-auto -ml-36 sm:w-auto sm:-ml-20 sm:-mt-56 relative"
                alt="veges"
                src="https://www.pngkit.com/png/full/67-674511_vegetable-png.png"
              />
              <div className="w-full text-left sm:w-5/12 h-auto sm:h-82 sm:-mt-56 pl-16 -ml-24 -mt-48 sm:ml-8 sm:mb-16 md:mb-24 absolute">
                <h1 className="text-black leading-10 font-light text-3xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-7xl font-sans mb-4 md:mb-6">
                  Food That Feels Like A Hug From Mom..
                </h1>

                {/* Ensure the font size is responsive */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-green-700 transition-all duration-300 ease-in-out">
                  {displayedText}
                </h1>
              </div>
              <div className="mt-6 sm:mt-24 ml-0 sm:ml-28 border-2 border-green-800 bg-white p-2 sm:p-4  shadow-[5px_5px_rgba(2,104,0,0.8)] lg:shadow-[5px_5px_rgba(2,104,0,0.8)]">
                <button className="text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl" onClick={handleStartOrderClick}>Order Now</button>
              </div>
              <div className="mt-4 ml-0 sm:ml-28 border-2 border-green-800 bg-white p-2 sm:p-4 sm:mt-24 md:mt-36 lg:mt-48 shadow-[5px_5px_rgba(2,104,0,0.8)] lg:shadow-[5px_5px_rgba(2,104,0,0.8)]">
                <button className="text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl" onClick={handleContactUsClick}>Contact Us</button>
              </div>
            </div>
          </div>

          {/* Second section with image */}
          <div className="bg-amber-300 p-4 w-full h-full md:w-1/2 rounded-tl-full md:h-screen md:shadow-xl  flex justify-center items-center">
            <img
              className="w-full h-auto sm:w-4/5 lg:w-3/4 2xl:w-2/3"
              src="https://th.bing.com/th/id/R.75d3cc8d7c6240224f90f92ea991ac71?rik=iLHIWfBt8Og4Yg&riu=http%3a%2f%2froti-hut.co.uk%2fwp-content%2fuploads%2felementor%2fthumbs%2fmenu-img11-min-q5744hjo8prgx8wf32jfd54xik8x1cr4w081cnzmhs.png&ehk=tW7V01dS3lMJ8RSAaX9oXolitUHOESX4EVYzEPZ9OWQ%3d&risl=&pid=ImgRaw&r=0"
              alt="Malai kofta"
            />
            {/* <div>
              <button>CONTACT US</button>
            </div> */}
          </div>
        </div>
        <div className="feature-section">
      {features.map((feature, index) => (
        <div className="feature-card" key={index}>
          <img src={feature.icon} alt={feature.title} className="feature-icon" />
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
      </div>
      <SecondPg />
      <ThirdPg/>
      <FourthPg/>
    </>
  );
}
