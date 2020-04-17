import React from "react";
import "./Profile.css";
import { useAuth } from "../App/Authentication";

const Profile = () => {
  const { isAuthed, user } = useAuth();

  return (
    <div className="columns login-hero">
      <div className="column is-1 level flat"></div>
      <div className="column is-5 level">
        <h1 className="title is-1 login-hero-title">Profile</h1>
        <h2 className="subtitle is-3">Update your details</h2>
        {isAuthed && <h2 className="subtitle is-3">{user.email}</h2>}
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img
                src="https://bulma.io/images/placeholders/1280x960.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img
                    src="https://bulma.io/images/placeholders/96x96.png"
                    alt="Placeholder image"
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
              nec iaculis mauris. <a>@bulmaio</a>.<a href="#">#css</a>{" "}
              <a href="#">#responsive</a>
              <br />
              <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </div>
        </div>
      </div>
      <div className="column login-form">
        <div className="container"></div>
      </div>
      <div className="column is-1 level"></div>
    </div>
  );
};

export default Profile;
