import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { useAuth } from "../Authentication";

const Navigation = () => {
  const [isActive, setIsActive] = React.useState(false);
  const { isAuthed } = useAuth();

  return (
    <nav className="navbar is-fixed-top">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="Helping Hands Logo"
            height="30"
            onClick={() => setIsActive(false)}
          />
        </Link>
        <div
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          data-target="navbarExampleTransparentExample"
          onClick={() => setIsActive(!isActive)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div
        id="navbarExampleTransparentExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <Link
            className="navbar-item"
            to="/"
            onClick={() => setIsActive(false)}
          >
            Home
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              {isAuthed ? (
                <>
                  <p className="control">
                    <Link
                      onClick={() => setIsActive(!isActive)}
                      className="button is-primary is-outlined"
                      to="/request"
                      onClick={() => setIsActive(false)}
                    >
                      New Request
                    </Link>
                  </p>
                  <p className="control">
                    <Link
                      onClick={() => setIsActive(false)}
                      className="button is-primary is-outlined"
                      to="/buddies"
                    >
                      My Buddies
                    </Link>
                  </p>
                  <p className="control">
                    <Link
                      className="button is-primary is-outlined"
                      to="/profile"
                      onClick={() => setIsActive(false)}
                    >
                      My Profile
                    </Link>
                  </p>
                  <p className="control">
                    <Link
                      className="button is-white"
                      to="/logout"
                      onClick={() => setIsActive(false)}
                    >
                      <i className="fas fa-power-off"></i>
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  <p className="control">
                    <Link
                      onClick={() => setIsActive(!isActive)}
                      className="button is-primary is-outlined"
                      to="/register"
                      onClick={() => setIsActive(false)}
                    >
                      Register
                    </Link>
                  </p>
                  <p className="control">
                    <Link
                      className="button is-primary"
                      to="/login"
                      onClick={() => setIsActive(false)}
                    >
                      Login
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
