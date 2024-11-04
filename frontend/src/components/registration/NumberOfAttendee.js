import React, {useContext, useState, Fragment} from "react";
import {Formik} from "formik";
import {Button} from "antd";
import {Checkbox, InputNumber} from "formik-antd";
import MultiStepFormContext from "./MultiStepFormContext";

const NumberOfAttendee = () => {
    const {numberOfAttendee, setNumberOfAttendee, next, prev} = useContext(MultiStepFormContext);
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
                const errors = {};
                if (values.numberOfAdults < 1 && values.numberOfChild < 1) errors.general = "At least one require to buy";
                if (values.numberOfAdults > 10) errors.numberOfAdults = "Maximum 10 adult allowed in one ticket";
                if (values.numberOfChild > 8) errors.numberOfChild = "Maximum 8 children allowed in one ticket";
                return errors;
            }}
        >
            {({handleSubmit, errors}) => {
                return (
                    <Fragment>

                        <div className={"details__wrapper"}>
                            <Fragment>
                                <div className={`form__item ${errors.numberOfAdults && "input__error"}`}>
                                    <label>Number of adults</label>
                                    <InputNumber name={"numberOfAdults"} min={0} max={10}
                                                 onChange={(e) => setNumberOfAdult(e)}/>
                                    <p className={"error__feedback"}>{errors.numberOfAdults}</p>
                                </div>

                                <div className={`form__item ${errors.numberOfChild && "input__error"}`}>
                                    <label>Number of Child from age 5 to 17</label>
                                    <InputNumber name={"numberOfChild"} min={0} max={8}
                                                 onChange={(e) => setNumberOfChild(e)}/>
                                    <p className={"error__feedback"}>{errors.numberOfChild}</p>
                                </div>
                                <p className={"error__feedback"}>{errors.general}</p>
                            </Fragment>

                            <div className="align-content-center pb-4">
                                <span>Total : <i
                                    className="text-primary fas fa-solid fa-euro-sign"></i> {numberOfAdult * numberOfAttendee.adultTicket + numberOfChild * numberOfAttendee.childTicket}</span>
                            </div>
                            <div className="form__item button__items d-flex justify-content-between">
                                <Button type={"default"} onClick={prev}>
                                    Back
                                </Button>
                                <Button className="btn btn-primary pb-2" onClick={handleSubmit}>
                                    Next
                                </Button>
                            </div>
                            <p className="align-content-center"><span> <small>Adult:</small> <i
                                className="text-primary fas fa-solid fa-euro-sign"></i> {numberOfAttendee.adultTicket}</span>
                            </p>
                            <p className="align-content-center">
                                 <span> <small>Children from age 5 to 17 :</small> <i
                                     className="text-primary fas fa-solid fa-euro-sign"></i> {numberOfAttendee.childTicket}</span>
                            </p>
                            <p className="text-danger"><small>Children under 5 years: Free entry, No seat.</small></p>
                        </div>
                    </Fragment>
                );
            }}
        </Formik>
    );
};
export default NumberOfAttendee;
