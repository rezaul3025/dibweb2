import React, {useContext} from "react";
import {Formik} from "formik";
import {Button} from "antd";
import {Input} from "formik-antd";
import MultiStepFormContext from "./MultiStepFormContext";

const PersonalDetails = () => {
    const {personalDetails, setPersonalDetails, next} = useContext(MultiStepFormContext);

    return (
        <Formik
            initialValues={personalDetails}
            onSubmit={(values) => {
                setPersonalDetails(values);
                next();
            }}
            validate={(values) => {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const phoneRegX = /^((?:\+\d+)?\s*(?:\(\d+\)\s*(?:[\/–-]\s*)?)?\d+(?:\s*(?:[\s\/–-]\s*)?\d+)*)$/
                const errors = {};
                if (!values.name) errors.name = "Name is required";
                if (values.name.length>45) errors.name = "Maximum characters 45 is allowed";
                if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~]/.test(values.name)) errors.name = "Not a valid name";
                if (!values.email) errors.email = "Email is required";
                if (values.email.length>45) errors.email = "Maximum length 45 is allowed";
                if (!emailPattern.test(values.email) || /[`!#$%^&*()+=\[\]{};':"\\|<>\/?~]/.test(values.email)) errors.email = "No a valid email id";
                if (!values.phone) errors.phone = "Phone number is required";
                if (!phoneRegX.test(values.phone) || values.phone.length > 14 || values.phone.length < 8)
                    errors.phone = "Not a valid phone number";
                return errors;
            }}
        >
            {({handleSubmit, errors}) => {
                return (
                    <div className={"details__wrapper"}>
                        <div className={`form__item ${errors.name && "input__error"}`}>
                            <label>Full name <sup className="text-danger">*</sup></label>
                            <Input name={"name"}/>
                            <p className={"error__feedback"}>{errors.name}</p>
                        </div>
                        <div className={`form__item ${errors.email && "input__error"}`}>
                            <label>Email(e.g. info@example.com) <sup className="text-danger">*</sup></label>
                            <Input name={"email"}/>
                            <p className={"error__feedback"}>{errors.email}</p>
                        </div>
                        <div
                            className={`form__item ${errors.phone && "input__error"}`}
                        >
                            <label>Phone(e.g. 017658788334) <sup className="text-danger">*</sup></label>
                            <Input name={"phone"}/>
                            <p className={"error__feedback"}>{errors.phone}</p>
                        </div>
                        <div
                            className={"form__item button__items d-flex justify-content-end"}
                        >
                            <Button className="btn-primary" onClick={handleSubmit}>
                                Next
                            </Button>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
};
export default PersonalDetails;
