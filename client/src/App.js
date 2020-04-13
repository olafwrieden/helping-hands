import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [greeting, setGreeting] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users/greeting", { method: "GET" })
      .then((res) => res.json())
      .then((response) => {
        setGreeting(response.greeting);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Example Express.js / React.js (monorepo) Heroku Deployment.</p>

        {isLoading && <p>Loading...</p>}

        {greeting && <p>API Says: {greeting}</p>}
      </header>
    </div>
  );
}

export default App;
