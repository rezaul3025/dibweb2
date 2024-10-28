import React, {useContext} from "react";
import {Formik} from "formik";
import {Button} from "antd";
import {Input} from "formik-antd";
import MultiStepFormContext from "./MultiStepFormContext";
import Checkout from "../payment/Checkout";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";

const PersonalDetails = () => {
    const {personalDetails, setPersonalDetails, next} = useContext(MultiStepFormContext);

    const initialOptions = {
        "client-id": process.env.P_CLIENT_ID,
        currency: "EUR",
        intent: "capture",
    };
    return (
        <Formik
            initialValues={personalDetails}
            onSubmit={(values) => {
                setPersonalDetails(values);
                next();
            }}
            validate={(values) => {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const errors = {};
                if (!values.name) errors.name = "Name is required";
                if (!values.email) errors.email = "Email is required";
                if (!emailPattern.test(values.email)) errors.email = "No a valid email id";
                if (!values.phone) errors.phone = "Phone number is required";
                if (/^[0-9]+$/.test(values.phone))
                    errors.profession = "Not a valid phone number";
                return errors;
            }}
        >
            {({handleSubmit, errors}) => {
                return (
                    <div className={"details__wrapper"}>
                        <div className={`form__item ${errors.name && "input__error"}`}>
                            <label>Full name *</label>
                            <Input name={"name"}/>
                            <p className={"error__feedback"}>{errors.name}</p>
                        </div>
                        <div className={`form__item ${errors.email && "input__error"}`}>
                            <label>Email *</label>
                            <Input name={"email"} />
                            <p className={"error__feedback"}>{errors.email}</p>
                        </div>
                        <div
                            className={`form__item ${errors.phone && "input__error"}`}
                        >
                            <label>Phone *</label>
                            <Input name={"phone"}/>
                            <p className={"error__feedback"}>{errors.phone}</p>
                        </div>
                        <div
                            className={"form__item button__items d-flex justify-content-end"}
                        >
                            <Button className="btn-primary"  onClick={handleSubmit}>
                                Next
                            </Button>
                            <PayPalScriptProvider options={initialOptions}>
                        <Checkout amount={1.90} />
                    </PayPalScriptProvider>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
};
export default PersonalDetails;
