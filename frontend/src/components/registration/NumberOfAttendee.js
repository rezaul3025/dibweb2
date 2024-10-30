import React, {useContext, useState, Fragment} from "react";
import {Formik} from "formik";
import {Button} from "antd";
import {Checkbox, InputNumber} from "formik-antd";
import MultiStepFormContext from "./MultiStepFormContext";

const NumberOfAttendee = () => {
    const {numberOfAttendee, setNumberOfAttendee, next, prev} = useContext(MultiStepFormContext);
    const [isFamilyTicketChecked, setIsFamilyTicketChecked] = useState(numberOfAttendee.family_ticket)
    const [numberOfAdult, setNumberOfAdult] = useState(numberOfAttendee.numberOfAdults)
    const [numberOfChild, setNumberOfChild] = useState(numberOfAttendee.numberOfChild)
    return (
        <Formik

            initialValues={numberOfAttendee}
            onSubmit={(values) => {
                setNumberOfAttendee(values);
                next();
            }}
            validate={(values) => {
                console.log(values)
                const errors = {};
                if (!isFamilyTicketChecked && !values.numberOfAdults) errors.numberOfAdults = "Number of adults is required";
                if (!isFamilyTicketChecked && values.numberOfAdults < 1) errors.numberOfAdults = "At least on adult required";
                if (!isFamilyTicketChecked && values.numberOfAdults > 10) errors.numberOfAdults = "Maximum 10 adult allowed in one ticket";
                return errors;
            }}
        >
            {({handleSubmit, errors}) => {
                return (
                    <Fragment>
                        <div className={"details__wrapper"}>
                            <div className={`form__item`}>
                                <Checkbox name={"family_ticket"} onChange={(e) => {
                                    setIsFamilyTicketChecked(e.target.checked);
                                }}> </Checkbox> <label>Family Ticket </label>
                            </div>
                            {!isFamilyTicketChecked && <Fragment>
                                <div className={`form__item ${errors.numberOfAdults && "input__error"}`}>
                                    <label>Number of adults</label>
                                    <InputNumber name={"numberOfAdults"} min={1} max={10} onChange={(e)=>setNumberOfAdult(e)} />
                                    <p className={"error__feedback"}>{errors.numberOfAdults}</p>
                                </div>

                                <div className={`form__item ${errors.numberOfChild && "input__error"}`}>
                                    <label>Number of Child [7-18 years of age]</label>
                                    <InputNumber name={"numberOfChild"} min={0} max={10} onChange={(e)=>setNumberOfChild(e)}/>
                                    <p className={"error__feedback"}>{errors.numberOfChild}</p>
                                </div>
                            </Fragment>
                            }
                            <div className="align-content-center pb-2"><span>Total : <i
                                className="text-primary fas fa-solid fa-euro-sign"></i> {isFamilyTicketChecked?50:
                                numberOfAdult*numberOfAttendee.adultTicket+numberOfChild*numberOfAttendee.childTicket}</span>
                            </div>
                            <div className="form__item button__items d-flex justify-content-between">
                                <Button type={"default"} onClick={prev}>
                                    Back
                                </Button>
                                <Button className="btn btn-primary pb-2" onClick={handleSubmit}>
                                    Next
                                </Button>
                            </div>
                            <p className="align-content-center pb-4"><span> <small className="text-muted">Adult:</small> <i
                                className="text-primary fas fa-solid fa-euro-sign"></i> {numberOfAttendee.adultTicket}</span>
                                <span> <small className="text-muted">Children:</small> <i
                                    className="text-primary fas fa-solid fa-euro-sign"></i> {numberOfAttendee.childTicket}</span>
                                <span> <small className="text-muted">Family:</small> <i
                                    className="text-primary fas fa-solid fa-euro-sign"></i> 50</span>
                            </p>
                        </div>
                    </Fragment>
                );
            }}
        </Formik>
    );
};
export default NumberOfAttendee;
