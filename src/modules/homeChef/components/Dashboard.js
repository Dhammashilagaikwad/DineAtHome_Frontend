import Navbar from "./Navbar";
import CardsView from './CardsView'
import SideBar from './Sidebar';
import History from './History';
import Faq from './Faq';
import ForgotPassword from './ForgotPassword'

function Dashboard(){   
    return(
        <>
        <Navbar/>
        <div className="flex flex-row">
        <SideBar/>
        <CardsView/>
        </div>
        </>
    )
}

export default Dashboard;