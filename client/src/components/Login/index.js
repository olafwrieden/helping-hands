import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../App/Authentication";

const Login = ({ history }) => {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    auth.signin(email, password).then((res) => history.push("/"));
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns login-hero">
          <div className="column is-1 level flat"></div>
          <div className="column is-5 level">
            <h1 className="title is-1 login-hero-title">Welcome</h1>
            <h2 className="subtitle is-3">Log in to continue</h2>
          </div>
          <div className="column login-form">
            <div className="container">
              <form>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      id="email"
                      name="email"
                      type="text"
                      placeholder="john@example.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="*******"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {/* <Link to="/register">Forgot Password?</Link> */}
                </div>

                {error && <div className="notification is-danger">{error}</div>}
                <div className="field is-grouped">
                  <div className="control">
                    <button
                      className="button is-success"
                      onClick={(e) => handleLogin(e)}
                    >
                      <span className="icon is-small">
                        <i
                          className="fas fa-paper-plane"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <span>Login</span>
                    </button>
                  </div>
                  <div className="control">
                    <Link className="button" to="/register">
                      I don't have an account
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="column is-1 level"></div>
        </div>
      </div>
    </section>
  );
};

export const LogOut = ({ history }) => {
  fetch("/api/v1/logout", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return history.push("/");
      }
    })
    .catch((err) => {
      return history.push("/");
    });

  return (
    <section className="section">
      <div className="container">
        <div className="columns login-hero">
          <div className="column is-1 level flat"></div>
          <div className="column is-5 level">
            <h1 className="title is-1 login-hero-title">Logging Out</h1>
            <h2 className="subtitle is-3">This feature is not available.</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
