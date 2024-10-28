import React, {useContext, useState, Fragment} from "react";
import {Formik} from "formik";
import {Button} from "antd";
import {Checkbox, InputNumber} from "formik-antd";
import MultiStepFormContext from "./MultiStepFormContext";

const NumberOfAttendee = () => {
    const {numberOfAttendee, setNumberOfAttendee, next, prev} = useContext(MultiStepFormContext);
    const [isFamilyTicketChecked, setIsFamilyTicketChecked] = useState(numberOfAttendee.family_ticket)
    return (
        <Formik
            initialValues={numberOfAttendee}
            onSubmit={(values) => {
                console.log(values)
                setNumberOfAttendee(values);
                next();
            }}
            validate={(values) => {
                const errors = {};
                if (!isFamilyTicketChecked && !values.numberOfAdults) errors.numberOfAdults = "Number of adults is required";
                if (!isFamilyTicketChecked && values.numberOfAdults < 1) errors.numberOfAdults = "At least on adult required";
                if (!isFamilyTicketChecked && values.numberOfAdults > 10) errors.numberOfAdults = "Maximum 10 adult allowed in one ticket";
                return errors;
            }}
        >
            {({handleSubmit, errors}) => {
                return (
                    <div className={"details__wrapper"}>
                        <div className={`form__item`}>
                            <Checkbox name={"family_ticket"} onChange={(e) => {
                                console.log(e);
                                setIsFamilyTicketChecked(e.target.checked);
                            }}> <label>Family Ticket </label></Checkbox>
                        </div>
                        {!isFamilyTicketChecked && <Fragment>
                            <div className={`form__item ${errors.numberOfAdults && "input__error"}`}>
                                <label>Number of adults</label>
                                <InputNumber name={"numberOfAdults"} min={1} max={10} value={1}/>
                                <p className={"error__feedback"}>{errors.numberOfAdults}</p>
                            </div>

                            <div className={`form__item ${errors.numberOfChild && "input__error"}`}>
                                <label>Number of Child [7-18 years of age]</label>
                                <InputNumber name={"numberOfChild"} min={1} max={10}/>
                                <p className={"error__feedback"}>{errors.numberOfChild}</p>
                            </div>
                        </Fragment>
                        }

                        <div className="form__item button__items d-flex justify-content-between">
                            <Button type={"default"} onClick={prev}>
                                Back
                            </Button>
                            <Button className="btn btn-primary pb-2" onClick={handleSubmit}>
                                Next
                            </Button>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
};
export default NumberOfAttendee;
