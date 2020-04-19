import React, { useState, useEffect } from "react";
import CategorySelector from "./components/CategorySelector";
import Details from "./components/Details";
import { useAuth } from "../App/Authentication";

const Request = () => {
  let [step, setStep] = useState(0);
  let [category, setCategory] = useState("");
  let [description, setDescription] = useState("");
  let [paymentMethod, setPaymentMethod] = useState("cash");
  let [dropoff, setDropoff] = useState("front-door");
  let [timeFrom, setTimeFrom] = useState();
  let [timeTo, setTimeTo] = useState();

  const { user } = useAuth();

  useEffect(() => {
    if (category !== "") {
      setStep(++step);
    }
  }, [category]);

  const handleSubmit = () => {
    let data = {
      requestedUser: user.id,
      type: category,
      details: description,
      payment: paymentMethod,
      completionTimeRange: {
        start: timeFrom,
        end: timeTo,
      },
      dropoff,
      address: user.address,
      city: user.city,
      zipCode: user.zipCode,
    };

    // Post New Request
    fetch("/api/v1/requests", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          return alert("Unable to send request!");
        }
        if (res.message === "success") {
          return alert("Your request for a volunteer has been submitted.");
        }
      })
      .catch((err) => console.log("Error:", err.message));
  };

  const renderStep = (step) => {
    switch (step) {
      case 0:
        return <CategorySelector setCategory={setCategory} />;
      case 1:
        return (
          <Details
            setDescription={setDescription}
            setPaymentMethod={setPaymentMethod}
            setDropoff={setDropoff}
            setTimeFrom={setTimeFrom}
            setTimeTo={setTimeTo}
            submit={handleSubmit}
          />
        );
      default:
        break;
    }
  };
  return (
    <section className="section">
      <div className="container">{renderStep(step)}</div>
    </section>
  );
};

export default Request;
