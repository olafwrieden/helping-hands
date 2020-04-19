import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = ({ isAuthed }) => (
  <section className="hero is-info is-fullheight">
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title is-2 is-spaced">How can we help?</h1>
        <p className="subtitle is-4">
          We are a community-driven group of volunteers you can rely on to
          deliver your groceries, medicine, mow your lawns... You post the
          request, and we do the rest.
        </p>
        <div className="columns is-vcentered">
          <div className="column">
            <Link
              className="button title is-light is-outlined"
              to={isAuthed ? "/request" : "/register"}
            >
              <span className="icon">
                <i className="fas fa-hands-helping" />
              </span>
              <span>{isAuthed ? "New Request" : "I need a hero!"}</span>
            </Link>
          </div>
          <div className="column">
            <Link className="button title is-light is-outlined" to="/register">
              <span className="icon">
                <i className="fas fa-hand-holding-heart" />
              </span>
              <span>{isAuthed ? "Volunteer Map" : "I can Volunteer!"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
