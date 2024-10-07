import React from 'react'
import WomanHomechef from "../images/woman-using-tablet-while-cooking-vegetables.jpg"
import "../styles/FourthPg.css"
import { useNavigate } from 'react-router-dom'

export default function FourthPg() {
    const navigate = useNavigate()
    const handleJoinUs=()=>{
        navigate('/home');
    }
    return (
        <div className='FourthPgMainBox'>
            <h1>Home Chef</h1>
            <div className="FourthPgBox">
                <div className="ImageForFourthPg">
                    <img className="ImageForFourthPgImage" src={WomanHomechef} alt="WomanHomechefImage" />

                </div>

                <div className="LineBtnForFourthPg">
                    <p>Home Chef is a meal kit delivery service that 
                        makes cooking at home convenient and enjoyable.
                        With a variety of meal options, Home Chef caters 
                        to different tastes and dietary preferences, 
                        allowing you to choose from a rotating menu of fresh ingredients and easy-to-follow recipes.


                    </p>
                    <button className="joinNowBtn" onClick={handleJoinUs}>Join Now</button>
                </div>
            </div>

        </div>
    )
}
