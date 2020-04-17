import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Navigation from "./Navigation";
import { ProvideAuth} from "./Authentication"

function App() {
  return (
    <ProvideAuth>
      <BrowserRouter basename="/">
        <div>
          <Navigation />
          <Router />
        </div>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
