import React, { useState } from 'react';
import '../styles/FAQs.css';
import FAQsImage from "../images/FAQsimage2.avif";
import AfterLoginNavbar from '../components/AfterLoginNavbar';

function AppFAQsUser(){
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      question: "What is DineAtHome?",
      answer: "DineAtHome is an online marketplace that allows you to order home-cooked meals and freshly baked treats from our registered KitchenStars and BakeStars."
    },
    {
      question: "How does DineAtHome work?",
      answer: "You can browse a variety of homemade meals and place an order directly from the app. Our KitchenStars prepare and deliver the food."
    },
    {
      question: "How do I become a KitchenStar?",
      answer: "You can apply to become a KitchenStar by filling out the registration form on our website, and our team will get in touch with you."
    }
  ];

 

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <AfterLoginNavbar/>
      <div className='faqs-container'>
      <div className="faq-ourinfo-row">
        <div className="image-text">
          <img src={FAQsImage} alt="Food" className="img-food" />
          <div className="overlay"></div>
          <div className="text-overlay">
            FREQUENTLY ASKED <br /> QUESTIONS <br /><br />
          </div>
        </div>
      </div>

      <div className="AppFAQs">
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-container">
              <div className="faq-question" onClick={() => toggleAnswer(index)}>
                <span className="faq-icon">{openIndex === index ? '▼' : '▲'}</span>
                <span className="faq-title">{faq.question}</span>
              </div>
              {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default AppFAQsUser;
