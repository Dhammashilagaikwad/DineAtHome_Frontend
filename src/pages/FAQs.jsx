import React, { useState,useEffect } from 'react';
import '../styles/FAQs.css';
import FAQsImage from "../images/FAQsimage2.avif";
// import Navbar from '../components/Navbar';

const Faqs = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the page is loaded
}, []);
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
    },
    {
      question: "What are the expectations regarding meal preparation and delivery timelines?",
      answer: "As a Home Chef, you are expected to prepare meals according to a set schedule, typically within a specific timeframe (e.g., 30-45 minutes per meal). Deliveries are usually coordinated to ensure that ingredients are fresh and reach customers on time."
    },
    {
      question: "Am I allowed to create my own recipes, or do I have to follow provided ones?",
      answer: "While you’ll receive guidance and recipes to maintain consistency, there’s often room for creativity. Many platforms encourage chefs to innovate and introduce unique dishes, especially if they align with customer preferences."
    },
    {
      question: "How does the payment structure work?",
      answer: "ayments are generally made based on the number of meals sold, minus any platform fees. You will receive regular payouts, often bi-weekly or monthly. Detailed statements of your sales and commissions will be provided to maintain transparency."
    },
    {
      question: "What are the health and safety standards I need to adhere to while preparing meals?",
      answer: "All Home Chefs must comply with local health regulations, including proper food handling, hygiene practices, and kitchen safety. Regular training sessions may be provided to keep you updated on best practices."
    },
    {
      question: "How can I receive feedback from customers?",
      answer: " Customer feedback is collected through reviews and ratings on the platform. You can also directly engage with customers for suggestions. Constructive feedback is encouraged, as it helps improve your offerings and customer satisfaction."
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
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

export default Faqs;
