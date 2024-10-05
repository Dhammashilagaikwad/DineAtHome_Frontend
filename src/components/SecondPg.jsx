import React from 'react'
import '../styles/SecondPg.css'
import FreeDelivery from "../images/FreeDelivery-removebg-preview.png"
import PremiumQuality from "../images/Premium-removebg-preview.png"
import HandMade from "../images/HandMade.png"
import OnlinePayment from "../images/OnlinePayment-removebg-preview.png"
import CartForSecondPg from '../components/CartForSecond'

export default function SecondPg() {
    return (
        <div>

            <div className="secondPgMain">
                <div className="secondPg">
                    <div className="secondPgH">

                        <h1 className='text-3xl p-4 font-bold'>Delivering delicious, home-style dishes crafted by moms directly to your door!</h1>

                    </div>

                    <div className="secondPgP">

                        <p>Our homemade food are the perfect way to elevate your dining experience. </p>
                        <p> We’ve curated a selection of delightful treats that will excite your taste
                            buds and keep you coming back for more.</p>

                    </div>

                    <div className="secondPgLogo">
                        <div className="secondPgLogoOne">
                            <img className='secondPgLogoOneImage' src={FreeDelivery} alt="FreeDeliveryImage" />
                        </div>

                        <div className="secondPgLogoTwo">
                            <img className='secondPgLogoTwoImage' src={PremiumQuality} alt="PremiumQualityImage" />
                        </div>

                        <div className="secondPgLogoThree">
                            <img className='secondPgLogoThreeImage' src={HandMade} alt="HandMadeImage" />

                        </div>

                        <div className="secondPgLogoFour">
                            <img className='secondPgLogoFourImage' src={OnlinePayment} alt="OnlinePaymentImage" />

                        </div>

                    </div>
                </div>
            </div>

      <CartForSecondPg/>


        </div>
    )
}
