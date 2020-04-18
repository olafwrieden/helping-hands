import React, { useState, useEffect } from "react";
import "./BuddyList.css";

const BuddyList = () => {
  const [buddies, setBuddies] = useState([
    {
      id: 1,
      avatar_image:
        "https://cdn.pixabay.com/photo/2016/11/13/21/46/sheep-1822137_960_720.jpg",
      first_name: "Peter",
      last_name: "Parker",
      status: "pending",
      address: "738 Winter Garden Drive, Forest Hills, Queens, New York 11375",
      phone: "515-2234",
    },
    {
      id: 2,
      avatar_image:
        "https://cdn.pixabay.com/photo/2016/10/21/19/45/hedgehog-child-1759027_960_720.jpg",
      first_name: "Harry",
      last_name: "Potter",
      status: "pending",
      address: "4 Privet Drive, London 439-91",
      phone: "114-9181",
    },
    {
      id: 3,
      avatar_image:
        "https://cdn.pixabay.com/photo/2016/01/05/17/51/dog-1123016__340.jpg",
      first_name: "Doctor",
      last_name: "Dolitte",
      status: "accepted",
      address: "12 Mystery Lane, Fiction City 999-991",
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
          buddies.map((item, idx) => {
            if (item.id === id) {
              return { ...item, status: "pending" };
            } else {
              return item;
            }
          })
        );
        //go to api and remove row where pk equals id
        //update component state with new buddy list in db
        //try catch to handle error
        break;
    }
  };
  return (
    <div className="buddylist-container">
      <h2 className="title">Your Buddies</h2>
      <h3 className="title is-3">Pending</h3>
      <ul>
        {buddies
          .filter((item) => item.status === "pending")
          .map((item, idx) => {
            return (
              <>
                <div
                  key={`${item.first_name} ${idx}`}
                  className="level card is-mobile buddylist-item"
                >
                  <img
                    className="level-left"
                    width="50"
                    src={item.avatar_image}
                    alt="buddy avatar picture"
                  />
                  <span className="full-name">
                    <strong>{`${item.first_name} ${item.last_name}`}</strong>
                  </span>
                  <span className="status">
                    Would like to buddy up with you
                  </span>
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
              </>
            );
          })}
      </ul>
      <h3 className="title is-3 accepted-title">Accepted</h3>
      <ul>
        {buddies
          .filter((item) => item.status === "accepted")
          .map((item, idx) => {
            return (
              <>
                <div
                  key={`${item.first_name} ${idx}`}
                  className="level card is-mobile buddylist-item"
                >
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
              </>
            );
          })}
      </ul>
    </div>
  );
};

export default BuddyList;
