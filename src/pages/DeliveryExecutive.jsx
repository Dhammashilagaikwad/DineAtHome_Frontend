import food from '../images/food11.jpg';
import deliver from '../images/delivery-boy-riding-scooter.jpg';
import '../styles/DeliveryExecutive.css';
import DeliverForm from '../components/DeliveryForm';

function DeliveryExecutive() {
    return (
        <>
            <div className="deliver-container">
                <div className="deliver-row">
                    <div className="image-text">
                        <img src={food} alt="Food" />
                        <div className="overlay"></div>
                        <div className="text-overlay">Join us as delivery partner</div>
                    </div>
                </div>
                <div className='deliver-form-container'>
                    <img src={deliver} alt="DeliveryBoy" className='deliverboy-img' />
                    <div className='deliver-form'>
                        <DeliverForm />
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeliveryExecutive;
