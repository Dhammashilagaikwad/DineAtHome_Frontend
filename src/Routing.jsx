import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import FooterT from "./components/FooterT";
import AfterLoginNavbar from "./User/components/AfterLoginNavbar";
import Profile from "./modules/homeChef/components/Profile";

// Lazy load the components
const Userinterface = lazy(() => import("./pages/UserInterface"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const ChefsNearYou = lazy(() => import("./pages/ChefsNearYou"));
const OurInfo = lazy(() => import("./pages/OurInfo"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const FAQs = lazy(() => import("./pages/FAQs"));
const DeliveryExecutive = lazy(() => import("./pages/DeliveryExecutive"));
const Shop = lazy(() => import("./pages/Shop"));
const ChefProfile = lazy(() => import("./pages/ChefsProfile"));
const EditProfile = lazy(() => import("./User/pages/EditProfile"));
const AfterLoginPage = lazy(() => import("./User/pages/AfterLoginPage"));
const HowtoOrder = lazy(() => import("./pages/HowtoOrder"));
const AfterLoginHowtoOrder = lazy(() =>
  import("./User/pages/Afterloginhowtoorder")
);
const HomeChefsInfo = lazy(() => import("./pages/HomeChefsInfo"));
const Usershop = lazy(() => import("./User/pages/Shop"));
const UserOurInfo = lazy(() => import("./User/pages/OurInfo"));
const UserChefProfile = lazy(() => import("./User/pages/ChefsProfile"));
const UserChefsNearYou = lazy(() => import("./User/pages/ChefsNearYou"));
const AppFAQsUser = lazy(() => import("./User/pages/FAQs"));
const UserCart = lazy(() => import("./User/pages/Cart"));
const UserContactUs = lazy(() => import("./User/pages/ContactUs"));
const UserChefInfo = lazy(() => import("./User/pages/HomeChefsInfo"));
const LoginPage = lazy(() => import("./components/LoginPage"));
const SignupPage = lazy(() => import("./components/SignupPage"));
const MenuPage = lazy(() => import("./pages/MenuPage"));
const UserMenuPage = lazy(() => import("./User/pages/MenuPage"));
const Design = lazy(() => import("./pages/design"));
const Dashboard = lazy(() => import("./modules/homeChef/components/Dashboard"));
const PaymentOptions = lazy(() => import("./User/components/PaymentOptions"));
const Menu = lazy(() => import("./modules/homeChef/components/Menu"));
const ChefShop = lazy(() => import("./modules/homeChef/components/Shop"));
const History = lazy(() => import("./modules/homeChef/components/History"));
const PreNotification = lazy(() =>
  import("./modules/homeChef/components/PreNotification")
);

function Layout() {
  const location = useLocation();
  const afterLoginRoutes = [
    "/user/afterloginpage",
    "/user/editprofile",
    "/user/afterloginhowtoorder",
    "/user/usershop",
    "/user/userourinfo",
    "/user/userchef-profile/",
    "/user/userchefsnearyou",
    "/user/usercart",
    "/user/usercontactus",
    "/user/user-menu-page",
    "/user/PaymentOptions",
    "/user/userfaqs",
    "/user/userchefinfo",
  ];

  const isAfterLoginPage = afterLoginRoutes.some((route) =>
    location.pathname.includes(route)
  );
  const hiddenNavbarRoutes = [
    "/home-shefs/dashboard",
    "/home-shefs/dashboard/menu",
    "/home-shefs/dashboard/shop",
    "/home-shefs/dashboard/history",
    "/home-shefs/dashboard/prenotification",
    "/home-shefs/dashboard/profile",
  ];

  const hideNavbar = hiddenNavbarRoutes.some((route) =>
    location.pathname.includes(route)
  );

  return (
    <>
      {/* Conditionally render the correct Navbar */}
      {!hideNavbar && (
        <>{!isAfterLoginPage ? <Navbar /> : <AfterLoginNavbar />}</>
      )}
    </>
  );
}

function Routing() {
  return (
    <>
      <Router>
        <Layout />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Design />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/chefs-near-you" element={<ChefsNearYou />} />
            <Route path="/ourinfo" element={<OurInfo />} />
            <Route path="/home" element={<Home />} />
            <Route path="/delivery" element={<DeliveryExecutive />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/chef-profile/:id" element={<ChefProfile />} />
            <Route path="/search" element={<SearchPage />} />
            {/* <Route path="/history" element={<History />} /> */}
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/user/afterloginpage" element={<AfterLoginPage />} />
            <Route path="/user/editprofile" element={<EditProfile />} />
            <Route path="/howtoorder" element={<HowtoOrder />} />
            <Route path="/ourchefsinfo" element={<HomeChefsInfo />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route
              path="/user/afterloginhowtoorder"
              element={<AfterLoginHowtoOrder />}
            />
            <Route path="/user/usershop" element={<Usershop />} />
            <Route path="/user/userourinfo" element={<UserOurInfo />} />
            <Route
              path="/user/userchefsnearyou"
              element={<UserChefsNearYou />}
            />
            <Route path="/user/userfaqs" element={<AppFAQsUser />} />
            <Route path="/user/usercart" element={<UserCart />} />
            <Route path="/user/usercontactus" element={<UserContactUs />} />
            <Route
              path="/user/userchef-profile/:id"
              element={<UserChefProfile />}
            />
            <Route path="/user/user-menu-page" element={<UserMenuPage />} />
            <Route path="/user/PaymentOptions" element={<PaymentOptions />} />
            <Route path="/user/userchefinfo" element={<UserChefInfo />} />

            <Route path="/menu-page" element={<MenuPage />} />
            <Route path="/design" element={<Design />} />
            <Route path="/home-shefs/dashboard" element={<Dashboard />} />
            <Route path="/home-shefs/dashboard/menu" element={<Menu />} />
            <Route path="/home-shefs/dashboard/shop" element={<ChefShop />} />
            <Route path="/home-shefs/dashboard/history" element={<History />} />
            <Route path="/home-shefs/dashboard/profile" element={<Profile />} />
            <Route
              path="/home-shefs/dashboard/prenotification"
              element={<PreNotification />}
            />
          </Routes>
        </Suspense>

        <div style={{padding: '4rem 0 0 0'}}>
          <FooterT />
        </div>
      </Router>
    </>
  );
}

export default Routing;
