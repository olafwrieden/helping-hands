import React, { useState, useEffect } from 'react'
import './MyRequests.css'
import { useAuth } from "../App/Authentication";

const MyRequests = () => {
    const [clickedIndex, setClickedIndex] = useState(null)
    const [requestsFromDB, setRequestsFromDB] = useState([])
    const { isAuthed, user } = useAuth()

    // const [requestsData, setRequestsData] = useState([
    //     {
    //         type: "Assistance",
    //         requestedAt: "08:00",
    //         status: "Accepted",
    //         acceptedBy: "Tom Hardy",
    //         details: "I need assistance mowing my lawn please.",
    //         address: "3 Example Street",
    //         city: "Auckland"
    //     },
    //     {
    //         type: "Pickup",
    //         requestedAt: "10:00",
    //         status: "Pending",
    //         acceptedBy: "N/A",
    //         details: "I need 3 carrots, 4 onions and a pumpkin from the grocery store.",
    //         address: "5 Test Drive",
    //         city: "Auckland"
    //     },
    //     {
    //         type: "Assistance",
    //         requestedAt: "09:00",
    //         status: "Pending",
    //         acceptedBy: "N/A",
    //         details: "I need my gutters cleaned out.",
    //         address: "21 Jump Street",
    //         city: "Auckland"
    //     },
    //     {
    //         type: "Third Party Assistance",
    //         requestedAt: "11:30",
    //         status: "Completed",
    //         acceptedBy: "Jemma Schofield",
    //         details: "I am requesting assistance on behalf of my sick Aunt, please pick up some panadol for her.",
    //         address: "10 Dawning Street",
    //         city: "Auckland"
    //     }
    // ])

    //show/hide more details popout
    const showDivFunc = index => {
        return clickedIndex === index 
        ? setClickedIndex(null)
        : setClickedIndex(index)
    }
    //on render, get the requests from the db
    //works but is buggy: server
    useEffect(() => {
        const { id } = user
        if(!isAuthed) return
        fetch(`api/v1/requests/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log('requests array, ', res)
                setRequestsFromDB(res)
            })
            .catch(err => console.log(err))
    }, [])

    //clicking cancel changes request status to cancelled
    const cancelReq = item => {
        item.requestedUser = user.id
        if(!isAuthed) return
        fetch('api/v1/requests/cancel', {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          })
        .then(res => res.json())
        .then(res => {
            console.log('requests array, ', res)
            setRequestsFromDB(res)
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="requests-container">
            <h2 className="title is-3">My Requests</h2>
            {requestsFromDB.length > 0
            ?
            <div className="card req-subcontainer">
                <div className="level columns is-mobile req-title-row is-marginless is-paddingless">
                    <span className="column is-one-quarter has-text-weight-bold">Type</span>
                    <span className="column is-one-quarter has-text-weight-bold">Requested At</span>
                    <span className="column is-one-quarter has-text-weight-bold">Status</span>
                    <span className="column is-one-quarter has-text-weight-bold">Accepted By</span>
                </div>
                {requestsFromDB.map((item, idx) => 
                <div key={`${idx}${item}`} className={`${item.status === "accepted" 
                                    ? "has-background-success"
                                    : item.status === "pending"
                                    ? "has-background-warning"
                                    : item.status === "complete"
                                    ? "has-background-primary"
                                    : "has-background-grey-lighter"}`}>
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
                    <span className="column is-3 has-text-weight-bold has-text-centered">Address: </span>
                    <p className="column is-6 has-text-left">{item.address}, {item.city}</p>
                    {item.status !== "complete" || item.status !== "cancelled"
                    ? <button onClick={() => cancelReq(item)} className="column is-2 button is-danger cancel-req-btn">Cancel Request</button>
                    : <div className="column is-2"> </div>}
                    <div className="column is-2"> </div>
                    </div>
                </div>
                </div>)}
            </div> 
            : <div className="title" style={{margin: "80px auto 0 auto"}}>No requests found</div>}
        </div>
    )
}

export default MyRequests