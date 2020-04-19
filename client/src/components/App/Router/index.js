import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import ProtectedRoute from "../../App/Authentication/ProtectedRoute";
import Landing from "../../Landing";
import Login, { LogOut } from "../../Login";
import Profile from "../../Profile";
import BuddyList from "../../BuddyList";
import Register from "../../Register";
import Request from "../../Request";

const Router = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={LogOut} />
      <Route path="/register" component={Register} />
      <ProtectedRoute path="/request" component={Request} />
      <ProtectedRoute path="/profile" component={Profile} />
      <ProtectedRoute path="/buddies" component={BuddyList} />
      <Route component={NotFound} />
    </Switch>
  </main>
);

const NotFound = () => (
  <section className="hero is-bold is-medium">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">Oops!</h1>
        <h2 className="subtitle">
          The page you are looking for does not exist.
        </h2>
        <Link className="button" to="/">
          Take me Home
        </Link>
      </div>
    </div>
  </section>
);

export default Router;
