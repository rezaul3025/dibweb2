import React, { useState } from "react";
import { Steps } from "antd";
import { Provider } from "./MultiStepFormContext";
import PersonalDetails from "./PersonalDetails";
import NumberOfAttendee from "./NumberOfAttendee";
import Review from "./Review";

const { Step } = Steps;

const detailsInitialState = {
  name: "",
  email: "",
  phone: ""
};

const addressInitialState = {
  family_ticket: false,
  address2: "",
  city: ""
};

const renderStep = (step) => {
  switch (step) {
    case 0:
      return <PersonalDetails />;
    case 1:
      return <NumberOfAttendee />;
    case 2:
      return <Review />;
    default:
      return null;
  }
};

const MultiStepForm = () => {
  const [personalDetails, setPersonalDetails] = useState(detailsInitialState);
  const [numberOfAttendee, setNumberOfAttendee] = useState(addressInitialState);
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    if (currentStep === 2) {
      setCurrentStep(0);
      setPersonalDetails(detailsInitialState);
      setNumberOfAttendee(addressInitialState);
      return;
    }
    setCurrentStep(currentStep + 1);
  };
  const prev = () => setCurrentStep(currentStep - 1);
  return (
    <Provider value={{ personalDetails, setPersonalDetails, next, prev, numberOfAttendee, setNumberOfAttendee }}>
      <Steps current={currentStep}>
        <Step title={"Fill in your details"} />
        <Step title={"Select ticket"} />
        <Step title={"Review and Payment"} />
      </Steps>
      <main>{renderStep(currentStep)}</main>
    </Provider>
  );
};
export default MultiStepForm;
