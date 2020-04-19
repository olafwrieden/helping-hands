import React from "react";
import { Link } from "react-router-dom";

const Details = ({
  setDescription,
  setPaymentMethod,
  setDropoff,
  setTimeFrom,
  setTimeTo,
  submit,
}) => (
  <section className="section">
    <h2 className="title is-spaced has-text-centered">Request Details</h2>
    <div className="columns has-text-centered">
      <div className="column is-half is-narrow">
        <div className="box">
          <p className="title is-half is-5">Description</p>
          <p className="subtitle">What do you need help with?</p>
          <div className="field">
            <div className="control">
              <textarea
                className="textarea"
                name="description"
                placeholder="A description or list of what I need..."
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="box">
          <p className="title is-half is-5">Drop-off</p>
          <p>This is where the volunteer will meet you.</p>
          <div className="select">
            <select onChange={(e) => setDropoff(e.target.value)}>
              <option value="front-door">Front Door</option>
              <option value="side-entrance">Side Entrance</option>
            </select>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="box">
          <p className="title is-half is-5">Payment</p>
          <p>How will you pay for it?</p>
          <div className="control has-text-centered">
            <label className="radio">
              <input
                type="radio"
                name="answer"
                defaultChecked
                onChange={setPaymentMethod("cash")}
              />{" "}
              Cash
            </label>
            <label className="radio">
              <input
                type="radio"
                name="answer"
                onChange={setPaymentMethod("credit")}
              />{" "}
              Credit Card
            </label>
            <label className="radio">
              <input
                type="radio"
                name="answer"
                onChange={setPaymentMethod("nopayment")}
              />{" "}
              Not Applicable
            </label>
          </div>
        </div>
        <div className="box has-text-centered">
          <p className="title is-half is-5">Time(s)</p>
          <p>When are you home to accept goods?</p>
          <div className="container">
            <div className="columns">
              <div className="column">
                <input
                  className="input"
                  type="time"
                  name="timeFrom"
                  placeholder="From: eg. 09:00"
                  min="09:00"
                  max="20:00"
                  required
                  onChange={(e) => setTimeFrom(e.target.value)}
                />
              </div>

              <div className="column">
                <input
                  className="input"
                  type="time"
                  name="timeTo"
                  placeholder="To: eg. 10:00"
                  min="09:00"
                  max="20:00"
                  required
                  onChange={(e) => setTimeTo(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="columns has-text-centered">
      <div className="column is-half">
        <Link className="button" to="/">
          <span className="icon">
            <i className="fas fa-times"></i>
          </span>
          <span>Cancel Request</span>
        </Link>
      </div>
      <div className="column is-half">
        <button className="button is-success" onClick={submit}>
          <span className="icon">
            <i className="fas fa-paper-plane"></i>
          </span>
          <span>Submit Request</span>
        </button>
      </div>
    </div>
  </section>
);

export default Details;
