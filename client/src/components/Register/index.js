import React, { useState, useLocation } from "react";
import "./Register.css";
import AccountDetails from "./components/AccountDetails";
import AddressDetails from "./components/AddressDetails";

const Register = () => {
  let [step, setStep] = useState(0);
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [password, setPassword] = useState("");
  let [canDrive, setCanDrive] = useState(false);
  let [streetAddress, setStreetAddress] = useState("");
  let [suburb, setSuburb] = useState("");
  let [city, setCity] = useState("");


  const handleSubmit = () => {
    let data = {
      firstName,
      lastName,
      email,
      phone: phoneNumber,
      password,
      canDrive,
      address: streetAddress,
      suburb,
      city,
    };
    "firstName": "Mitchell",
    "lastName": "McDonald",
    "email": "test@ttrrtt.com",
    "password": "hellow",
    "gender": "male",
    "phone": "12345",
    "address": "123 Stree",
    "city": "auckland",
    "zipCode": 1234
    fetch('/api/v1/register', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    
      //make sure to serialize your JSON body
      body: JSON.stringify(data)
    })
    .then( (response) => { 
       //do something awesome that makes the world a better place
    });

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
            setPhoneNumber={setPhoneNumber}
            setPassword={setPassword}
            canDrive={canDrive}
            setCanDrive={setCanDrive}
          />
        );
      case 1:
        return (
          <AddressDetails
            setStep={setStep}
            setStreetAddress={setStreetAddress}
            setSuburb={setSuburb}
            setCity={setCity}
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
