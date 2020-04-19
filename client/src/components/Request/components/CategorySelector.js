import React from "react";
import { Link } from "react-router-dom";
import "../Request.css";

const CategorySelector = ({ setCategory }) => {
  return (
    <section className="section">
      <h2 className="title is-spaced has-text-centered">I Need A Hand With</h2>
      <div className="columns has-text-centered">
        <div className="column is-half is-narrow">
          <button
            className="box request-btn"
            name="groceries"
            onClick={() => setCategory("pickup")}
          >
            <p className="title is-5">Groceries</p>
            <p className="subtitle">Supermarket shopping, fresh produce..</p>
          </button>
        </div>
        <div className="column is-half is-narrow">
          <button
            className="box request-btn"
            name="medicine"
            onClick={() => setCategory("talk")}
          >
            <p className="title is-5">Talk</p>
            <p className="subtitle">A community volunteer to talk to..</p>
          </button>
        </div>
      </div>
      <div className="columns has-text-centered">
        <div className="column is-half is-narrow">
          <button
            className="box request-btn"
            name="transport"
            onClick={() => setCategory("tpa")}
          >
            <p className="title is-5">3rd Party Assistance</p>
            <p className="subtitle">Some other kind of help..</p>
          </button>
        </div>
        <div className="column is-half is-narrow">
          <button
            className="box request-btn"
            name="handiwork"
            onClick={() => setCategory("assist")}
          >
            <p className="title is-5">Home Assistance</p>
            <p className="subtitle">A plumber or electrician..</p>
          </button>
        </div>
      </div>
      <div className=" has-text-centered">
        <Link className="button has-text-centered" to="/">
          <span className="icon">
            <i className="fas fa-times"></i>
          </span>
          <span>Cancel Request</span>
        </Link>
      </div>
    </section>
  );
};

export default CategorySelector;
