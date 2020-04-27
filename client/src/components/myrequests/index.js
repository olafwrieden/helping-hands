import React, { useState } from 'react'
import './MyRequests.css'

const MyRequests = () => {
    const [clickedIndex, setClickedIndex] = useState(null)
    const requestsData = [
        {
            type: "Assistance",
            requestedAt: "08:00",
            status: "Accepted",
            acceptedBy: "Tom Hardy",
            details: "I need assistance mowing my lawn please.",
            address: "3 Example Street",
            city: "Auckland"
        },
        {
            type: "Pickup",
            requestedAt: "10:00",
            status: "Pending",
            acceptedBy: "N/A",
            details: "I need 3 carrots, 4 onions and a pumpkin from the grocery store.",
            address: "5 Test Drive",
            city: "Auckland"
        },
        {
            type: "Assistance",
            requestedAt: "09:00",
            status: "Pending",
            acceptedBy: "N/A",
            details: "I need my gutters cleaned out.",
            address: "21 Jump Street",
            city: "Auckland"
        },
        {
            type: "Third Party Assistance",
            requestedAt: "11:30",
            status: "Accepted",
            acceptedBy: "Jemma Schofield",
            details: "I am requesting assistance on behalf of my sick Aunt, please pick up some panadol for her.",
            address: "10 Dawning Street",
            city: "Auckland"
        }
    ]

    const showDivFunc = index => {
        return clickedIndex === index 
        ? setClickedIndex(null)
        : setClickedIndex(index)
    }

    return (
        <div className="requests-container card">
            <h2 className="title is-3">My Requests</h2>
            <div className="card">
                <div className="level columns is-mobile req-title-row is-marginless is-paddingless">
                    <span className="column is-one-quarter has-text-weight-bold">Type</span>
                    <span className="column is-one-quarter has-text-weight-bold">Requested At</span>
                    <span className="column is-one-quarter has-text-weight-bold">Status</span>
                    <span className="column is-one-quarter has-text-weight-bold">Accepted By</span>
                </div>
                {requestsData.map((item, idx) => 
                <div className={`${item.type === "Assistance" 
                                    ? "has-background-primary"
                                    : item.type === "Third Party Assistance"
                                    ? "has-background-info"
                                    : item.type === "Pickup"
                                    ? "has-background-warning"
                                    : "has-background-success"}`}>
                <button onClick={() => showDivFunc(idx)} key={`${item}${idx}`} className={"button columns is-mobile req-list-item is-marginless is-paddingless"} style={{background: "rgba(255, 255, 255, 0.3)"}}>
                    <span className="column is-one-quarter">{item.type}</span>
                    <span className="column is-one-quarter">{item.requestedAt}</span>
                    <span className="column is-one-quarter">{item.status}</span>
                    <span className="column is-one-quarter">{item.acceptedBy}</span>
                </button>
                <div className={`${clickedIndex === idx ? "show-req-details" : "hide-req-details"}`}>
                    <div className="level columns is-mobile">
                    <span className="column is-one-quarter has-text-weight-bold has-text-centered">Details: </span>
                    <p className="column is-three-quarters has-text-left">{item.details}</p>
                    </div>
                    <div className="level columns is-mobile">
                    <span className="column is-one-quarter has-text-weight-bold has-text-centered">Address: </span>
                    <p className="column is-three-quarters has-text-left">{item.address}</p>
                    </div>
                </div>
                </div>
                )}
            </div> 
        </div>
    )
}

export default MyRequests