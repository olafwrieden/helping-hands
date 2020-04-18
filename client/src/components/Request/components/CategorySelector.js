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
            onClick={() => setCategory("groceries")}
          >
            <p className="title is-5">Groceries</p>
            <p className="subtitle">Supermarket shopping, fresh produce..</p>
          </button>
        </div>
        <div className="column is-half is-narrow">
          <button
            className="box request-btn"
            name="medicine"
            onClick={() => setCategory("medine")}
          >
            <p className="title is-5">Medicine</p>
            <p className="subtitle">Medical prescription pickups..</p>
          </button>
        </div>
      </div>
      <div className="columns has-text-centered">
        <div className="column is-half is-narrow">
          <button
            className="box request-btn"
            name="transport"
            onClick={() => setCategory("transport")}
          >
            <p className="title is-5">Transport Goods</p>
            <p className="subtitle">Transport something from A to B..</p>
          </button>
        </div>
        <div className="column is-half is-narrow">
          <button
            className="box request-btn"
            name="handiwork"
            onClick={() => setCategory("handiwork")}
          >
            <p className="title is-5">Handiwork</p>
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
