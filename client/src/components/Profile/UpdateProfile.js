import React, { useState } from "react";
import { useAuth } from "../App/Authentication";
import "./Profile.css";

const UpdateProfile = ({ showingEditFunc }) => {
  const { isAuthed, user } = useAuth();
  const { firstName, lastName, email } = user;
  const [state, setState] = useState({
    firstName,
    lastName,
    email,
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    //fetch api and make post request
    if (!isAuthed) return;
    e.preventDefault();
    console.log("Make post request to API");
  };

  return (
    <form onSubmit={handleSubmit} className="card edit-profile-form">
      <button
        onClick={() => showingEditFunc()}
        className="delete is-medium close-edit-form"
      ></button>
      <div className="field">
        <label className="label">First Name</label>
        <div className="control has-icons-left">
          <input
            onChange={handleChange}
            className="input"
            name="firstName"
            type="text"
            value={state.firstName}
            required
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Last Name</label>
        <div className="control has-icons-left">
          <input
            onChange={handleChange}
            className="input"
            name="lastName"
            type="text"
            value={state.lastName}
            required
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left">
          <input
            onChange={handleChange}
            className="input"
            name="email"
            type="text"
            value={state.email}
            required
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </div>
      </div>
      <input
        className="button is-primary is-success"
        type="submit"
        value="Submit"
      />
    </form>
  );
};

export default UpdateProfile;
