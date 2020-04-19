import React, { useState, useEffect } from "react";
import "./BuddyList.css";

const BuddyList = () => {
  const [buddies, setBuddies] = useState([
    {
      id: 1,
      avatar_image:
        "https://images.unsplash.com/photo-1533992931871-28f779bc0675?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      first_name: "Imogen",
      last_name: "Tolley",
      status: "pending",
      address: "738 Country Lane, Hamilton 1135",
      phone: "515-2234",
    },
    {
      id: 2,
      avatar_image:
        "https://images.pexels.com/photos/788567/pexels-photo-788567.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      first_name: "Sherin",
      last_name: "Goodwill",
      status: "pending",
      address: "4 Te Uruwera Lane, Taupo 4131",
      phone: "114-9181",
    },
    {
      id: 3,
      avatar_image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      first_name: "Andrea",
      last_name: "Anderson",
      status: "accepted",
      address: "11 January Lane, Kingsland 1201",
      phone: "123-4567",
    },
  ]);

  // useEffect(() => {
  //     // this will call the api to retrieve buddy list, including user info about each buddy.
  // }, [])

  //this function puts items in pending when remove icon clicked, and puts
  //them in accepted when accept icon is clicked
  const updateBuddyList = (id, action) => {
    switch (action) {
      case "accept":
        setBuddies(
          buddies.map((item, idx) => {
            if (item.id === id) {
              return { ...item, status: "accepted" };
            } else {
              return item;
            }
          })
        );
        //go to api and update status at pk of id to accepted
        //update component state with new buddy list in db
        //try catch to handle error
        break;
      case "remove":
        console.log(
          "this user would like to ",
          action,
          " this buddy request or buddy"
        );
        setBuddies(
          buddies.filter((item) => item.id !== id)
          // buddies.map((item, idx) => {
          //   if (item.id === id) {
          //     return { ...item, status: "pending" };
          //   } else {
          //     return item;
          //   }
          // })
        );
        //go to api and remove row where pk equals id
        //update component state with new buddy list in db
        //try catch to handle error
        break;
    }
  };
  return (
    <div className="buddylist-container">
      <h2 className="title">My Buddies</h2>
      <h3 className="title is-3">Pending</h3>
      <ul>
        {buddies
          .filter((item) => item.status === "pending")
          .map((item, idx) => {
            return (
              <div key={idx} className="level card is-mobile buddylist-item">
                <img
                  className="level-left"
                  width="50"
                  src={item.avatar_image}
                  alt="buddy avatar picture"
                />
                <span className="full-name">
                  <strong>{`${item.first_name} ${item.last_name}`}</strong>
                </span>
                <span className="status">Would like to buddy up with you</span>
                <span
                  className="icon is-medium has-text-success"
                  onClick={() => updateBuddyList(item.id, "accept")}
                >
                  <i className="fas fa-check-square fa-lg"></i>
                </span>
                <span
                  className="icon is-medium has-text-danger"
                  onClick={() => updateBuddyList(item.id, "remove")}
                >
                  <i className="fas fa-ban fa-lg"></i>
                </span>
              </div>
            );
          })}
      </ul>
      <h3 className="title is-3 accepted-title">Accepted</h3>
      <ul>
        {buddies
          .filter((item) => item.status === "accepted")
          .map((item, idx) => {
            return (
              <div key={idx} className="level card is-mobile buddylist-item">
                <img
                  className="level-left"
                  width="50"
                  src={item.avatar_image}
                  alt="buddy avatar picture"
                />
                <span className="full-name">
                  <strong>{`${item.first_name} ${item.last_name}`}</strong>
                </span>
                <div className="details">
                  <span>
                    <i className="fas fa-home fa-lg"></i>
                    {item.address}
                  </span>{" "}
                  <br />
                  <span>
                    <i className="fas fa-phone fa-lg"></i> {item.phone}{" "}
                  </span>
                </div>
                <span
                  className="icon is-medium has-text-danger accepted-del-btn"
                  onClick={() => updateBuddyList(item.id, "remove")}
                >
                  <i className="fas fa-ban fa-lg"></i>
                </span>
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default BuddyList;
