import React, { useEffect, useState } from "react";
import "./Landing.css";

const Landing = () => {
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
    <section className="hero is-info is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-6 is-offset-3">
            <h1 className="title">Coming Soon</h1>
            <h2 className="subtitle">
              Keep your eyes peeled and hit that refresh button like crazy
              because we are moving fast! Watch out for this space.
            </h2>
            <p>
              {isLoading && <>Loading...</>}
              {greeting && <>API Says: {greeting}</>}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
