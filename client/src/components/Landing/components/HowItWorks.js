import React from "react";
import { Link } from "react-router-dom";

const HowItWorks = () => (
  <section className="section">
    <div className="container">
      <div className="columns is-vcentered">
        <div className="column">
          <h2 className="title is-spaced">What is Helping Hands?</h2>
          <p className="subtitle">
            We are a community-driven group of volunteers you can rely on to
            shop and deliver your groceries, medicine, mow your lawns... You
            post the request, and we do the rest.
          </p>
          <Link className="button is-primary" to="/register">
            I need this!
          </Link>
        </div>
        <div className="column">
          <img
            src="https://bulma.dev/placeholder/pictures/bg_16-9.svg?primary=00d1b2"
            alt=""
          />
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
