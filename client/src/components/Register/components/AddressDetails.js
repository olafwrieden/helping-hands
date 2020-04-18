import React from "react";

const AddressDetails = ({
  setStep,
  setStreetAddress,
  setCity,
  setZipCode,
  submit,
}) => {
  return (
    <div className="container">
      <div className="field">
        <label className="label">Street</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="1 Example Way"
            name="street"
            id="street"
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Zip Code</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="1234"
            name="zipcode"
            id="zipcode"
            minLength="4"
            maxLength="4"
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">City</label>
        <div className="control">
          <input
            className="input"
            name="City"
            type="City"
            placeholder="Auckland"
            id="form-email"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button" onClick={() => setStep(0)}>
            <span className="icon is-small">
              <i className="fas fa-arrow-left" aria-hidden="true"></i>
            </span>
            <span>Back</span>
          </button>
        </div>
        <div className="control">
          <button className="button is-success" onClick={submit}>
            <span className="icon is-small">
              <i className="fas fa-check" aria-hidden="true"></i>
            </span>
            <span>Register</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
