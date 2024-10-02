import React from 'react'

export default function gfdx() {
    return (



        <div className="price-inputForShop">
            <span>₹</span>
            <input className='inputForShop'
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={!isEditable}
            />
        </div>

    )
}
