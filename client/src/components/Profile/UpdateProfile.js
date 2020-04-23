import React, { useState } from "react";
import { useAuth } from "../App/Authentication";
import "./Profile.css";

const UpdateProfile = ({ showingEditFunc, history }) => {
  const { isAuthed, user, setUser } = useAuth();
  const [state, setState] = useState({
    ...user
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    //fetch api and make post request
    e.preventDefault();
    if (!isAuthed) return;
    console.log('state to be sent to server, ', state)
    fetch("/api/v1/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.updatedUser) {
          // Set User Context (login)
          setUser(res.updatedUser);
          return showingEditFunc();
        }
      })
      .catch((err) => console.log("Error:", err.message));
  };

  return (
    <form onSubmit={handleSubmit} className="card edit-profile-form">
      <button
        onClick={() => showingEditFunc()}
        className="delete is-medium close-edit-form"
      ></button>
      <div className="field">
        <label className="label">Bio</label>
        <div className="control">
          <textarea onChange={handleChange} name="bio" className="textarea" value={state.bio}></textarea>
        </div>
      </div>
      <div className="field">
        <label className="label">Phone</label>
        <div className="control">
          <input
            onChange={handleChange}
            className="input"
            name="phone"
            type="text"
            value={state.phone}
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Address</label>
        <div className="control">
          <input
            onChange={handleChange}
            className="input"
            name="address"
            type="text"
            value={state.address}
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="label">City</label>
        <div className="control">
          <input
            onChange={handleChange}
            className="input"
            name="city"
            type="text"
            value={state.city}
            required
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Zip Code</label>
        <div className="control">
          <input
            onChange={handleChange}
            className="input"
            type="text"
            value={state.zipCode}
            name="zipCode"
            minLength="4"
            maxLength="4"
          />
        </div>
      </div>
      <input
        className="button is-primary is-success is-pulled-right"
        type="submit"
        value="Submit"
      />
    </form>
  );
};

export default UpdateProfile;
