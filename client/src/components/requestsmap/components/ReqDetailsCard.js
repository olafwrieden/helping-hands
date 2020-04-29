import React from 'react'
import '../RequestsMap.css'

const ReqDetailsCard = ({clickedItem, setClickedItem}) => {
    const {requestedUser, type, details, payment, requestedAt, address, city, zipCode} = clickedItem
    return (
        <div className="card mc-req-details">
            <h3 className="subtitle">Request Details</h3>
            <span>Requested by: {requestedUser}</span>
            <span>Type of Request: {type}</span>
            <span>Details: {details}</span>
            {payment !== "nopayment" && <span>Payment method: {payment}</span>}
            <span>Requested At: {requestedAt}</span>
            <span>Address: {`${address} ${city} ${zipCode}`}</span>
        </div>
    )
}

export default ReqDetailsCard
