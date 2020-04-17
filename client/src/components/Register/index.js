import React from "react";
import "./Register.css";

const Register = () => (
  <section className="section">
    <div className="container">
      <div className="columns login-hero">
        <div className="column is-1 level flat"></div>
        <div className="column is-5 level">
          <h1 className="title is-1 login-hero-title">Join Us!</h1>
          <h2 className="subtitle is-3">Volunteers needed</h2>
        </div>
        <div className="column login-form">
          <form>
            <div className="container">
              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="What shall we call you?"
                    name="first_name"
                    id="first_name"
                  />
                </div>
                {/* <p className="help" id="form-name-help" hidden="true"></p> */}
              </div>

              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="What shall we call you?"
                    name="last_name"
                    id="last_name"
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
                  />
                </div>
                {/* <p className="help" id="form-email-help" hidden></p> */}
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    name="password"
                    type="password"
                    placeholder="8+ charecters with atleast one number and memorable"
                    id="form-password"
                  />
                </div>
                {/* <p className="help" id="form-password-help" hidden></p> */}
              </div>
              <div className="field">
                <label className="label">Re-Enter Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    placeholder="Just to ensure you didn't make a typo!"
                    id="form-repassword"
                  />
                </div>
                {/* <p className="help" id="form-repassword-help" hidden></p> */}
              </div>

              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input type="checkbox" /> I understand that I am responsible
                    for payment.
                  </label>
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-success">
                    <span className="icon is-small">
                      <i className="fas fa-check" aria-hidden="true"></i>
                    </span>
                    <span>Register</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="column is-1 level"></div>
      </div>
    </div>
  </section>
);

export default Register;
