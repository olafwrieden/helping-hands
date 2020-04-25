import React from 'react'
import './MyRequests.css'

const MyRequests = () => {
    const requestsData = [
        {
            type: "Assistance",
            requestedAt: "08:00",
            status: "Accepted",
            acceptedBy: "Tom Hardy"
        },
        {
            type: "Pickup",
            requestedAt: "10:00",
            status: "Pending",
            acceptedBy: ""
        },
        {
            type: "Assistance",
            requestedAt: "09:00",
            status: "Pending",
            acceptedBy: ""
        },
        {
            type: "Third Party Assistance",
            requestedAt: "11:30",
            status: "Accepted",
            acceptedBy: ""
        }
    ]

    return (
        <div className="requests-container card">
            <h2 className="title is-3">My Requests</h2>
            <div className="card">
                <div className="level columns is-mobile">
                    <span className="column">Type</span>
                    <span className="column">Requested At</span>
                    <span className="column">Status</span>
                    <span className="column">Accepted By</span>
                    <span className="column is-narrow"> </span>
                </div>
                {requestsData.map((item, idx) => 
                    <button key={`${item}${idx}`} className="button columns is-mobile req-list">
                        <span className="column">{item.type}</span>
                        <span className="column">{item.requestedAt}</span>
                        <span className="column">{item.status}</span>
                        <span className="column">{item.acceptedBy}</span>
                        <button className="column is-narrow">
                            <i></i>
                        </button>
                    </button>
                )}
            </div> 
        </div>
    )
}

export default MyRequests