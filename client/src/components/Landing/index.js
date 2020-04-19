import React from "react";
import Hero from "./components/Hero/Hero";
import HowItWorks from "./components/HowItWorks";
import OurTeam from "./components/OurTeam";
import Footer from "./components/Footer";
import { useAuth } from "../App/Authentication";

const Landing = () => {
  const { isAuthed } = useAuth();

  return (
    <>
      <Hero isAuthed={isAuthed} />
      <HowItWorks />
      <OurTeam />
      <Footer />
    </>
  );
};

export default Landing;
