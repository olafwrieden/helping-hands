import React, { useState, useEffect } from 'react'
import "./BuddyList.css";

const BuddyList = () => {
    const [buddies, setBuddies] = useState([
        {
            id: "pk 1",
            avatar_image: "https://cdn.pixabay.com/photo/2016/11/13/21/46/sheep-1822137_960_720.jpg",
            first_name: "Peter",
            last_name: "Parker",
            status: "pending",
            address: "738 Winter Garden Drive, Forest Hills, Queens, New York 11375",
            phone: "515-2234"
        },
        {
            id: "pk 2",
            avatar_image: "https://cdn.pixabay.com/photo/2016/10/21/19/45/hedgehog-child-1759027_960_720.jpg",
            first_name: "Harry",
            last_name: "Potter",
            status: "pending",
            address: "4 Privet Drive, London 439-91",
            phone: "114-9181"
        },
        {   
            id: "pk 3",
            avatar_image: "https://cdn.pixabay.com/photo/2016/01/05/17/51/dog-1123016__340.jpg",
            first_name: "Doctor",
            last_name: "Dolitte",
            status: "accepted",
            address: "12 Mystery Lane, Fiction City 999-991",
            phone: "123-4567"
        }
    ])

    useEffect(() => {
        //this will call the api to retrieve buddy list, including user info about each buddy.
    })

    //when pending buddy is accepted, status is changed from pending to accepted,
    //a call is made to the api to update the buddy in that row
    return (
        <div className="buddylist-container">
        <h2 className="title" >Your Buddies</h2>
        <h3 className="title is-3">Pending</h3>
        <ul>
            {
                buddies
                    .filter(item => item.status === "pending")
                    .map((item, idx) => {
                        return <>
                        <div key={`${item.first_name} ${idx}`} className="level card is-mobile buddylist-item">
                            <img className="level-left" width="50" src={item.avatar_image} alt="buddy avatar picture" />
                            <span className="full-name"><strong>{`${item.first_name} ${item.last_name}`}</strong></span> 
                            <span className="status">Would like to buddy up with you</span>
                            <span class="icon is-medium has-text-success">
                                <i class="fas fa-check-square fa-lg"></i>
                            </span>
                            <span class="icon is-medium has-text-danger">
                                <i class="fas fa-ban fa-lg"></i>
                            </span>
                        </div>
                        </>
                    }) 
            }
        </ul>
        <h3 className="title is-3 accepted-title">Accepted</h3>
        <ul>
            {
                buddies
                    .filter(item => item.status === "accepted")
                    .map((item, idx) => {
                        return <>
                        <div key={`${item.first_name} ${idx}`} className="level card is-mobile buddylist-item">
                            <img className="level-left" width="50" src={item.avatar_image} alt="buddy avatar picture" />
                            <span className="full-name"><strong>{`${item.first_name} ${item.last_name}`}</strong></span> 
                            <span className="status"><i class="fas fa-home fa-lg"></i>{item.address}<br /> <i class="fas fa-phone fa-lg"></i> {item.phone} </span>
                            <span class="icon is-medium has-text-danger accepted-del-btn">
                                <i class="fas fa-ban fa-lg"></i>
                            </span>
                        </div>
                        </>
                    }) 
            }
        </ul>
        </div>
    )
}

export default BuddyList
