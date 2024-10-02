import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Userinterface from './pages/UserInterface';
import ContactUs from './pages/ContactUs';
import ChefsNearYou from './pages/ChefsNearYou';
import OurInfo from './pages/OurInfo';
import SearchPage from './pages/SearchPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Cart from './pages/Cart';
import FAQs from "./pages/FAQs";
import DeliveryExecutive from './pages/DeliveryExecutive';
import Shop from './pages/Shop';
import ChefProfile from './pages/ChefsProfile';
import Editprofile from './User/pages/EditProfile';
import AfterLoginPage from './User/pages/AfterLoginPage';
import HowtoOrder from './pages/HowtoOrder';
import HomechefPopup from './pages/HomechefPopup';
import Afterloginhowtoorder from './User/pages/Afterloginhowtoorder';
import { useEffect, useState } from 'react';
import AppFAQs from './HomeChef/Pages/Faqs';
import HomechefHome from './HomeChef/Pages/Home';
import History from './HomeChef/Pages/History';
import  Notification from './HomeChef/Pages/Notification';
import HomechefOurInfo from './HomeChef/Pages/OurInfo';
import HomeChefShop from './HomeChef/Pages/Shop';
import HomeChefsInfo from './pages/HomeChefsInfo';
import Usershop from './User/pages/Shop'
import UserOurInfo from './User/pages/OurInfo';
import UserChefProfile from './User/pages/ChefsProfile';
import UserChefsNearYou from './User/pages/ChefsNearYou';
import AppFAQsUser from './User/pages/FAQs';
import UserCart from './User/pages/Cart';
import UserContactUs from './User/pages/ContactUs';

import axios from 'axios';


function AppContent() {
  const location = useLocation();
  // List of routes where the Navbar should not be visible
  const noNavbarRoutes = ['/our-info','/notification','/history','/afterloginpage','/editprofile','/afterloginhowtoorder','/homecheffaqs',
    '/homechefhome','/Homechefhome','/homechefourinfo','/homechefshop','/usershop','/userourinfo','/userchefsnearyou','/userfaqs','/usercontactus','/usercart'];

  return (
    <>
      {/* Conditionally render the Navbar based on the current route */}
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Userinterface />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path='/chefs-near-you' element={<ChefsNearYou />} />
        <Route path='/ourinfo' element={<OurInfo />} />
        <Route path="/home" element={<Home />} />
        <Route path="/delivery" element={<DeliveryExecutive />} />
        <Route path='/shop' element={<Shop/>}/>
        <Route path="/chef-profile/:id" element={<ChefProfile />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/afterloginpage' element={<AfterLoginPage/>}/>
        <Route path='/editprofile' element={<Editprofile/>}/>
        <Route path='/howtoorder' element={<HowtoOrder/>}/>
        <Route path='/ourchefsinfo' element={<HomeChefsInfo/>}/>
        <Route path='/homechefpopup' element={<HomechefPopup/>}/>

        <Route path='/homechefourinfo' element={<HomechefOurInfo/>}/>
        <Route path='/homecheffaqs' element={< AppFAQs/>}/>
        <Route path='/homechefhome' element={<HomechefHome/>}/>
        <Route path='/notification' element={<Notification/>}/>
        <Route path='/homechefshop' element={<HomeChefShop/>}/>

        <Route path='/afterloginhowtoorder' element={<Afterloginhowtoorder/>}/>
        <Route path='/usershop' element={<Usershop/>}/>
        <Route path='/userourinfo' element={<UserOurInfo/>}/>
        <Route path='/userchefsnearyou' element={<UserChefsNearYou/>}/>
        <Route path='/userfaqs' element={<AppFAQsUser/>}/>
        <Route path='/usercart' element={<UserCart/>}/>
        <Route path='/usercontactus' element={<UserContactUs/>}/>
        <Route path="/userchef-profile/:id" element={<UserChefProfile />} />
      </Routes>
      <Footer />
    </>
  );
}

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Request data from the backend
    axios.get('http://localhost:4000/')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Router>
      <AppContent />
      <div>
      <h1>React and Node.js Connection</h1>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
    </Router>
    
  );
};

export default App;
