import Navbar from "./Navbar";
import CardsView from './CardsView'
import Sidebar from './Sidebar';
import History from './History';
import Faq from './Faq';
import ForgotPassword from './ForgotPassword'

function Dashboard(){
    return(
        <>
        <Navbar/>
        <Sidebar/>
        <CardsView/>
        {/* <History/>
        <Faq/> */}
        {/* <ForgotPassword/> */}
        </>
    )
}

export default Dashboard;