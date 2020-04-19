import React, { useState } from "react";
import "./Register.css";
import AccountDetails from "./components/AccountDetails";
import AddressDetails from "./components/AddressDetails";
import { useAuth } from "../App/Authentication";

const Register = ({ history }) => {
  let [step, setStep] = useState(0);
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [gender, setGender] = useState("male");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [streetAddress, setStreetAddress] = useState("");
  let [city, setCity] = useState("");
  let [zipCode, setZipCode] = useState("");
  let [canDrive, setCanDrive] = useState(false);
  let [isVolunteer, setIsVolunteer] = useState(false);

  const { setUser } = useAuth();

  const handleSubmit = () => {
    let data = {
      firstName,
      lastName,
      email,
      password,
      gender,
      phone: phoneNumber,
      address: streetAddress,
      city,
      zipCode,
      canDrive,
      isVolunteer,
    };

    // Register User
    fetch("/api/v1/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.user) {
          // Set User Context (login)
          setUser(res.user);
          return history.push("/");
        }
      })
      .catch((err) => console.log("Error:", err.message));
  };

  const renderStep = (step) => {
    switch (step) {
      case 0:
        return (
          <AccountDetails
            setStep={setStep}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
            setGender={setGender}
            setPhoneNumber={setPhoneNumber}
            setPassword={setPassword}
            canDrive={canDrive}
            setCanDrive={setCanDrive}
            isVolunteer={isVolunteer}
            setIsVolunteer={setIsVolunteer}
          />
        );
      case 1:
        return (
          <AddressDetails
            setStep={setStep}
            setStreetAddress={setStreetAddress}
            setCity={setCity}
            setZipCode={setZipCode}
            submit={handleSubmit}
          />
        );
      default:
        break;
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns login-hero">
          <div className="column is-1 level flat"></div>
          <div className="column is-5 level">
            <h1 className="title is-1 login-hero-title">Join Us!</h1>
            <h2 className="subtitle is-3">We need you.</h2>
          </div>
          <div className="column login-form">{renderStep(step)}</div>
          <div className="column is-1 level"></div>
        </div>
      </div>
    </section>
  );
};

export default Register;
