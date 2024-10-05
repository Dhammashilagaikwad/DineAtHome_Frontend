import React from "react";
import MainPage from "../components/MainPage";
import { useEffect } from "react";

function Home() {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when the page is loaded
    }, []);
    return (
        <>
        {/* <Navbar li1="HOME" li2="OUR INFO" li3="REQUESTS" li4="NOTIFICATIONS" li5="HISTORY" li6="FAQs"  /> */}
        <div className="home-page">
            <MainPage tagline1 = "Let Your Flavors" tagline2 = "Tell the Story." wellcomeLine = "Wellcome Chefs" loginbtn = "Login" registrationbtn = "Registration"/>

        </div>

        </>
    );
}

export default Home;
