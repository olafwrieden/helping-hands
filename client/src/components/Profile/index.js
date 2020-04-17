import React from "react";
import "./Profile.css";
import { useAuth } from "../App/Authentication";

const Profile = () => {
  const { isAuthed, user } = useAuth();
  const rating = ['placeholder', 'placeholder', 'placeholder']

  return (
    <div className="columns is-vcentred login-hero">
      <div className="column level"></div>
      <div className="column is-four-fifths level profile-wrapper">
        <img className="profile-cover-photo" src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80" alt="Cover photo"/>
        <img className="profile-page-avatar" src="https://cdn.pixabay.com/photo/2017/11/14/13/06/kitty-2948404_960_720.jpg" alt="Profile avatar photo"/> 
        <div className="card">
        <h2 className="subtitle is-3">{user.first_name}</h2>
        {isAuthed && <h2 className="subtitle is-3">{user.email}</h2>}
        <span>Overall Rating: </span>
        <ul className="stars-ul">
          {
            rating.length > 0 &&
            rating.map((star, idx) => <img  key={idx} width="25" src="https://image.flaticon.com/icons/svg/148/148841.svg" alt="Image of star"/>)
          }
        </ul>
        <span>(35 ratings)</span>
        <article class="message">
          <div class="message-header">
            <p>Bio</p>
          </div>
          <div class="message-body">
            I'm {user.first_name}, I love to volunteer!. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
          </div>
        </article>


          {/* <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img
                    src="https://bulma.io/images/placeholders/96x96.png"
                    alt="Placeholder"
                  />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">John Smith</p>
                <p className="subtitle is-6">@johnsmith</p>
              </div>
            </div>

            <div className="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              nec iaculis mauris. <a href="/">@bulmaio</a>.<a href="/">#css</a>{" "}
              <a href="/">#responsive</a>
              <br />
              <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </div> */}
        </div>
      </div>
      {!isAuthed &&
      <div className="column login-form">
        <div className="container"></div>
      </div>}
      <div className="column level"></div>
    </div>
  );
};

export default Profile;
