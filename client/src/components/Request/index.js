import React, { useState, useEffect } from "react";
import CategorySelector from "./components/CategorySelector";
import Details from "./components/Details";

const Request = () => {
  let [step, setStep] = useState(0);
  let [category, setCategory] = useState("");
  let [description, setDescription] = useState("");
  let [paymentMethod, setPaymentMethod] = useState("cash");
  let [dropoff, setDropoff] = useState("front-door");
  let [timeFrom, setTimeFrom] = useState();
  let [timeTo, setTimeTo] = useState();

  useEffect(() => {
    if (category !== "") {
      setStep(++step);
    }
  }, [category]);

  const handleSubmit = () => {
    let data = {
      category,
      description,
      paymentMethod,
      dropoff,
      timeFrom,
      timeTo,
    };
    console.log("User Data", data);
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
