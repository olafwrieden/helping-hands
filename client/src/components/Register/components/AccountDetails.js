import React from "react";

const AccountDetails = ({
  setStep,
  setFirstName,
  setLastName,
  setEmail,
  setPhoneNumber,
  setPassword,
  setGender,
  canDrive,
  setCanDrive,
  isVolunteer,
  setIsVolunteer,
}) => {
  return (
    <div className="container">
      <div className="field">
        <label className="label">First Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="What is your first name?"
            name="first_name"
            id="first_name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Last Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="What is your last name?"
            name="last_name"
            id="last_name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Gender</label>
        <div className="control">
          <div className="select">
            <select onChange={(e) => setGender(e.target.value)}>
              <option name="male" value="male">
                Male
              </option>
              <option name="female" value="female">
                Female
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Phone Number</label>
        <div className="control">
          <input
            className="input"
            type="tel"
            placeholder="We need to reach you."
            name="phoneNumber"
            id="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        {/* <p className="help" id="form-name-help" hidden="true"></p> */}
      </div>

      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            name="email"
            type="email"
            placeholder="Your most relevant email"
            id="form-email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            name="password"
            type="password"
            placeholder="8+ characters"
            id="form-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              type="checkbox"
              defaultChecked={canDrive}
              onChange={() => setCanDrive(!canDrive)}
            />{" "}
            I have a car and can drive.
          </label>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              type="checkbox"
              defaultChecked={isVolunteer}
              onChange={() => setIsVolunteer(!isVolunteer)}
            />{" "}
            I can also volunteer for others.
          </label>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-success" onClick={() => setStep(1)}>
            <span className="icon is-small">
              <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </span>
            <span>Continue</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
