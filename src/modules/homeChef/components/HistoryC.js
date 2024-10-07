import React from 'react'
import "../styles/HistoryC.css"

export default function HistoryC(props) {
  return (
    <>
      <div className="ReqCont">
        <div className="mainBoxR">
          <div className='co'>
            <div className="customerName">{props.customerName}</div>
            <div className="orderd-date">{props.orderDate}</div>
          </div>

          <div className="customerInfo">{props.customerInfo}</div>
          <div className="item-price">₹{props.itemPrice} </div>

          {/* <div className="boxR"></div> */}
        </div>
      </div>

    </>
  )
}
