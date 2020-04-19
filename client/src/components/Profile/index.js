import React, { useState } from "react";
import "./Profile.css";
import { useAuth } from "../App/Authentication";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  const { isAuthed, user } = useAuth();
  const [showingEdit, setShowingEdit] = useState(false);
  const showingEditFunc = () => setShowingEdit(!showingEdit);
  //pull in ratings for this user from ratings table
  const arrayOfRatings = new Array(5).fill(3);
  //reduce and get average rating
  const avgRating = Math.round(
    arrayOfRatings.reduce((acc, c) => acc + c, 0) / arrayOfRatings.length
  );
  //make array of length average rating to map over and display stars ul
  const avgRatingArray = new Array(avgRating).fill(
    "https://image.flaticon.com/icons/svg/148/148841.svg"
  );

  return (
    <>
      <div className="columns is-vcentred login-hero">
        {/* provide margin spacing */}
        <div className="column level"></div>
        <div className="column is-four-fifths level profile-wrapper">
          <img
            className="profile-cover-photo"
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80"
            alt="Cover photo"
          />
          <img
            className="profile-page-avatar"
            src="https://images.unsplash.com/photo-1582971805810-b24306e0afe7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="Profile avatar photo"
          />
          <div className="card">
            {isAuthed && (
              <button
                onClick={() => showingEditFunc()}
                className="button is-success edit-btn"
              >
                <i className="fa fa-edit"></i>
              </button>
            )}
            <h2 className="subtitle is-3 profile-firstname">
              {user.firstName} {user.lastName}
            </h2>
            {isAuthed && <h2 className="subtitle is-4">{user.email}</h2>}
            <div className="ratings-wrapper">
              <span>
                <strong>Average Rating: </strong>
              </span>
              <ul className="stars-ul">
                {avgRatingArray.length > 0 &&
                  avgRatingArray.map((star, idx) => (
                    <img key={idx} width="25" src={star} alt="Image of star" />
                  ))}
              </ul>
              <span>(From {arrayOfRatings.length} Ratings)</span>
            </div>
            <div className="card-content">
              <div className="content">{user.bio}</div>
            </div>
          </div>
        </div>
        {!isAuthed && (
          <div className="column login-form">
            <div className="container"></div>
          </div>
        )}
        {/* provide margin spacing */}
        <div className="column level"></div>
      </div>
      {/* show update profile form */}
      {showingEdit && <UpdateProfile showingEditFunc={showingEditFunc} />}
    </>
  );
};

{
  /* <div>Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */
}

export default Profile;
