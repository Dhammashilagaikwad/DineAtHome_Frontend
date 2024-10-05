import AfterLoginNavbar from '../components/AfterLoginNavbar.jsx'
import UserLogininterface from '../pages/UserLoginInterface.jsx';
import UserMenuPage from '../pages/MenuPage.jsx';
import { useEffect } from 'react';

function AfterLoginPage(){
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when the page is loaded
    }, []);
    return(
        <>
        <AfterLoginNavbar/>
        {/* <UserLogininterface/> */}
        <UserMenuPage/>
        </>
    )
}

export default AfterLoginPage;