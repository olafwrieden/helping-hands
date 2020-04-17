import React, { useEffect, useState } from "react";
import Hero from "./components/Hero/Hero";
import HowItWorks from "./components/HowItWorks";
import OurTeam from "./components/OurTeam";
import Footer from "./components/Footer";
import { useAuth } from "../App/Authentication";

const Landing = () => {
  const [greeting, setGreeting] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthed } = useAuth();

  useEffect(() => {
    fetch("/api/users/greeting")
      .then((res) => res.json())
      .then((response) => {
        setGreeting(response.greeting);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {/* TODO: To be removed in the future. */}
      <div className="column is-6 is-primary is-offset-3">
        <h1 className="title">Coming Soon</h1>
        <h2 className="subtitle">
          Keep your eyes peeled and hit that refresh button like crazy because
          we are moving fast! Watch out for this space.
        </h2>
        <p>
          {isLoading && <>Loading...</>}
          {greeting && <>API Says: {greeting}</>}
        </p>
        <p>User: {user ? JSON.stringify(user) : "no user"}</p>
        <p>isAuthed: {isAuthed ? "Yes!" : "No!"}</p>
      </div>

      <Hero />
      <HowItWorks />
      <OurTeam />
      <Footer />
    </>
  );
};

export default Landing;
