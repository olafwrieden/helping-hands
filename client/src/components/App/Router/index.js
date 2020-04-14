import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "../../Landing";

const Router = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Landing} />
    </Switch>
  </main>
);

export default Router;
