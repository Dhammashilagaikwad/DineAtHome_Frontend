import logo from '../images/dineathome.png';
import info from "../images/info.png";
import call from '../images/call.png'
import shop from '../images/shop.png'
import { Link } from 'react-router-dom';
import '../styles/Footer.css'

function Footer(){
    return(<>
    <section className="footer">
        <div className="footer-content">
            <div className="footer-left">
                <h1 id='logo1'>Dineathome</h1>
            </div>
            <ul>
                <li id="points2"><img src={info} alt="about" id="smallicons1"/><Link to="/ourinfo">About</Link></li>
                <li id="points2"><img src={call} alt="call" id="smallicons1"/><Link to="/contact-us">Contact us</Link></li>
                <li id="points2"><img src={shop} alt="shop" id="smallicons1"/><Link to="/shop">Shop</Link>
                </li>
            </ul>
            <p id="lastline"><span>&copy; DINEATHOME </span>{new Date().getFullYear()} Copyright reserved</p>
        </div>
    </section>
    </>)
}

export default Footer